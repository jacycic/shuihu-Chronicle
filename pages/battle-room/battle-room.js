const config = require('../../config/index.js')
const battleService = require('../../services/battleService.js')
const quizService = require('../../services/quizService.js')

const POLL_MS = 2000

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
    resultText: ''
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
  },

  onUnload() {
    this.stopPolling()
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
    const myAnswers = Array.isArray(data.myAnswers) ? data.myAnswers.slice() : []
    const pending = myAnswers.findIndex(v => v !== 0 && v !== 1)
    const patch = {
      loading: false,
      error: '',
      status: data.status,
      questions,
      total: questions.length,
      fullScore: questions.length * 5,
      myAnswers,
      current: pending < 0 ? questions.length : pending,
      peerCount: data.peerCount || 0,
      myName: data.role === 'host' ? (data.hostName || '我') : (data.guestName || '我'),
      peerName: data.role === 'host' ? (data.guestName || '对手') : (data.hostName || '对手')
    }

    if (data.status === 'finished' && Array.isArray(data.peerAnswers)) {
      const myScore = quizService.score(myAnswers, questions)
      const peerScore = quizService.score(data.peerAnswers, questions)
      patch.myScore = myScore
      patch.peerScore = peerScore
      patch.resultText = myScore > peerScore ? '胜 · 技高一筹'
        : myScore < peerScore ? '负 · 略逊一筹' : '平 · 棋逢对手'
    }
    this.setData(patch)
  },

  onSelect(e) {
    if (this.data.status !== 'playing' || this.data.submitting) return
    const answer = Number(e.currentTarget.dataset.idx)
    const current = this.data.current
    if (current >= this.data.total) return

    this.setData({ submitting: true })
    battleService.submitAnswer(this.data.roomId, current, answer)
      .then(() => {
        const answers = this.data.myAnswers.slice()
        while (answers.length < this.data.total) answers.push(null)
        answers[current] = answer
        this.setData({ submitting: false, myAnswers: answers, current: current + 1 })
        this.poll()
      }, err => {
        this.setData({ submitting: false })
        wx.showToast({ title: (err && err.message) || '提交失败', icon: 'none' })
      })
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
