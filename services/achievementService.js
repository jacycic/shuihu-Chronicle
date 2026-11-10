/**
 * 成就领域服务
 * ------------------------------------------------------------------
 * 规则来自 data/achievementRules.js，状态来自 progressService。
 * 任何页面都能拿到最新成就状态和「待提示」名单，不再依赖页面 data，
 * 也不再使用 Page.triggerEvent（Page 没有该 API，事件永远发不出去）。
 */
const config = require('../config/index.js')
const progressService = require('./progressService.js')
const quizProgressService = require('./quizProgressService.js')
const rules = require('../data/achievementRules.js')

function evaluate() {
  const unlockedHeroes = progressService.getUnlockedHeroes()
  const count = unlockedHeroes.length
  const firstEnter = progressService.getFlag(config.STORAGE_KEYS.firstEnter)
  const customProfile = progressService.getFlag(config.STORAGE_KEYS.customProfile)
  const quizStats = progressService.getQuizStats()

  return rules.map(rule => {
    let unlocked = false
    if (rule.isFirstEnter) {
      unlocked = firstEnter
    } else if (rule.needEditInfo) {
      unlocked = customProfile
    } else if (rule.total) {
      unlocked = count >= rule.total
    } else if (rule.heroes && rule.heroes.length > 0) {
      unlocked = rule.heroes.every(name => unlockedHeroes.includes(name))
    } else if (rule.quiz) {
      // 答题类成就：由单人答题累计进度判定，与好汉收集互不影响
      unlocked = quizProgressService.statValue(quizStats, rule.quiz.key) >= rule.quiz.min
    }
    return { ...rule, unlocked }
  })
}

/** 计算最新状态并同步统计缓存（供成就页、个人中心使用） */
function getList() {
  const list = evaluate()
  progressService.setAchievements(list)
  return list
}

/** 尚未提示过的已解锁成就名；读取时不消耗，避免组件缺失时丢失提示 */
function getPendingUnlocks() {
  const shown = progressService.getShownAchievements()
  return getList()
    .filter(item => item.unlocked && !shown.includes(item.name))
    .map(item => item.name)
}

/** 组件确认展示后，才把成就标记为已提示 */
function markAsShown(names) {
  if (!Array.isArray(names) || !names.length) return
  const merged = new Set([...progressService.getShownAchievements(), ...names])
  progressService.setShownAchievements([...merged])
}

module.exports = { getList, getPendingUnlocks, markAsShown }
