const config = require('../../config/index.js')
const battleService = require('../../services/battleService.js')
const quizService = require('../../services/quizService.js')

const POLL_MS = 2000
const QUESTION_MS = 5000
const TIMEOUT = -1

function sumCosts(costs) {
  if (!Array.isArray(costs)) return 0
  return costs.reduce((sum, v) => sum + (Number(v) || 0), 0)
}

function timeText(ms) {
  return (ms / 1000).toFixed(1) + 's'
}

Page({
  data: {
    roomId: '',
    role: '',
    status: 'waiting',
    loading: true,
    error: '',
    submitting: false,
    questions: [],
    total: 10,
    fullScore: 50,
    current: 0,
    myAnswers: [],
    peerCount: 0,
    myName: '我',
    peerName: '对手',
    myScore: 0,
    peerScore: 0,
    myTimeText: '0.0s',
    peerTimeText: '0.0s',
    resultText: '',
    timeLeftText: '5.0',
    timerPercent: 100,
    urgent: false
  },

  onLoad(options) {
    const roomId = String((options && options.roomId) || '').toUpperCase()
    const role = String((options && options.role) || '')
    this.setData({ roomId, role })
    if (!/^[0-9A-F]{6}$/.test(roomId)) {
      this.setData({ loading: false, error: '缺少有效的房间号' })
      return
    }
    this.poll()
    this.startPolling()
  },

  onShow() {
    if (/^[0-9A-F]{6}$/.test(this.data.roomId)) this.poll()
  },

  onHide() {
    this.stopPolling()
    this.stopQuestionTimer()
  },

  onUnload() {
    this.stopPolling()
    this.stopQuestionTimer()
    if (this.data.status !== 'finished' && this.data.roomId) {
      battleService.leave(this.data.roomId).catch(() => {})
    }
  },

  startPolling() {
    this.stopPolling()
    this._pollTimer = setInterval(() => this.poll(), POLL_MS)
  },

  stopPolling() {
    if (this._pollTimer) {
      clearInterval(this._pollTimer)
      this._pollTimer = null
    }
  },

  /** 轮询房间：题目只需还原一次，之后只同步作答进度与结果 */
  poll() {
    if (!this.data.roomId || this._polling) return
    this._polling = true
    battleService.getState(this.data.roomId)
      .then(data => {
        this._polling = false
        this.applyState(data)
      }, err => {
        this._polling = false
        this.setData({
          loading: false,
          error: (err && err.message) || '连接房间失败'
        })
      })
  },

  applyState(data) {
    const questions = this.data.questions.length
      ? this.data.questions
      : quizService.byIndexes(data.questionIds)

    // 把云端答案规范成固定长度数组：-1 超时、0/1 已答、null 未答
    const raw = Array.isArray(data.myAnswers) ? data.myAnswers : []
    const myAnswers = questions.map((_, i) => {
      const v = raw[i]
      return v === 0 || v === 1 || v === TIMEOUT ? v : null
    })
    const pending = myAnswers.findIndex(v => v === null)
    const nextCurrent = pending < 0 ? questions.length : pending

    const patch = {
      loading: false,
      error: '',
      status: data.status,
      questions,
      total: questions.length,
      fullScore: questions.length * 5,
      myAnswers,
      // 本地乐观推进后不让轮询把当前题倒退，避免重复计时
      current: Math.max(nextCurrent, this.data.current),
      peerCount: data.peerCount || 0,
      myName: data.role === 'host' ? (data.hostName || '我') : (data.guestName || '我'),
      peerName: data.role === 'host' ? (data.guestName || '对手') : (data.hostName || '对手')
    }

    if (data.status === 'finished' && Array.isArray(data.peerAnswers)) {
      const myScore = quizService.score(myAnswers, questions)
      const peerScore = quizService.score(data.peerAnswers, questions)
      const myTime = sumCosts(data.myCosts)
      const peerTime = sumCosts(data.peerCosts)
      patch.myScore = myScore
      patch.peerScore = peerScore
      patch.myTimeText = timeText(myTime)
      patch.peerTimeText = timeText(peerTime)
      if (myScore !== peerScore) {
        patch.resultText = myScore > peerScore ? '胜 · 分数领先' : '负 · 分数落后'
      } else if (myTime !== peerTime) {
        patch.resultText = myTime < peerTime ? '胜 · 同分更快' : '负 · 同分稍慢'
      } else {
        patch.resultText = '平 · 棋逢对手'
      }
    }
    this.setData(patch, () => this.syncQuestionTimer())
  },

  /** 本题已耗毫秒，夹在 0~5000，超时按满额计时 */
  elapsed() {
    if (!this._questionStart) return QUESTION_MS
    return Math.max(0, Math.min(QUESTION_MS, Date.now() - this._questionStart))
  },

  /** 当前题变化时才重启 5 秒倒计时，轮询不会打断计时 */
  syncQuestionTimer() {
    const { status, current, total } = this.data
    if (status !== 'playing' || current >= total) {
      this.stopQuestionTimer()
      return
    }
    if (this._timerRunning && this._timerIndex === current) return
    this.startQuestionTimer(current)
  },

  startQuestionTimer(index) {
    this.stopQuestionTimer()
    this._timerIndex = index
    this._timerRunning = true
    this._questionStart = Date.now()
    this.setData({ timeLeftText: '5.0', timerPercent: 100, urgent: false })
    this._questionTimer = setInterval(() => {
      const left = Math.max(0, QUESTION_MS - (Date.now() - this._questionStart))
      this.setData({
        timeLeftText: (left / 1000).toFixed(1),
        timerPercent: Math.round(left / QUESTION_MS * 100),
        urgent: left <= 2000
      })
      if (left <= 0) this.onTimeout()
    }, 100)
  },

  stopQuestionTimer() {
    if (this._questionTimer) {
      clearInterval(this._questionTimer)
      this._questionTimer = null
    }
    this._timerRunning = false
  },

  onSelect(e) {
    if (this.data.status !== 'playing' || this.data.submitting) return
    const answer = Number(e.currentTarget.dataset.idx)
    const current = this.data.current
    if (current >= this.data.total) return

    const costMs = this.elapsed()
    this.stopQuestionTimer()
    this.setData({ submitting: true })
    battleService.submitAnswer(this.data.roomId, current, answer, costMs)
      .then(() => {
        this.acceptAnswer(current, answer)
        this.poll()
      }, err => {
        this.setData({ submitting: false })
        wx.showToast({ title: (err && err.message) || '提交失败', icon: 'none' })
        this.syncQuestionTimer()
      })
  },

  /** 5 秒到时按 -1 提交：本题不得分，自动进入下一题 */
  onTimeout() {
    this.stopQuestionTimer()
    if (this.data.status !== 'playing' || this.data.submitting) return
    const current = this.data.current
    if (current >= this.data.total) return

    this.setData({ submitting: true })
    battleService.submitAnswer(this.data.roomId, current, TIMEOUT, QUESTION_MS)
      .then(() => {
        this.acceptAnswer(current, TIMEOUT)
        wx.showToast({ title: '超时，本题不得分', icon: 'none', duration: 800 })
        this.poll()
      }, err => {
        // 不自动重启倒计时，避免旧版云函数拒绝 -1 时陷入「5 秒一次」的死循环
        this.setData({
          submitting: false,
          error: (err && err.message) || '超时提交失败'
        })
        wx.showToast({ title: '超时提交失败，请点上方重试', icon: 'none' })
      })
  },

  acceptAnswer(index, answer) {
    const answers = this.data.myAnswers.slice()
    while (answers.length < this.data.total) answers.push(null)
    answers[index] = answer
    this.setData({
      submitting: false,
      myAnswers: answers,
      current: index + 1
    }, () => this.syncQuestionTimer())
  },

  onCopyRoom() {
    wx.setClipboardData({ data: this.data.roomId })
  },

  onBack() {
    wx.navigateBack({ fail: () => wx.redirectTo({ url: config.ROUTES.battle }) })
  },

  onAgain() {
    this.onBack()
  }
})
