/**
 * 好友 + 私信云函数
 * ------------------------------------------------------------------
 * 用户身份按「登录账号」隔离：同一微信号切换账号后，好友、申请、私信互不可见。
 * 前端只通过 services/friendService.js 传 { action, account, ...params }。
 * account 由 sh_accounts 文档中记录的 openid 校验，前端伪造不了他人身份；
 * 未登录（游客）时使用独立的 guest 身份，也不会看到账号下的好友数据。
 *
 * 集合：sh_users / sh_friend_requests / sh_friendships / sh_messages
 * 全部权限设为「所有用户不可读写」（仅限制小程序端），前端不直接操作数据库。
 */
const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const COL = {
  users: 'sh_users',
  requests: 'sh_friend_requests',
  friends: 'sh_friendships',
  messages: 'sh_messages'
}
const AUTH_COL = 'sh_accounts'
const CODE_SALT = 'shuihu-friend-2026'
const CODE_RE = /^[0-9A-F]{6}$/

const now = () => Date.now()

function cleanText(value, max) {
  return String(value === undefined || value === null ? '' : value).trim().slice(0, max)
}

/** 由用户 ID 派生 6 位邀请码，不同账号的邀请码不同 */
function makeCode(userId, retry) {
  return crypto.createHash('sha256')
    .update(userId + CODE_SALT + (retry ? '#' + retry : ''))
    .digest('hex')
    .slice(0, 6)
    .toUpperCase()
}

/** 避开已被其它用户（含旧版 openid 文档）占用的邀请码，保证一账号一码 */
async function uniqueCode(me) {
  for (let i = 0; i < 8; i++) {
    const code = makeCode(me, i)
    // 不能用 limit(1)：可能刚好只取到自己的文档，漏掉真正占用该码的旧文档
    const hit = await db.collection(COL.users)
      .where({ inviteCode: code }).get()
    if (!hit.data.some(item => item._id !== me)) return code
  }
  return makeCode(me, 0)
}

function pairKey(a, b) {
  return [a, b].sort().join('|')
}

function normalizeCode(value) {
  const code = cleanText(value, 12).toUpperCase()
  if (!CODE_RE.test(code)) throw new Error('邀请码为 6 位字母数字，请检查后重试')
  return code
}

/**
 * 解析调用者身份。
 * - 登录账号：u_<账号>，并校验 sh_accounts.openid 与当前微信一致
 * - 游客：g_<openid 摘要>，与所有登录账号隔离
 */
async function resolveIdentity(openid, rawAccount) {
  const account = cleanText(rawAccount, 16)
  if (!account) {
    return {
      userId: 'g_' + crypto.createHash('sha256').update(openid).digest('hex').slice(0, 12),
      account: ''
    }
  }
  const doc = await db.collection(AUTH_COL).doc(account).get().catch(e => {
    const raw = String((e && (e.errMsg || e.message)) || '')
    if (/502001|502005|COLLECTION_NOT_EXIST|集合不存在|权限不足/i.test(raw)) {
      throw new Error('账号集合 ' + AUTH_COL + ' 不可访问：请在同一云环境下部署云函数 auth ' +
        '并创建该集合（权限选「所有用户不可读写」）')
    }
    return null
  })
  if (!doc || !doc.data) {
    throw new Error('云端还没有这个账号：请部署账号云函数并用同一账号名重新注册后再使用好友功能')
  }
  if (doc.data.openid !== openid) {
    throw new Error('该账号已在其它设备登录，请重新登录后再使用好友功能')
  }
  return { userId: 'u_' + account, account }
}

/** 新版文档 _id 为 u_<账号> / g_<摘要>，旧版是 openid 长串，须忽略 */
function isCurrentUserId(id) {
  return /^u_[A-Za-z0-9_\u4e00-\u9fa5]{2,16}$/.test(id) || /^g_[0-9a-f]{12}$/.test(id)
}

async function findUserByCode(code) {
  const res = await db.collection(COL.users)
    .where({ inviteCode: code })
    .limit(20)
    .get()
  // 旧版残留文档可能还占着某个邀请码，不能被当成可添加的好友
  const user = res.data.find(item => isCurrentUserId(item._id))
  if (!user) throw new Error('没有找到该邀请码对应的用户')
  return user
}

async function getMyProfile(me) {
  const res = await db.collection(COL.users).doc(me).get().catch(() => null)
  return res && res.data ? res.data : null
}

/** 创建或更新我的公开资料，返回邀请码等信息 */
async function ensureProfile(me, params) {
  const users = db.collection(COL.users)
  const profile = {
    nickName: cleanText(params.nickName, 20) || '梁山来客',
    avatarUrl: cleanText(params.avatarUrl, 300),
    unlockCount: Math.max(0, Number(params.unlockCount) || 0),
    inviteCode: await uniqueCode(me),
    updatedAt: now()
  }

  const exists = await users.doc(me).get().catch(() => null)
  if (exists && exists.data) {
    await users.doc(me).update({ data: profile })
  } else {
    try {
      await users.add({ data: { _id: me, ...profile, createdAt: now() } })
    } catch (e) {
      await users.doc(me).update({ data: profile })
    }
  }
  return profile
}

async function getFriends(me) {
  // 两次独立查询，避免依赖链式 query 对象的复用语义
  const [asA, asB] = await Promise.all([
    db.collection(COL.friends).where({ userA: me }).limit(100).get(),
    db.collection(COL.friends).where({ userB: me }).limit(100).get()
  ])
  const ids = [...new Set([
    ...asA.data.map(item => item.userB),
    ...asB.data.map(item => item.userA)
  ])]
  if (!ids.length) return []

  const users = db.collection(COL.users)
  const docs = await Promise.all(ids.map(id => users.doc(id).get().catch(() => null)))
  return ids.map((id, index) => {
    const profile = docs[index] && docs[index].data
    return {
      inviteCode: profile ? profile.inviteCode : '',
      nickName: profile ? profile.nickName : '梁山来客',
      avatarUrl: profile ? profile.avatarUrl : '',
      unlockCount: profile ? profile.unlockCount : 0
    }
  }).sort((a, b) => b.unlockCount - a.unlockCount)
}

async function getRequests(me) {
  const res = await db.collection(COL.requests)
    .where({ toUser: me, status: 'pending' })
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get()
  return res.data.map(item => ({
    requestId: item._id,
    nickName: item.fromNick || '梁山来客',
    avatarUrl: item.fromAvatar || '',
    createdAt: item.createdAt || 0
  }))
}

/** 未读私信：按对方邀请码聚合，供红点使用 */
async function getUnread(me) {
  const res = await db.collection(COL.messages)
    .where({ to: me, readAt: 0 })
    .limit(200)
    .get()
  const byUser = {}
  res.data.forEach(item => { byUser[item.from] = (byUser[item.from] || 0) + 1 })

  const ids = Object.keys(byUser)
  const profiles = await Promise.all(ids.map(id =>
    db.collection(COL.users).doc(id).get().catch(() => null)
  ))
  const items = ids.map((id, index) => ({
    code: profiles[index] && profiles[index].data ? profiles[index].data.inviteCode : '',
    count: byUser[id]
  })).filter(item => item.code)

  return { total: items.reduce((sum, item) => sum + item.count, 0), items }
}

async function createFriendship(a, b) {
  const col = db.collection(COL.friends)
  const key = pairKey(a, b)
  const exists = await col.where({ pairKey: key }).count()
  if (exists.total > 0) return
  await col.add({ data: { pairKey: key, userA: a, userB: b, createdAt: now() } })
}

/** 进入页面时一次拿齐资料、好友、待处理申请、未读私信 */
async function bootstrap(me, params) {
  const profile = await ensureProfile(me, params)
  const [friends, requests, unread] = await Promise.all([
    getFriends(me),
    getRequests(me),
    getUnread(me)
  ])
  const counts = {}
  unread.items.forEach(item => { counts[item.code] = item.count })
  const account = me.indexOf('u_') === 0 ? me.slice(2) : ''
  return {
    profile,
    identity: { account, kind: account ? 'account' : 'guest', version: 2 },
    friends: friends.map(item => Object.assign({}, item, { unread: counts[item.inviteCode] || 0 })),
    requests,
    unreadTotal: unread.total
  }
}

/** 按邀请码查询对方公开资料 */
async function findByCode(me, params) {
  const code = normalizeCode(params.code)
  const target = await findUserByCode(code)
  if (target._id === me) throw new Error('不能添加自己为好友')

  const key = pairKey(me, target._id)
  const [friendCount, pending] = await Promise.all([
    db.collection(COL.friends).where({ pairKey: key }).count(),
    db.collection(COL.requests).where({
      fromUser: me, toUser: target._id, status: 'pending'
    }).count()
  ])

  return {
    code,
    nickName: target.nickName,
    avatarUrl: target.avatarUrl,
    unlockCount: target.unlockCount,
    alreadyFriend: friendCount.total > 0,
    pending: pending.total > 0
  }
}

async function sendRequest(me, params) {
  const code = normalizeCode(params.code)
  const target = await findUserByCode(code)
  if (target._id === me) throw new Error('不能添加自己为好友')

  const key = pairKey(me, target._id)
  const friendCount = await db.collection(COL.friends).where({ pairKey: key }).count()
  if (friendCount.total > 0) throw new Error('你们已经是好友了')

  const reqCol = db.collection(COL.requests)
  const mine = await getMyProfile(me)
  const fromNick = mine ? mine.nickName : '梁山来客'
  const fromAvatar = mine ? mine.avatarUrl : ''

  // 若对方也向我发过申请，直接互加好友
  const reverse = await reqCol.where({
    fromUser: target._id, toUser: me, status: 'pending'
  }).limit(1).get()

  if (reverse.data.length) {
    await reqCol.doc(reverse.data[0]._id).update({
      data: { status: 'accepted', updatedAt: now() }
    })
    await createFriendship(me, target._id)
    return { matched: true }
  }

  const dup = await reqCol.where({
    fromUser: me, toUser: target._id, status: 'pending'
  }).count()
  if (dup.total > 0) throw new Error('已发送过申请，请等待对方处理')

  await reqCol.add({
    data: {
      fromUser: me,
      toUser: target._id,
      fromNick,
      fromAvatar,
      status: 'pending',
      createdAt: now(),
      updatedAt: now()
    }
  })
  return { matched: false }
}

async function handleRequest(me, params) {
  const requestId = cleanText(params.requestId, 64)
  if (!requestId) throw new Error('缺少申请编号')

  const col = db.collection(COL.requests)
  const res = await col.doc(requestId).get().catch(() => null)
  if (!res || !res.data) throw new Error('申请不存在')
  const request = res.data
  if (request.toUser !== me) throw new Error('无权处理该申请')
  if (request.status !== 'pending') throw new Error('该申请已处理')

  const accept = params.accept === true
  await col.doc(requestId).update({
    data: { status: accept ? 'accepted' : 'rejected', updatedAt: now() }
  })
  if (accept) await createFriendship(me, request.fromUser)
  return { accepted: accept }
}

async function removeFriend(me, params) {
  const code = normalizeCode(params.code)
  const target = await findUserByCode(code)
  const key = pairKey(me, target._id)
  await db.collection(COL.friends).where({ pairKey: key }).remove()
  await db.collection(COL.messages).where({ pairKey: key }).remove().catch(() => null)
  return { removed: true }
}

async function requireFriend(me, code) {
  const target = await findUserByCode(normalizeCode(code))
  if (target._id === me) throw new Error('不能和自己聊天')
  const key = pairKey(me, target._id)
  const count = await db.collection(COL.friends).where({ pairKey: key }).count()
  if (count.total === 0) throw new Error('对方还不是你的好友')
  return { target, key }
}

async function sendMessage(me, params) {
  const { target, key } = await requireFriend(me, params.code)
  const text = cleanText(params.text, 200)
  if (!text) throw new Error('消息不能为空')

  const col = db.collection(COL.messages)
  // 同一会话内 createdAt 严格递增，避免同毫秒发送时 orderBy 排序不稳定
  const last = await col.where({ pairKey: key })
    .orderBy('createdAt', 'desc').limit(1).get().catch(() => ({ data: [] }))
  const lastAt = last.data && last.data.length ? Number(last.data[0].createdAt) || 0 : 0
  await col.add({
    data: {
      pairKey: key,
      from: me,
      to: target._id,
      text,
      createdAt: Math.max(now(), lastAt + 1),
      readAt: 0
    }
  })
  return { sent: true }
}

/** 拉取聊天记录，同时把对方发给我的未读消息标记为已读 */
async function getMessages(me, params) {
  const { target, key } = await requireFriend(me, params.code)
  await db.collection(COL.messages)
    .where({ pairKey: key, to: me, readAt: 0 })
    .update({ data: { readAt: now() } })
    .catch(() => null)

  const res = await db.collection(COL.messages)
    .where({ pairKey: key })
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get()

  return {
    peer: {
      code: normalizeCode(params.code),
      nickName: target.nickName || '梁山来客',
      avatarUrl: target.avatarUrl || ''
    },
    messages: res.data.reverse().map(item => ({
      id: item._id,
      text: item.text,
      mine: item.from === me,
      createdAt: item.createdAt || 0
    }))
  }
}

exports.main = async (event = {}) => {
  const { OPENID } = cloud.getWXContext()
  if (!OPENID) return { ok: false, error: '无法获取用户身份，请在小程序内打开' }

  try {
    const { userId: me } = await resolveIdentity(OPENID, event.account)
    let data
    switch (event.action || 'bootstrap') {
      case 'bootstrap': data = await bootstrap(me, event); break
      case 'findByCode': data = await findByCode(me, event); break
      case 'sendRequest': data = await sendRequest(me, event); break
      case 'handleRequest': data = await handleRequest(me, event); break
      case 'removeFriend': data = await removeFriend(me, event); break
      case 'getUnread': data = await getUnread(me); break
      case 'getMessages': data = await getMessages(me, event); break
      case 'sendMessage': data = await sendMessage(me, event); break
      default: throw new Error('未知操作：' + event.action)
    }
    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: err.message || '操作失败，请稍后重试' }
  }
}
