const quizService = require('../../services/quizService.js')
const quizProgressService = require('../../services/quizProgressService.js')
const achievementService = require('../../services/achievementService.js')
const audioService = require('../../services/audioService.js')
const { flushAchievementTips } = require('../../utils/tip.js')

const FACT_EVERY = 5

Page({
  /**
   * 单人答题：20 题一局，每答 5 题穿插一张小知识卡。
   * 答题进度写入 progressService，用于成就判定与解锁提示。
   */
  data: {
    questionList: [],
    current: 0,
    score: 0,
    fullScore: 100,
    total: 20,
    isFinish: false,
    evaluateText: '',
    factVisible: false,
    fact: null,
    factIndex: 0,
    factReadCount: 0,
    factTotal: 0,
    factHint: '',
    unlockedText: ''
  },

  onLoad() {
    this.initQuiz()
  },

  onShow() {
    // 只补弹成就提示，不重开一局，避免答题中途被清空
    flushAchievementTips(this)
  },

  initQuiz() {
    this._unlockedAtStart = achievementService.getList()
      .filter(item => item.unlocked).map(item => item.name)
    this.setData({
      questionList: quizService.pick(this.data.total),
      current: 0,
      score: 0,
      isFinish: false,
      evaluateText: '',
      factVisible: false,
      fact: null,
      factHint: '',
      unlockedText: '',
      factTotal: quizProgressService.factTotal(),
      factReadCount: quizProgressService.stats().factsRead.length
    })
  },

  evaluate(score) {
    if (score >= 90) return '✅ 梁山百事通！熟读水浒，好汉如数家珍！'
    if (score >= 70) return '👍 不错！你对梁山故事颇为熟悉！'
    if (score >= 50) return '📖 略知一二，可以再多读读水浒故事！'
    return '📚 初入梁山，不妨从头品读《水浒传》！'
  },

  selectAnswer(e) {
    if (this.data.isFinish || this.data.factVisible) return
    const selectIdx = Number(e.currentTarget.dataset.idx)
    const { current, questionList, score } = this.data
    const question = questionList[current]
    if (!question) return

    const correct = selectIdx === question.ans
    const newScore = score + (correct ? 5 : 0)
    quizProgressService.recordAnswer(question, correct)

    const next = current + 1
    const patch = { score: newScore }
    if (next >= this.data.total) {
      quizProgressService.finishRound(newScore)
      const unlocked = achievementService.getList()
        .filter(item => item.unlocked && !this._unlockedAtStart.includes(item.name))
        .map(item => item.name)
      patch.isFinish = true
      patch.evaluateText = this.evaluate(newScore)
      patch.unlockedText = unlocked.length ? '本局解锁成就：' + unlocked.join('、') : ''
    } else {
      patch.current = next
    }
    this.setData(patch)

    // 第 5/10/15 题后展示小知识卡，最后一道题直接结算
    if (next % FACT_EVERY === 0 && next < this.data.total) this.openFact()
    else flushAchievementTips(this)
  },

  openFact() {
    const fact = quizProgressService.readNextFact()
    const hint = quizProgressService.achievementHint()
    const read = quizProgressService.stats().factsRead.length
    this.setData({
      factVisible: true,
      fact,
      factIndex: read,
      factReadCount: read,
      factTotal: quizProgressService.factTotal(),
      factHint: hint.text
    })
  },

  closeFact() {
    this.setData({ factVisible: false, fact: null })
    // 读到小知识可能刚好解锁成就，关闭卡片后再弹，避免两层浮层互相遮挡
    flushAchievementTips(this)
  },

  noop() {},

  /** 点击音效，统一走音频服务 */
  SectionSound() {
    audioService.play('section')
  },

  restartQuiz() {
    this.initQuiz()
  }
})
