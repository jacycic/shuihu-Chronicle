/**
 * 剧情脚本数据服务
 * ------------------------------------------------------------------
 * 屏蔽 108 个静态脚本文件的组织方式与「好汉名|场景名」主键细节。
 * 将来脚本改由后端按 heroId/sceneId 下发时，只需替换本模块实现。
 */
const dialogs = require('../data/semeDialog.js')

function buildKey(heroName, sceneName) {
  return `${heroName}|${sceneName}`
}

/**
 * 名称容错：历史脚本里出现过首尾空格、异体字（岗/冈）等，
 * 精确匹配失败时会让整个场景对话空白，这里做一层规范化兜底。
 */
function normalizeKey(key) {
  return String(key || '')
    .replace(/\s+/g, '')
    .replace(/岗/g, '冈')
    .replace(/[（）()·、，,。！!？?：:；;]/g, '')
}

const normalizedIndex = new Map()
Object.keys(dialogs).forEach(key => {
  const normalized = normalizeKey(key)
  if (!normalizedIndex.has(normalized)) normalizedIndex.set(normalized, key)
})

function getDialog(heroName, sceneName) {
  const exact = dialogs[buildKey(heroName, sceneName)]
  if (Array.isArray(exact) && exact.length) return exact
  const fallback = normalizedIndex.get(normalizeKey(buildKey(heroName, sceneName)))
  return fallback ? dialogs[fallback] : []
}

module.exports = { buildKey, getDialog }
