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

function getDialog(heroName, sceneName) {
  return dialogs[buildKey(heroName, sceneName)] || []
}

module.exports = { buildKey, getDialog }
