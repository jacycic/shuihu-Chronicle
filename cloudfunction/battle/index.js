/**
 * 趣味问答联机对战云函数
 * ------------------------------------------------------------------
 * 房间集合：sh_battle_rooms（权限「所有用户不可读写」，前端不直连数据库）
 * 身份与好友功能一致：u_<账号> / g_<openid 摘要>，
 * 账号须通过 sh_accounts.openid 校验，防止伪造他人身份。
 *
 * 云端只保存「题目下标数组」与双方作答，题目正文来自小程序 data/quizBank.js，
 * 因此题库只需维护一份；同一版本的小程序双方按同一份题库还原题目。
 *
 * 前端只通过 services/battleService.js 调用，传 { action, account, ...params }。
 */
const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command
const COL = 'sh_battle_rooms'
const AUTH_COL = 'sh_accounts'
const QUESTION_COUNT = 10
const WAIT_MS = 5 * 60 * 1000
const VERSION = 2
const ROOM_RE = /^[0-9A-F]{6}$/
const now = () => Date.now()

function cleanText(value, max) {
  return String(value === undefined || value === null ? '' : value).trim().slice(0, max)
}

function normalizeRoomId(value) {
  const id = cleanText(value, 8).toUpperCase()
  if (!ROOM_RE.test(id)) throw new Error('房间号为 6 位字母数字')
  return id
}

/** 登录账号隔离 + openid 校验，与 cloudfunction/friend 保持一致 */
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
      throw new Error('账号集合 sh_accounts 不可访问：请部署云函数 auth 并确认云环境一致')
    }
    return null
  })
  if (!doc || !doc.data) throw new Error('云端还没有这个账号：请重新登录账号后再对战')
  if (doc.data.openid !== openid) throw new Error('该账号已在其它设备登录，请重新登录')
  return { userId: 'u_' + account, account }
}

function makeQuestionIds(bankSize) {
  const total = Math.max(QUESTION_COUNT, Math.min(300, Number(bankSize) || 80))
  const ids = Array.from({ length: total }, (_, i) => i)
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = ids[i]
    ids[i] = ids[j]
    ids[j] = tmp
  }
  return ids.slice(0, QUESTION_COUNT)
}

function blankAnswers(userId, count) {
  const answers = {}
  answers[userId] = new Array(count).fill(null)
  return answers
}

function isMember(room, me) {
  return room.hostId === me || (!!room.guestId && room.guestId === me)
}

function peerOf(room, me) {
  return room.hostId === me ? room.guestId : room.hostId
}

function isDone(list, size) {
  return Array.isArray(list) && list.length === size &&
    list.every(v => v === 0 || v === 1)
}

async function makeRoomId(col) {
  for (let i = 0; i < 10; i++) {
    const id = crypto.randomBytes(3).toString('hex').toUpperCase()
    const hit = await col.doc(id).get().catch(() => null)
    if (!hit) return id
  }
  throw new Error('房间号生成失败，请重试')
}

/** 建房（房主），好友房与随机匹配房共用 */
async function openRoom(col, me, name, bankSize, mode) {
  const roomId = await makeRoomId(col)
  const questionIds = makeQuestionIds(bankSize)
  await col.add({
    data: {
      _id: roomId,
      mode,
      status: 'waiting',
      hostId: me,
      hostName: name,
      guestId: '',
      guestName: '',
      questionIds,
      answers: blankAnswers(me, QUESTION_COUNT),
      createdAt: now(),
      updatedAt: now()
    }
  })
  return { roomId, role: 'host', status: 'waiting', questionIds }
}

/** 加入一个已有房间 */
async function joinRoom(col, me, name, roomId) {
  const doc = col.doc(roomId)
  const res = await doc.get().catch(() => null)
  if (!res || !res.data) throw new Error('房间不存在或已结束')
  const room = res.data
  if (room.hostId === me) throw new Error('不能加入自己创建的房间')
  if (room.status !== 'waiting' || room.guestId) throw new Error('房间已开始或已满')

  const answers = Object.assign({}, room.answers || {})
  answers[me] = new Array(room.questionIds.length).fill(null)
  const upd = await col.where({ _id: roomId, status: 'waiting', guestId: '' })
    .update({
      data: {
        status: 'playing', guestId: me, guestName: name,
        answers: _.set(answers), updatedAt: now()
      }
    })
  if (!upd.stats || upd.stats.updated === 0) throw new Error('房间已被其它人加入，请重试')
  return { roomId, role: 'guest', status: 'playing', questionIds: room.questionIds }
}

/** 随机匹配：优先加入 5 分钟内其它人创建的等待房，否则自己开一间 */
async function match(col, me, name, bankSize) {
  const cutoff = now() - WAIT_MS
  const waiting = await col.where({
    mode: 'random', status: 'waiting', createdAt: _.gt(cutoff)
  }).orderBy('createdAt', 'asc').limit(20).get()

  for (const room of waiting.data) {
    if (room.hostId === me || room.guestId) continue
    const fresh = await col.doc(room._id).get().catch(() => null)
    if (!fresh || !fresh.data || fresh.data.status !== 'waiting' || fresh.data.guestId) continue
    try {
      return await joinRoom(col, me, name, room._id)
    } catch (e) {
      // 被别人抢先加入，继续找下一间
    }
  }
  return openRoom(col, me, name, bankSize, 'random')
}

function createRoom(col, me, name, bankSize) {
  return openRoom(col, me, name, bankSize, 'friend')
}

/** 轮询房间：只回传自己的答案明细，结束后才回传对手答案用于结算 */
async function getState(col, me, params) {
  const roomId = normalizeRoomId(params.roomId)
  const res = await col.doc(roomId).get().catch(() => null)
  if (!res || !res.data) throw new Error('房间不存在或已结束')
  const room = res.data
  if (!isMember(room, me)) throw new Error('你不在此房间中')

  const peer = peerOf(room, me)
  const mine = (room.answers || {})[me] || []
  const peerList = peer ? ((room.answers || {})[peer] || []) : []
  return {
    roomId,
    mode: room.mode,
    status: room.status,
    role: room.hostId === me ? 'host' : 'guest',
    hostName: room.hostName || '梁山来客',
    guestName: room.guestName || '',
    questionIds: room.questionIds || [],
    myAnswers: mine,
    peerCount: peerList.filter(v => v === 0 || v === 1).length,
    peerAnswers: room.status === 'finished' ? peerList : null
  }
}

/** 逐题提交，双方都答完后自动进入结算 */
async function submitAnswer(col, me, params) {
  const roomId = normalizeRoomId(params.roomId)
  const doc = col.doc(roomId)
  const res = await doc.get().catch(() => null)
  if (!res || !res.data) throw new Error('房间不存在或已结束')
  const room = res.data
  if (!isMember(room, me)) throw new Error('你不在此房间中')
  if (room.status !== 'playing') throw new Error('对战尚未开始或已结束')

  const size = (room.questionIds || []).length
  const idx = Number(params.index)
  const answer = Number(params.answer)
  if (!Number.isInteger(idx) || idx < 0 || idx >= size) throw new Error('题目序号不正确')
  if (answer !== 0 && answer !== 1) throw new Error('选项不正确')

  const answers = Object.assign({}, room.answers || {})
  const mine = (answers[me] || new Array(size).fill(null)).slice()
  if (mine[idx] === 0 || mine[idx] === 1) throw new Error('本题已作答')
  mine[idx] = answer
  answers[me] = mine

  const peerList = answers[peerOf(room, me)] || []
  const finished = isDone(mine, size) && isDone(peerList, size)
  await doc.update({
    data: {
      answers: _.set(answers),
      status: finished ? 'finished' : 'playing',
      updatedAt: now()
    }
  })
  return { finished }
}

/** 退出：房主在等待阶段直接撤房，对局中标记对手离线 */
async function leave(col, me, params) {
  const roomId = normalizeRoomId(params.roomId)
  const doc = col.doc(roomId)
  const res = await doc.get().catch(() => null)
  if (!res || !res.data) return { left: true }
  const room = res.data
  if (!isMember(room, me) || room.status === 'finished') return { left: true }
  if (room.status === 'waiting' && room.hostId === me) {
    await doc.remove()
  } else {
    await doc.update({ data: { status: 'abandoned', updatedAt: now() } })
  }
  return { left: true }
}

exports.main = async (event = {}) => {
  const { OPENID } = cloud.getWXContext()
  if (!OPENID) return { ok: false, error: '无法获取用户身份，请在小程序内打开', version: VERSION }

  try {
    const { userId: me, account } = await resolveIdentity(OPENID, event.account)
    const name = cleanText(event.nickName, 16) || '梁山来客'
    const bankSize = Number(event.bankSize) || 80
    const col = db.collection(COL)
    let data

    switch (event.action || 'hello') {
      case 'hello': data = {}; break
      case 'match': data = await match(col, me, name, bankSize); break
      case 'createRoom': data = await createRoom(col, me, name, bankSize); break
      case 'joinRoom': data = await joinRoom(col, me, name, normalizeRoomId(event.roomId)); break
      case 'getState': data = await getState(col, me, event); break
      case 'submitAnswer': data = await submitAnswer(col, me, event); break
      case 'leave': data = await leave(col, me, event); break
      default: throw new Error('未知操作：' + event.action)
    }

    return {
      ok: true,
      version: VERSION,
      data: Object.assign({
        version: VERSION,
        identity: { account, kind: account ? 'account' : 'guest' }
      }, data)
    }
  } catch (err) {
    return { ok: false, error: err.message || '操作失败，请稍后重试', version: VERSION }
  }
}
