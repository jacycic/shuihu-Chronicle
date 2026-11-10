const config = require('../../config/index.js')
const battleService = require('../../services/battleService.js')
const quizService = require('../../services/quizService.js')
const quizFacts = require('../../data/quizFacts.js')

const ROOM_RE = /^[0-9A-F]{6}$/

Page({
  data: {
    available: false,
    checking: true,
    cloudReady: false,
    busy: false,
    error: '',
    showFriend: false,
    roomInput: '',
    bankSize: 0,
    factTotal: 0,
    tagsText: '',
    identityText: ''
  },

  onLoad() {
    this.setData({
      available: battleService.isAvailable(),
      bankSize: quizService.getBankSize(),
      factTotal: quizFacts.length,
      tagsText: quizService.getTags().join(' · ')
    })
  },

  onShow() {
    this.checkCloud()
  },

  /** 检测云开发 + 对战云函数是否已部署，未就绪时给出可操作的引导 */
  checkCloud() {
    if (!this.data.available) {
      this.setData({
        checking: false,
        cloudReady: false,
        error: '云开发未开启：请在 config/index.js 打开 CLOUD.enabled 并填写 env'
      })
      return
    }
    this.setData({ checking: true })
    battleService.hello()
      .then(data => {
        const account = data.identity && data.identity.account
        this.setData({
          checking: false,
          cloudReady: true,
          error: '',
          identityText: account ? '当前身份：账号 ' + account : '当前身份：游客（建议用账号登录）'
        })
      })
      .catch(err => this.handleError(err))
  },

  handleError(err) {
    const code = String((err && err.message) || '')
    let text = code
    if (code === 'BATTLE_CLOUD_DISABLED') {
      text = '云开发未开启：请在 config/index.js 打开 CLOUD.enabled 并填写 env'
    } else if (code === 'BATTLE_CLOUD_OUTDATED') {
      text = '对战云函数未部署或版本过旧：请重新上传部署 cloudfunction/battle（需支持 5 秒限时），并确认 sh_battle_rooms 集合已创建'
    }
    this.setData({ checking: false, cloudReady: false, busy: false, error: text || '连接失败' })
  },

  /** 单人答题不依赖云端，随时可玩 */
  onSolo() {
    wx.navigateTo({ url: config.ROUTES.quizzes })
  },

  goRoom(data) {
    wx.navigateTo({
      url: `${config.ROUTES.battleRoom}?roomId=${encodeURIComponent(data.roomId)}&role=${data.role}`
    })
  },

  onMatch() {
    if (!this.data.cloudReady || this.data.busy) return
    this.setData({ busy: true, error: '' })
    battleService.match()
      .then(data => {
        this.setData({ busy: false })
        this.goRoom(data)
      })
      .catch(err => this.handleError(err))
  },

  toggleFriend() {
    if (!this.data.cloudReady) return
    this.setData({ showFriend: !this.data.showFriend, error: '' })
  },

  onRoomInput(e) {
    this.setData({
      roomInput: String(e.detail.value || '').toUpperCase().replace(/\s/g, '')
    })
  },

  onCreateRoom() {
    if (!this.data.cloudReady || this.data.busy) return
    this.setData({ busy: true, error: '' })
    battleService.createRoom()
      .then(data => {
        this.setData({ busy: false })
        this.goRoom(data)
      })
      .catch(err => this.handleError(err))
  },

  onJoinRoom() {
    if (!this.data.cloudReady || this.data.busy) return
    const roomId = this.data.roomInput
    if (!ROOM_RE.test(roomId)) {
      wx.showToast({ title: '请输入 6 位房间号', icon: 'none' })
      return
    }
    this.setData({ busy: true, error: '' })
    battleService.joinRoom(roomId)
      .then(data => {
        this.setData({ busy: false })
        this.goRoom(data)
      })
      .catch(err => {
        // 房间号填错是普通输入错误，不要退回「云函数未部署」引导
        this.setData({ busy: false, error: (err && err.message) || '加入失败' })
        wx.showToast({ title: (err && err.message) || '加入失败', icon: 'none' })
      })
  }
})
