/**
 * 认证服务：账号密码登录的唯一边界
 * ------------------------------------------------------------------
 * 页面只调用 register / login / loginAsGuest / logout / pushProgress，
 * 不接触缓存、密码校验细节，也不直接发起网络请求。
 *
 * 两种模式（config.AUTH.cloudEnabled）：
 * - false（默认）：账号表与进度存本机，进度按账号隔离，零网络请求；
 * - true：账号与进度走 cloudfunction/auth 云函数 + sh_accounts 集合，
 *   登录时拉取、退出时上传，进度可跨设备保存。需先按 README 部署。
 *
 * 本地模式的密码只用 salt + 轻量哈希避免明文存放，不能替代服务端鉴权；
 * 云端模式用 pbkdf2 + 云函数上下文 openid 校验，前端拿不到他人数据。
 */
const config = require('../config/index.js')
const progressService = require('./progressService.js')

const MODE = { account: 'account', guest: 'guest' }
const ACCOUNT_RE = /^[A-Za-z0-9_\u4e00-\u9fa5]+$/
const HASH_SALT = 'shuihu-account-2026'

function makeSalt() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
}

/** 纯前端哈希：仅避免明文，非安全加密；真正的安全由云端模式保证 */
function localHash(password, salt) {
  const text = salt + '|' + password + '|' + HASH_SALT
  let h1 = 0x811c9dc5
  let h2 = 0x1000193
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    h1 = Math.imul(h1 ^ code, 16777619) >>> 0
    h2 = Math.imul(h2 + code * (i + 7), 2654435761) >>> 0
  }
  return h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0')
}

function validate(account, password, confirm, isRegister) {
  const { accountMin, accountMax, passwordMin, passwordMax } = config.AUTH
  if (!ACCOUNT_RE.test(account) || account.length < accountMin || account.length > accountMax) {
    return `账号需 ${accountMin}-${accountMax} 位中文、字母、数字或下划线`
  }
  if (typeof password !== 'string' || password.length < passwordMin || password.length > passwordMax) {
    return `密码需 ${passwordMin}-${passwordMax} 位`
  }
  if (isRegister && password !== confirm) return '两次输入的密码不一致'
  return ''
}

function buildState(account, nickname) {
  return {
    mode: MODE.account,
    account,
    nickname: nickname || account,
    loginAt: Date.now()
  }
}

function isCloudAvailable() {
  return !!(config.AUTH.cloudEnabled && config.CLOUD.enabled && config.CLOUD.env && wx.cloud)
}

function callCloud(action, payload = {}) {
  return wx.cloud.callFunction({
    name: config.AUTH.functionName,
    data: Object.assign({ action }, payload)
  }).then(res => {
    const data = res && res.result
    if (!data || !data.ok) {
      const error = new Error((data && data.msg) || '云端服务未响应')
      error.fromServer = true
      throw error
    }
    return data
  }).catch(err => {
    if (err && err.fromServer) throw err
    const raw = err && (err.errMsg || err.message)
    throw new Error('云端连接失败：' + (raw || '请确认云函数 auth 已部署'))
  })
}

function getLoginState() {
  return progressService.getLoginState()
}

/** 旧版「微信一键进入」的登录态不认，强制走一次账号密码登录 */
function isLoggedIn() {
  const state = getLoginState()
  return !!(state && (state.mode === MODE.account || state.mode === MODE.guest))
}

function applyLogin(state, progress) {
  progressService.setAccountScope(state.account || '')
  progressService.setLoginState(state)
  if (progress) progressService.importProgress(progress)
  return state
}

/** 上传当前账号的整份进度，云端用 openid 校验身份 */
function pushProgress() {
  if (!isCloudAvailable()) return Promise.resolve()
  const state = getLoginState()
  if (!state || !state.account) return Promise.resolve()
  return callCloud('saveProgress', {
    account: state.account,
    progress: progressService.exportProgress()
  })
}

function pullProgress() {
  if (!isCloudAvailable()) return Promise.resolve()
  const state = getLoginState()
  if (!state || !state.account) return Promise.resolve()
  return callCloud('getProgress', { account: state.account }).then(data => {
    if (data.progress) progressService.importProgress(data.progress)
    return data.progress
  })
}

function register(payload = {}) {
  const account = String(payload.account || '').trim()
  const password = String(payload.password || '')
  const confirm = String(payload.confirm || '')
  const error = validate(account, password, confirm, true)
  if (error) return Promise.reject(new Error(error))

  if (isCloudAvailable()) {
    return callCloud('register', { account, password, nickname: account }).then(data => {
      progressService.initAccountScope(account)
      const state = applyLogin(data.state || buildState(account))
      // 把本机已有进度作为这份账号的初始档上传
      return pushProgress().then(() => state, () => state)
    })
  }

  return Promise.resolve().then(() => {
    const accounts = progressService.getAccounts()
    if (accounts[account]) throw new Error('该账号已注册，请直接登录')
    const salt = makeSalt()
    accounts[account] = {
      salt,
      passwordHash: localHash(password, salt),
      createdAt: Date.now()
    }
    progressService.setAccounts(accounts)
    progressService.initAccountScope(account)
    return applyLogin(buildState(account))
  })
}

function login(payload = {}) {
  const account = String(payload.account || '').trim()
  const password = String(payload.password || '')
  const error = validate(account, password, '', false)
  if (error) return Promise.reject(new Error(error))

  if (isCloudAvailable()) {
    return callCloud('login', { account, password }).then(data => {
      const state = applyLogin(data.state || buildState(account), data.progress)
      const hasRemote = data.progress && typeof data.progress === 'object' &&
        Object.keys(data.progress).length > 0
      if (hasRemote) return state
      // 云端是空档（含旧版 null 档）时，把本机进度补传上去
      return pushProgress().then(() => state, () => state)
    })
  }

  return Promise.resolve().then(() => {
    const record = progressService.getAccounts()[account]
    if (!record) throw new Error('账号不存在，请先注册')
    if (record.passwordHash !== localHash(password, record.salt)) {
      throw new Error('账号或密码不正确')
    }
    return applyLogin(buildState(account, record.nickname))
  })
}

function loginAsGuest() {
  return applyLogin({ mode: MODE.guest, account: '', loginAt: Date.now() })
}

/** 退出前先上传进度（云同步开启时），失败也不阻断退出 */
function logout() {
  const state = getLoginState()
  const pending = isCloudAvailable() && state && state.account
    ? pushProgress().catch(() => {})
    : Promise.resolve()
  return pending.then(() => {
    progressService.clearLoginState()
    progressService.setAccountScope('')
  })
}

module.exports = {
  MODE,
  isCloudAvailable,
  isLoggedIn,
  getLoginState,
  register,
  login,
  loginAsGuest,
  logout,
  pushProgress,
  pullProgress
}
