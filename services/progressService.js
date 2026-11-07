/**
 * 用户进度数据服务 —— 本地持久化的唯一入口
 * ------------------------------------------------------------------
 * 页面不再直接调用 wx.getStorageSync / setStorageSync。
 * 将来接入后端时，可在此把 read/write 换成 request.get/post。
 */
const config = require('../config/index.js')

const K = config.STORAGE_KEYS

function read(key, fallback) {
  try {
    const value = wx.getStorageSync(key)
    return value === '' || value === null || value === undefined ? fallback : value
  } catch (e) {
    return fallback
  }
}

function write(key, value) {
  try {
    wx.setStorageSync(key, value)
  } catch (e) {
    console.error('缓存写入失败', key, e)
  }
}

function remove(key) {
  try {
    wx.removeStorageSync(key)
  } catch (e) {
    console.error('缓存删除失败', key, e)
  }
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

function getLogs() {
  const list = read(K.logs, [])
  return Array.isArray(list) ? list : []
}

module.exports = {
  init,
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
  getLogs
}
