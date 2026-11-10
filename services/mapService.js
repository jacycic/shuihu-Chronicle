/**
 * 剧情地图服务
 * ------------------------------------------------------------------
 * 把 sceneList[].name 归一到 data/songMap.js 的州府节点，
 * 供 playing 页在示意舆图上标出当前场景所在位置。
 * 只做「地名 → 相对方位」映射，不涉及真实经纬度与定位权限。
 */
const data = require('../data/songMap.js')

function findPlace(key) {
  return data.places.find(p => p.key === key) || data.places[1]
}

/** 场景名 → 州府；未命中的泛称标 approx，由页面注明「暂标」 */
function resolve(sceneName) {
  const name = String(sceneName || '').replace(/[\s·，,。！？]/g, '').replace(/岗/g, '冈')
  for (const rule of data.rules) {
    if (rule.keys.some(key => name.includes(key))) {
      return Object.assign({}, findPlace(rule.place), { approx: false })
    }
  }
  return Object.assign({}, findPlace('liangshan'), { approx: true })
}

/** 带 active / visited 标记的全部节点 */
function getPlaces(activeKey, visitedKeys) {
  const visited = Array.isArray(visitedKeys) ? visitedKeys : []
  return data.places.map(p => Object.assign({}, p, {
    active: p.key === activeKey,
    visited: visited.includes(p.key)
  }))
}

/** 当前进度（或当前打开）场景的定位结果 */
function currentFor(sceneList, idx) {
  const list = Array.isArray(sceneList) ? sceneList : []
  if (!list.length) return { name: '', place: null, approx: false }
  const safeIdx = Math.max(0, Math.min(Number(idx) || 0, list.length - 1))
  const scene = list[safeIdx]
  const place = resolve(scene.name)
  return { name: scene.name, place, approx: place.approx }
}

/** 已走过的场景对应的州府，用于地图上的「行迹」标记 */
function visitedFor(sceneList, idx) {
  const list = Array.isArray(sceneList) ? sceneList : []
  const safeIdx = Math.max(0, Math.min(Number(idx) || 0, list.length - 1))
  return list.slice(0, safeIdx + 1).map(s => resolve(s.name).key)
}

/** 点击地图节点时的详情：地名资料 + 当前场景 / 行迹状态 */
function getPlaceDetail(key, state) {
  const place = data.places.find(p => p.key === key)
  if (!place) return null
  const mark = state || {}
  return Object.assign({}, place, data.placeInfo[key] || {}, {
    isCurrent: !!mark.active,
    isVisited: !!mark.visited
  })
}

module.exports = { resolve, getPlaces, currentFor, visitedFor, findPlace, getPlaceDetail }
