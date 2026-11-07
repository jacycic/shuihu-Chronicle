/**
 * 好友云函数
 * ------------------------------------------------------------------
 * 用户身份一律取自 cloud.getWXContext().OPENID，绝不信任前端传入的 openid。
 * 前端只通过 services/friendService.js 调用，传 { action, ...params }。
 * 集合权限请设为「仅管理端可读写」，前端不直接操作数据库。
 */
const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const COL = {
  users: 'sh_users',
  requests: 'sh_friend_requests',
  friends: 'sh_friendships'
}
const CODE_SALT = 'shuihu-friend-2026'
const CODE_RE = /^[0-9A-F]{6}$/

const now = () => Date.now()

function cleanText(value, max) {
  return String(value === undefined || value === null ? '' : value).trim().slice(0, max)
}

/** 由 openid 派生 6 位邀请码，稳定且不可逆 */
function makeCode(openid) {
  return crypto.createHash('sha256')
    .update(openid + CODE_SALT)
    .digest('hex')
    .slice(0, 6)
    .toUpperCase()
}

/** 好友关系用排序后的 openid 对作唯一键，避免重复建立双向关系 */
function pairKey(a, b) {
  return [a, b].sort().join('|')
}

function normalizeCode(value) {
  const code = cleanText(value, 12).toUpperCase()
  if (!CODE_RE.test(code)) throw new Error('邀请码为 6 位字母数字，请检查后重试')
  return code
}

async function findUserByCode(code) {
  const res = await db.collection(COL.users)
    .where({ inviteCode: code })
    .limit(1)
    .get()
  const user = res.data[0]
  if (!user) throw new Error('没有找到该邀请码对应的用户')
  return user
}

async function getMyProfile(openid) {
  const res = await db.collection(COL.users).doc(openid).get().catch(() => null)
  return res && res.data ? res.data : null
}

/** 创建或更新我的公开资料，返回邀请码等信息 */
async function ensureProfile(openid, params) {
  const users = db.collection(COL.users)
  const profile = {
    nickName: cleanText(params.nickName, 20) || '梁山来客',
    avatarUrl: cleanText(params.avatarUrl, 300),
    unlockCount: Math.max(0, Number(params.unlockCount) || 0),
    inviteCode: makeCode(openid),
    updatedAt: now()
  }

  const exists = await users.doc(openid).get().catch(() => null)
  if (exists && exists.data) {
    await users.doc(openid).update({ data: profile })
  } else {
    try {
      await users.add({ data: { _id: openid, ...profile, createdAt: now() } })
    } catch (e) {
      // 并发首次进入时可能重复写入，退化为更新
      await users.doc(openid).update({ data: profile })
    }
  }
  return profile
}

async function getFriends(openid) {
  // 两次独立查询，避免依赖链式 query 对象的复用语义
  const [asA, asB] = await Promise.all([
    db.collection(COL.friends).where({ userA: openid }).limit(100).get(),
    db.collection(COL.friends).where({ userB: openid }).limit(100).get()
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

async function getRequests(openid) {
  const res = await db.collection(COL.requests)
    .where({ toOpenid: openid, status: 'pending' })
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

async function createFriendship(a, b) {
  const col = db.collection(COL.friends)
  const key = pairKey(a, b)
  const exists = await col.where({ pairKey: key }).count()
  if (exists.total > 0) return
  await col.add({ data: { pairKey: key, userA: a, userB: b, createdAt: now() } })
}

/** 进入页面时一次拿齐资料、好友、待处理申请 */
async function bootstrap(openid, params) {
  const profile = await ensureProfile(openid, params)
  const [friends, requests] = await Promise.all([
    getFriends(openid),
    getRequests(openid)
  ])
  return { profile, friends, requests }
}

/** 按邀请码查询对方公开资料（不返回 openid） */
async function findByCode(openid, params) {
  const code = normalizeCode(params.code)
  const target = await findUserByCode(code)
  if (target._id === openid) throw new Error('不能添加自己为好友')

  const key = pairKey(openid, target._id)
  const [friendCount, pending] = await Promise.all([
    db.collection(COL.friends).where({ pairKey: key }).count(),
    db.collection(COL.requests).where({
      fromOpenid: openid,
      toOpenid: target._id,
      status: 'pending'
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

async function sendRequest(openid, params) {
  const code = normalizeCode(params.code)
  const target = await findUserByCode(code)
  if (target._id === openid) throw new Error('不能添加自己为好友')

  const key = pairKey(openid, target._id)
  const friendCount = await db.collection(COL.friends).where({ pairKey: key }).count()
  if (friendCount.total > 0) throw new Error('你们已经是好友了')

  const reqCol = db.collection(COL.requests)
  const mine = await getMyProfile(openid)
  const fromNick = mine ? mine.nickName : '梁山来客'
  const fromAvatar = mine ? mine.avatarUrl : ''

  // 若对方也向我发过申请，直接互加好友
  const reverse = await reqCol.where({
    fromOpenid: target._id,
    toOpenid: openid,
    status: 'pending'
  }).limit(1).get()

  if (reverse.data.length) {
    await reqCol.doc(reverse.data[0]._id).update({
      data: { status: 'accepted', updatedAt: now() }
    })
    await createFriendship(openid, target._id)
    return { matched: true }
  }

  const dup = await reqCol.where({
    fromOpenid: openid,
    toOpenid: target._id,
    status: 'pending'
  }).count()
  if (dup.total > 0) throw new Error('已发送过申请，请等待对方处理')

  await reqCol.add({
    data: {
      fromOpenid: openid,
      toOpenid: target._id,
      fromNick,
      fromAvatar,
      status: 'pending',
      createdAt: now(),
      updatedAt: now()
    }
  })
  return { matched: false }
}

async function handleRequest(openid, params) {
  const requestId = cleanText(params.requestId, 64)
  if (!requestId) throw new Error('缺少申请编号')

  const col = db.collection(COL.requests)
  const res = await col.doc(requestId).get().catch(() => null)
  if (!res || !res.data) throw new Error('申请不存在')
  const request = res.data
  if (request.toOpenid !== openid) throw new Error('无权处理该申请')
  if (request.status !== 'pending') throw new Error('该申请已处理')

  const accept = params.accept === true
  await col.doc(requestId).update({
    data: { status: accept ? 'accepted' : 'rejected', updatedAt: now() }
  })
  if (accept) await createFriendship(openid, request.fromOpenid)
  return { accepted: accept }
}

async function removeFriend(openid, params) {
  const code = normalizeCode(params.code)
  const target = await findUserByCode(code)
  const key = pairKey(openid, target._id)
  await db.collection(COL.friends).where({ pairKey: key }).remove()
  return { removed: true }
}

exports.main = async (event = {}) => {
  const { OPENID } = cloud.getWXContext()
  if (!OPENID) return { ok: false, error: '无法获取用户身份，请在小程序内打开' }

  const action = event.action || 'bootstrap'
  try {
    let data
    switch (action) {
      case 'bootstrap': data = await bootstrap(OPENID, event); break
      case 'findByCode': data = await findByCode(OPENID, event); break
      case 'sendRequest': data = await sendRequest(OPENID, event); break
      case 'handleRequest': data = await handleRequest(OPENID, event); break
      case 'removeFriend': data = await removeFriend(OPENID, event); break
      default: throw new Error('未知操作：' + action)
    }
    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: err.message || '操作失败，请稍后重试' }
  }
}
