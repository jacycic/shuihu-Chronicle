/**
 * 好汉档案 + 领域计算服务
 * ------------------------------------------------------------------
 * 数据源边界：默认读本地 data/heroes.js；config.API.enabled 打开后
 * 由 refreshFromRemote() 经 services/request.js 从后端预热。
 * 页面始终调用同步接口，切换到远程数据源不需要改页面。
 */
const config = require('../config/index.js')
const request = require('./request.js')
const localHeroes = require('../data/heroes.js')
const heroQuotes = require('../data/heroQuotes.js')

/** 原著摘录：按姓名索引，切换到远程数据源时同样可用 */
function getQuote(name) {
  return heroQuotes[name] || null
}

let heroCache = localHeroes
// 测试匹配结果属于跨页运行时状态，由服务层持有，不再塞进 globalData
let currentResult = null

function getAll() {
  return heroCache
}

function getNames() {
  return heroCache.map(hero => hero.name)
}

function findByName(name) {
  return heroCache.find(hero => hero.name === name) || null
}

function getAvatar(name) {
  const hero = findByName(name)
  return hero && hero.imglist && hero.imglist.length ? hero.imglist[0].img : ''
}

function getTotalScore(hero) {
  return config.SCORE_FIELDS.reduce((sum, key) => sum + (Number(hero[key]) || 0), 0)
}

/** 图鉴列表：附带解锁标记 */
function getCodexList(unlockedNames = []) {
  return heroCache.map(hero => ({
    ...hero,
    unlock: unlockedNames.includes(hero.name)
  }))
}

/** 排行榜数据源：只保留已解锁好汉，并补总分字段 */
function getRankSource(unlockedNames = []) {
  return heroCache
    .filter(hero => unlockedNames.includes(hero.name))
    .map(hero => ({ ...hero, totalScore: getTotalScore(hero) }))
}

/**
 * 人格测试匹配：按好汉总分升序切成 5 个区间池，
 * 再按用户总分选池随机抽取一名好汉。
 */
function matchByScore(userTotal) {
  const pool = heroCache
    .map(hero => ({ ...hero, heroTotal: getTotalScore(hero) }))
    .sort((a, b) => a.heroTotal - b.heroTotal)

  const partLen = Math.floor(pool.length / 5)
  const zones = [
    pool.slice(0, partLen),
    pool.slice(partLen, partLen * 2),
    pool.slice(partLen * 2, partLen * 3),
    pool.slice(partLen * 3, partLen * 4),
    pool.slice(partLen * 4)
  ]

  let zoneIndex = 0
  if (userTotal <= 9) zoneIndex = 0
  else if (userTotal <= 19) zoneIndex = 1
  else if (userTotal <= 29) zoneIndex = 2
  else if (userTotal <= 39) zoneIndex = 3
  else zoneIndex = 4

  const target = zones[zoneIndex]
  return target[Math.floor(Math.random() * target.length)]
}

function setResult(hero) {
  currentResult = hero
}

function getResult() {
  return currentResult
}

/** 图鉴收录序号（按档案顺序，1~108） */
function getSeatIndex(name) {
  const index = heroCache.findIndex(hero => hero.name === name)
  return index < 0 ? 0 : index + 1
}

/** 五维总分实力榜名次，同分并列 */
function getPowerRank(name) {
  const target = findByName(name)
  if (!target) return 0
  const score = getTotalScore(target)
  return heroCache.filter(hero => getTotalScore(hero) > score).length + 1
}

/**
 * 远程数据预热：默认不启用，零网络请求；失败时静默回退本地数据，
 * 保证接入后端后离线场景仍可用。
 */
function refreshFromRemote() {
  if (!request.isEnabled()) return Promise.resolve(heroCache)
  return request.get(config.API.endpoints.heroes)
    .then(list => {
      if (Array.isArray(list) && list.length) heroCache = list
      return heroCache
    })
    .catch(() => heroCache)
}

module.exports = {
  getAll,
  getNames,
  findByName,
  getAvatar,
  getTotalScore,
  getCodexList,
  getRankSource,
  matchByScore,
  setResult,
  getResult,
  getSeatIndex,
  getPowerRank,
  getQuote,
  refreshFromRemote
}
