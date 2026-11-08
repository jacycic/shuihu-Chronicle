/**
 * 用户进度数据服务 —— 本地持久化的唯一入口
 * ------------------------------------------------------------------
 * 页面不再直接调用 wx.getStorageSync / setStorageSync。
 * 业务进度按当前账号分命名空间存储：同一设备里不同账号各有自己的
 * 收集进度与成就；登录态、账号表是全局键，不随账号切换。
 * 将来接入后端时，可在此把 read/write 换成 request.get/post。
 */
const config = require('../config/index.js')

const K = config.STORAGE_KEYS

// 全局键：不随账号隔离
const GLOBAL_KEYS = [K.loginState, K.accounts]
// 属于「一份进度」的键：注册继承与云端同步都以这组为准
const PROGRESS_KEYS = [
  K.unlockHero, K.sceneUnlock, K.achievements, K.shownAchievements,
  K.firstEnter, K.customProfile, K.avatar, K.nickname, K.logs
]

let accountScope = ''

/** 复制可序列化值，避免继承/导入进度时与原档共享对象引用 */
function clone(value) {
  if (value === null || typeof value !== 'object') return value
  try {
    return JSON.parse(JSON.stringify(value))
  } catch (e) {
    return value
  }
}

function rawRead(key, fallback) {
  try {
    const value = wx.getStorageSync(key)
    return value === '' || value === null || value === undefined ? fallback : value
  } catch (e) {
    return fallback
  }
}

function rawWrite(key, value) {
  try {
    wx.setStorageSync(key, value)
  } catch (e) {
    console.error('缓存写入失败', key, e)
  }
}

function rawRemove(key) {
  try {
    wx.removeStorageSync(key)
  } catch (e) {
    console.error('缓存删除失败', key, e)
  }
}

function scoped(key) {
  return accountScope && GLOBAL_KEYS.indexOf(key) === -1 ? key + '@' + accountScope : key
}

function read(key, fallback) {
  return rawRead(scoped(key), fallback)
}

function write(key, value) {
  rawWrite(scoped(key), value)
}

function remove(key) {
  rawRemove(scoped(key))
}

/** 冷启动时从登录态恢复账号作用域，须在任何进度读写之前调用 */
function restoreAccountScope() {
  const state = getLoginState()
  accountScope = state && state.account ? state.account : ''
  return accountScope
}

function setAccountScope(account) {
  accountScope = account || ''
}

function getAccountScope() {
  return accountScope
}

/**
 * 注册新账号时建立独立进度档，并继承本机已有旧进度，
 * 避免换成账号密码登录后「进度不见了」。
 */
function initAccountScope(account) {
  if (!account) return
  const previous = accountScope
  accountScope = account
  PROGRESS_KEYS.forEach(key => {
    const target = scoped(key)
    const inherited = rawRead(key, undefined)
    if (inherited !== undefined && rawRead(target, undefined) === undefined) {
      rawWrite(target, clone(inherited))
    }
  })
  accountScope = previous
}

function exportProgress() {
  const snapshot = {}
  PROGRESS_KEYS.forEach(key => { snapshot[key] = read(key, null) })
  return snapshot
}

function importProgress(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return
  PROGRESS_KEYS.forEach(key => {
    const value = snapshot[key]
    if (Object.prototype.hasOwnProperty.call(snapshot, key) && value !== null && value !== undefined) {
      write(key, clone(value))
    }
  })
}

function getAccounts() {
  const list = rawRead(K.accounts, {})
  return list && typeof list === 'object' ? list : {}
}

function setAccounts(list) {
  rawWrite(K.accounts, list)
}

/**
 * 启动时的兼容迁移。
 * 旧版本把场景进度写在 heroSceneUnlockStorage，而页面读写用的是
 * heroSceneUnlock，导致冷启动读不到进度；这里把旧数据迁到统一键。
 */
function init() {
  const current = read(K.sceneUnlock, null)
  if (current && typeof current === 'object' && Object.keys(current).length) return
  const legacy = read(K.legacySceneUnlock, null)
  if (legacy && typeof legacy === 'object') {
    write(K.sceneUnlock, legacy)
  }
}

function getUnlockedHeroes() {
  const list = read(K.unlockHero, [])
  return Array.isArray(list) ? list : []
}

/** 解锁好汉，返回是否为本次新解锁 */
function unlockHero(name) {
  const list = getUnlockedHeroes()
  if (list.includes(name)) return false
  list.push(name)
  write(K.unlockHero, list)
  return true
}

function getSceneUnlock() {
  const value = read(K.sceneUnlock, {})
  return value && typeof value === 'object' ? value : {}
}

function setSceneUnlock(heroName, index) {
  const all = getSceneUnlock()
  all[heroName] = index
  write(K.sceneUnlock, all)
  return all
}

function getAchievements() {
  const list = read(K.achievements, [])
  return Array.isArray(list) ? list : []
}

function setAchievements(list) {
  write(K.achievements, list)
}

/** 已经弹过解锁提示的成就名，避免重复弹或漏弹 */
function getShownAchievements() {
  const list = read(K.shownAchievements, [])
  return Array.isArray(list) ? list : []
}

function setShownAchievements(names) {
  write(K.shownAchievements, names)
}

function getFlag(key) {
  return !!read(key, false)
}

function setFlag(key, value = true) {
  write(key, value)
}

function getAvatar() {
  return read(K.avatar, '')
}

function setAvatar(url) {
  write(K.avatar, url)
}

function clearAvatar() {
  remove(K.avatar)
}

function getNickname() {
  return read(K.nickname, '')
}

function setNickname(name) {
  write(K.nickname, name)
}

function getLoginState() {
  const state = read(K.loginState, null)
  return state && typeof state === 'object' && state.mode ? state : null
}

function isLoggedIn() {
  return !!getLoginState()
}

function setLoginState(state) {
  write(K.loginState, state)
}

/** 只清登录态，保留收集进度、成就与昵称等本机数据 */
function clearLoginState() {
  remove(K.loginState)
}

function getLogs() {
  const list = read(K.logs, [])
  return Array.isArray(list) ? list : []
}

module.exports = {
  init,
  restoreAccountScope,
  setAccountScope,
  getAccountScope,
  initAccountScope,
  exportProgress,
  importProgress,
  getAccounts,
  setAccounts,
  getUnlockedHeroes,
  unlockHero,
  getSceneUnlock,
  setSceneUnlock,
  getAchievements,
  setAchievements,
  getShownAchievements,
  setShownAchievements,
  getFlag,
  setFlag,
  getAvatar,
  setAvatar,
  clearAvatar,
  getNickname,
  setNickname,
  getLoginState,
  isLoggedIn,
  setLoginState,
  clearLoginState,
  getLogs
}
