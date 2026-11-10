/**
 * 答题进度与知识卡服务
 * ------------------------------------------------------------------
 * 把「答了几题 / 答对几题 / 读过几条小知识」落到 progressService，
 * 供成就规则判定；同时负责按顺序发知识卡与生成成就解锁提示。
 * 数据按账号隔离，并随 PROGRESS_KEYS 一起参与云端进度同步。
 */
const progressService = require('./progressService.js')
const achievementRules = require('../data/achievementRules.js')
const facts = require('../data/quizFacts.js')

/** 成就规则与页面提示共用的取值口径：数组取长度，数值取数字 */
function statValue(stats, key) {
  const value = stats && stats[key]
  if (Array.isArray(value)) return value.length
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

function stats() {
  return progressService.getQuizStats()
}

function recordAnswer(question, correct) {
  const s = stats()
  const patch = {
    answered: s.answered + 1,
    correct: s.correct + (correct ? 1 : 0)
  }
  if (correct && question && question.tag === '宋代') {
    patch.songCorrect = s.songCorrect + 1
  }
  progressService.saveQuizStats(Object.assign({}, s, patch))
  return progressService.getQuizStats()
}

function finishRound(score) {
  const s = stats()
  progressService.saveQuizStats(Object.assign({}, s, {
    rounds: s.rounds + 1,
    bestScore: Math.max(s.bestScore, Number(score) || 0)
  }))
  return progressService.getQuizStats()
}

/** 优先发没读过的；全部读完后按答题数轮转复看 */
function readNextFact() {
  const s = stats()
  const read = s.factsRead.slice()
  let fact = facts.find(item => !read.includes(item.id))
  if (!fact) fact = facts[s.answered % facts.length]
  if (!read.includes(fact.id)) {
    read.push(fact.id)
    progressService.saveQuizStats(Object.assign({}, s, { factsRead: read }))
  }
  return fact
}

function factTotal() {
  return facts.length
}

/** 知识卡下方的成就解锁提示：优先报刚解锁的答题成就，其次报下一个目标的进度 */
function achievementHint() {
  const s = stats()
  const quizNames = achievementRules.filter(rule => rule.quiz).map(rule => rule.name)
  // 函数内引入，避开 achievementService → quizProgressService 的循环依赖
  const pending = require('./achievementService.js').getPendingUnlocks()
    .filter(name => quizNames.includes(name))
  if (pending.length) {
    return {
      name: pending[0],
      current: 0,
      min: 0,
      text: '成就提示：已解锁「' + pending.join('、') + '」，关闭本卡后可见解锁提示，去成就页能读到科普介绍'
    }
  }
  for (const rule of achievementRules) {
    if (!rule.quiz) continue
    const current = statValue(s, rule.quiz.key)
    if (current >= rule.quiz.min) continue
    return {
      name: rule.name,
      current,
      min: rule.quiz.min,
      text: '成就提示：' + rule.desc + '（' + current + '/' + rule.quiz.min + '），达标解锁「' + rule.name + '」'
    }
  }
  return { name: '', current: 0, min: 0, text: '成就提示：答题类成就已全部达成，去成就页读读科普吧' }
}

module.exports = {
  statValue,
  stats,
  recordAnswer,
  finishRound,
  readNextFact,
  factTotal,
  achievementHint
}
