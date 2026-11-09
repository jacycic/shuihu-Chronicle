const config = require('../../config/index.js')
const quizService = require('../../services/quizService.js')
const audioService = require('../../services/audioService.js')

Page({
  /**
   * questionList：本次从共享题库随机抽取的 20 道题
   * current：当前题目下标 / score：得分，一题 5 分，满分 100
   * isFinish：是否结束 / evaluateText：评语
   */
  data: {
    questionList: [],
    current: 0,
    score: 0,
    fullScore: 100,
    total: 20,
    isFinish: false,
    evaluateText: ""
  },

  onLoad() {
    this.initQuiz()
  },

  onShow() {
    this.initQuiz()
  },

  /** 题库已抽到 data/quizBank.js，一套卷内不重复，水浒 / 宋代 / 古代通识混合 */
  initQuiz() {
    this.setData({
      questionList: quizService.pick(this.data.total),
      current: 0,
      score: 0,
      isFinish: false,
      evaluateText: ""
    })
  },

  selectAnswer(e) {
    const selectIdx = Number(e.currentTarget.dataset.idx)
    const { current, questionList, score } = this.data
    const newScore = score + (selectIdx === questionList[current].ans ? 5 : 0)

    if (current >= this.data.total - 1) {
      let text = ""
      if (newScore >= 90) text = "✅ 梁山百事通！熟读水浒，好汉如数家珍！"
      else if (newScore >= 70) text = "👍 不错！你对梁山故事颇为熟悉！"
      else if (newScore >= 50) text = "📖 略知一二，可以再多读读水浒故事！"
      else text = "📚 初入梁山，不妨从头品读《水浒传》！"
      this.setData({ score: newScore, isFinish: true, evaluateText: text })
    } else {
      this.setData({ current: current + 1, score: newScore })
    }
  },

  /** 点击音效，统一走音频服务 */
  SectionSound() {
    audioService.play('section')
  },

  restartQuiz() {
    this.initQuiz()
  },

  goBattle() {
    wx.navigateTo({ url: config.ROUTES.battle })
  }
})
