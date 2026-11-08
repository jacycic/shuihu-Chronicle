/**
 * 账号云函数：账号密码注册 / 登录 + 进度云同步
 * ------------------------------------------------------------------
 * 前端只通过 services/authService.js 调用，传 { action, ...params }。
 * 用户身份取自 cloud.getWXContext().OPENID，绝不信任前端传入的 openid。
 * 集合数据权限请设为「所有用户不可读写」（仅限制小程序端），前端不直接操作数据库。
 *
 * 集合 sh_accounts 文档结构：
 *   _id: 账号（唯一）
 *   salt / passwordHash: pbkdf2 派生值，不存明文密码
 *   nickname / avatarUrl / openid / progress / createdAt / updatedAt
 *
 * 注意：progress 必须用 db.command.set 整体替换。
 * 直接 update({progress: {...}}) 会被云数据库展开成 progress.xxx 点号路径，
 * 若字段原值为 null 就会报「Cannot create field 'xxx' in element {progress: null}」(-502001)。
 */
const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command
const COL = 'sh_accounts'
const ACCOUNT_RE = /^[A-Za-z0-9_\u4e00-\u9fa5]{2,16}$/
const now = () => Date.now()

function text(value, max) {
  return String(value === undefined || value === null ? '' : value).slice(0, max)
}

function hash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex')
}

function makeSalt() {
  return crypto.randomBytes(16).toString('hex')
}

function publicState(doc) {
  return {
    mode: 'account',
    account: doc._id,
    nickname: doc.nickname || doc._id,
    avatarUrl: doc.avatarUrl || '',
    loginAt: now()
  }
}

function reply(ok, extra) {
  return Object.assign({ ok }, extra || {})
}

function errText(e) {
  return String((e && (e.errMsg || e.message)) || '未知错误')
}

/** 把云数据库底层错误翻译成可操作的提示，别再只丢一个错误码给用户 */
function dbError(e, env) {
  const raw = errText(e)
  const code = String((e && (e.errCode || e.code)) || '')
  const detail = raw + ' ' + code
  const envText = '云函数当前环境：' + (env || '未知')

  if (/Cannot create field|in element \{progress: null\}/i.test(detail)) {
    return '云端进度档还是旧格式（progress 为 null）：请重新部署云函数 auth 后再次同步，' +
      '无需删除账号或集合。原始错误：' + raw
  }
  // -502001：集合不存在，或集合建在了别的云环境
  if (/502001|COLLECTION_NOT_EXIST|collection.*(not|doesn't).*exist|集合不存在/i.test(detail)) {
    return '集合 ' + COL + ' 在当前环境不可访问：请在云开发控制台的同一环境下创建该集合' +
      '（数据权限选「所有用户不可读写」），或核对 config.CLOUD.env；' +
      '若集合已存在，请重新部署云函数 auth 并确认部署环境。' + envText +
      '。原始错误：' + raw
  }
  // -502005：权限不足
  if (/502005|PERMISSION_DENIED|permission|权限不足/i.test(detail)) {
    return '集合 ' + COL + ' 权限不足：请把数据权限设为「所有用户不可读写」，' +
      '并重新部署云函数 auth。' + envText + '。原始错误：' + raw
  }
  return '云端服务异常：' + raw + '（' + envText + '）'
}

function isCollectionError(e) {
  const detail = errText(e) + ' ' + String((e && (e.errCode || e.code)) || '')
  return /502001|502005|COLLECTION_NOT_EXIST|PERMISSION_DENIED|集合不存在|权限不足/i.test(detail)
}

/** 只保留合法字段名与可序列化值，避免 undefined / 特殊键触发数据库写入错误 */
function cleanProgress(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const result = {}
  Object.keys(value).forEach(key => {
    if (!/^[A-Za-z0-9_]+$/.test(key)) return
    const item = value[key]
    if (item === undefined) return
    try {
      result[key] = JSON.parse(JSON.stringify(item))
    } catch (e) {
      // 忽略不可序列化的值
    }
  })
  return result
}

function hasProgress(value) {
  return !!(value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length)
}

/**
 * 整体替换 progress，而不是让云数据库把对象展开成点号路径。
 * 兼容老账号：即使旧档里 progress 是 null，command.set 也能直接替换该字段。
 * 极少数环境不支持时回退到整文档 set。
 */
async function writeProgress(docRef, progress) {
  try {
    await docRef.update({ data: { progress: _.set(progress), updatedAt: now() } })
  } catch (e) {
    const current = await docRef.get()
    const data = Object.assign({}, (current && current.data) || {}, { progress, updatedAt: now() })
    delete data._id
    await docRef.set({ data })
  }
}

/**
 * 判断账号是否存在。
 * 优先用 where：文档不存在时返回空数组，只有集合/权限/环境错误才抛异常，
 * 避免把 -502001 吞掉后误报成「账号不存在」；
 * where 不可用时再退回按主键读取，非集合级错误一律视为文档不存在。
 */
async function findAccount(account) {
  let res = null
  try {
    res = await db.collection(COL).where({ _id: account }).limit(1).get()
  } catch (e) {
    if (isCollectionError(e)) throw e
  }
  if (res && res.data && res.data.length) return res.data[0]

  try {
    const byId = await db.collection(COL).doc(account).get()
    return byId && byId.data ? byId.data : null
  } catch (e) {
    if (isCollectionError(e)) throw e
    return null
  }
}

exports.main = async (event = {}) => {
  const ctx = cloud.getWXContext() || {}
  const OPENID = ctx.OPENID
  const ENV = ctx.ENV || ctx.env || ''
  const action = event.action
  const account = text(event.account, 16).trim()
  const password = text(event.password, 20)

  if (!ACCOUNT_RE.test(account)) return reply(false, { msg: '账号格式不正确' })

  try {
    const docRef = db.collection(COL).doc(account)

    if (action === 'register') {
      if (password.length < 6) return reply(false, { msg: '密码需 6-20 位' })
      if (await findAccount(account)) return reply(false, { msg: '该账号已注册，请直接登录' })

      const salt = makeSalt()
      const nickname = text(event.nickname, 16) || account
      await docRef.set({
        data: {
          salt,
          passwordHash: hash(password, salt),
          nickname,
          avatarUrl: '',
          openid: OPENID,
          progress: {},
          createdAt: now(),
          updatedAt: now()
        }
      })
      return reply(true, {
        state: publicState({ _id: account, nickname }),
        progress: null
      })
    }

    if (action === 'login') {
      const doc = await findAccount(account)
      if (!doc) return reply(false, { msg: '账号不存在，请先注册' })
      if (doc.passwordHash !== hash(password, doc.salt)) {
        return reply(false, { msg: '账号或密码不正确' })
      }
      // 新设备登录后绑定当前 openid，旧设备的写入权限随之失效
      await docRef.update({ data: { openid: OPENID, updatedAt: now() } })
      return reply(true, {
        state: publicState(doc),
        progress: hasProgress(doc.progress) ? doc.progress : null
      })
    }

    if (action === 'getProgress' || action === 'saveProgress') {
      const doc = await findAccount(account)
      if (!doc) {
        return reply(false, {
          msg: '云端还没有这个账号：请在登录页用同一账号名重新注册一次（会把本机进度作为初始档上传）',
          needRegister: true
        })
      }
      if (doc.openid !== OPENID) return reply(false, { msg: '请先在本设备登录该账号' })
      if (action === 'getProgress') {
        return reply(true, { progress: hasProgress(doc.progress) ? doc.progress : null })
      }

      const snapshot = cleanProgress(event.progress)
      await writeProgress(docRef, snapshot)
      return reply(true, { progress: snapshot })
    }

    return reply(false, { msg: '未知操作' })
  } catch (e) {
    return reply(false, { msg: dbError(e, ENV) })
  }
}
