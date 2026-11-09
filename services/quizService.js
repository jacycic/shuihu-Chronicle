/**
 * 趣味问答领域服务
 * ------------------------------------------------------------------
 * 单机答题与联机对战共用 data/quizBank.js。
 * 云端房间只保存题目下标，双方按同一份题库还原题目，
 * 因此题库更新后只需保证同一版本的小程序互相对战。
 */
const bank = require('../data/quizBank.js')
const { shuffle } = require('../utils/util.js')

function getBank() {
  return bank
}

function getBankSize() {
  return bank.length
}

function getTags() {
  return [...new Set(bank.map(q => q.tag))]
}

/** 随机抽题：优先从指定分类抽，不足时从全库补齐，一套卷内不重复 */
function pick(count, tags) {
  const wanted = Number(count) || 20
  let pool = bank.map((q, i) => i)
  if (tags && tags.length) {
    const filtered = pool.filter(i => tags.includes(bank[i].tag))
    if (filtered.length >= wanted) pool = filtered
  }
  const ids = shuffle(pool).slice(0, wanted)
  if (ids.length < wanted) {
    const rest = shuffle(pool.filter(i => !ids.includes(i)))
    ids.push(...rest.slice(0, wanted - ids.length))
  }
  return byIndexes(ids)
}

/** 按云端房间保存的下标还原题目（顺序必须与房间一致） */
function byIndexes(ids) {
  if (!Array.isArray(ids)) return []
  return ids.map(i => bank[i]).filter(Boolean)
}

/** 每题分值默认 5 分；answers 中未作答记 0 分 */
function score(answers, questions, per = 5) {
  if (!Array.isArray(answers) || !Array.isArray(questions)) return 0
  return questions.reduce((sum, q, i) => sum + (answers[i] === q.ans ? per : 0), 0)
}

function answeredCount(answers) {
  if (!Array.isArray(answers)) return 0
  return answers.filter(v => v === 0 || v === 1).length
}

module.exports = {
  getBank,
  getBankSize,
  getTags,
  pick,
  byIndexes,
  score,
  answeredCount
}
