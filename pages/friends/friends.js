const config = require('../../config/index.js')
const friendService = require('../../services/friendService.js')

const POLL_MS = 8000

function withInitial(item) {
  return { ...item, initial: (item.nickName || '梁').slice(0, 1) }
}

/**
 * 把云端实际使用的身份回显出来：
 * 邀请码相同只有两种原因 —— 云函数还是旧版（按 openid 生成），
 * 或前端没传账号导致落到游客身份（同一微信号游客码固定）。
 */
function identityTip(identity) {
  if (!identity || identity.version !== 2) {
    return {
      level: 'warn',
      text: '云端 friend 云函数仍是旧版：邀请码按微信号生成，所以不同账号会相同。请重新上传部署 cloudfunction/friend，并确认部署环境与 config.CLOUD.env 一致。'
    }
  }
  if (!identity.account) {
    return {
      level: 'warn',
      text: '当前是游客身份，邀请码按微信号生成，多个账号会拿到同一个码。请用账号密码登录后再使用好友功能。'
    }
  }
  const local = friendService.currentAccount()
  if (local && identity.account !== local) {
    return {
      level: 'warn',
      text: '云端账号「' + identity.account + '」与本地登录账号「' + local + '」不一致，请退出后重新登录。'
    }
  }
  return {
    level: 'ok',
    text: '当前身份：账号 ' + identity.account + ' · 邀请码按此账号生成'
  }
}

Page({
  data: {
    available: false,
    loading: false,
    profile: null,
    friends: [],
    requests: [],
    codeInput: '',
    searchResult: null,
    error: '',
    unreadTotal: 0,
    identityTip: '',
    identityLevel: 'ok'
  },

  onLoad() {
    this.setData({ available: friendService.isAvailable() })
  },

  onShow() {
    const available = friendService.isAvailable()
    this.setData({ available })
    if (available) {
      this.refresh()
      this.startPolling()
    }
  },

  onHide() {
    this.stopPolling()
  },

  onUnload() {
    this.stopPolling()
  },

  /** 轮询未读数，让新消息的好友红点自动出现 */
  startPolling() {
    this.stopPolling()
    this._pollTimer = setInterval(() => this.pollUnread(), POLL_MS)
  },

  stopPolling() {
    if (this._pollTimer) {
      clearInterval(this._pollTimer)
      this._pollTimer = null
    }
  },

  pollUnread() {
    if (!this.data.available) return
    friendService.getUnread()
      .then(data => this.applyUnread(data))
      .catch(() => {})
  },

  applyUnread(data) {
    const items = (data && data.items) || []
    const counts = {}
    items.forEach(item => { counts[item.code] = item.count })
    this.setData({
      unreadTotal: (data && data.total) || 0,
      friends: this.data.friends.map(item =>
        Object.assign({}, item, { unread: counts[item.inviteCode] || 0 })
      )
    })
  },

  onPullDownRefresh() {
    if (!this.data.available) {
      wx.stopPullDownRefresh()
      return
    }
    this.refresh().then(() => wx.stopPullDownRefresh())
  },

  refresh() {
    this.setData({ loading: true, error: '' })
    return friendService.bootstrap()
      .then(data => {
        const tip = identityTip(data.identity)
        this.setData({
          loading: false,
          profile: data.profile || null,
          unreadTotal: data.unreadTotal || 0,
          friends: (data.friends || []).map(withInitial),
          requests: (data.requests || []).map(withInitial),
          identityTip: tip.text,
          identityLevel: tip.level
        })
      })
      .catch(err => this.handleError(err))
  },

  handleError(err) {
    const message = err && err.message === 'FRIEND_CLOUD_DISABLED'
      ? '好友功能尚未开通'
      : (err && err.message) || '网络异常，请稍后重试'
    this.setData({ loading: false, error: message })
  },

  onRefresh() {
    if (this.data.available) this.refresh()
  },

  onCodeInput(e) {
    this.setData({
      codeInput: String(e.detail.value || '').toUpperCase().replace(/\s/g, ''),
      searchResult: null
    })
  },

  onSearch() {
    const code = this.data.codeInput
    if (!/^[0-9A-F]{6}$/.test(code)) {
      wx.showToast({ title: '请输入 6 位邀请码', icon: 'none' })
      return
    }
    this.setData({ error: '', searchResult: null, loading: true })
    friendService.findByCode(code)
      .then(result => {
        this.setData({
          loading: false,
          searchResult: {
            ...withInitial(result),
            canAdd: !result.alreadyFriend && !result.pending
          }
        })
      })
      .catch(err => this.handleError(err))
  },

  onAddFriend() {
    const result = this.data.searchResult
    if (!result || !result.canAdd) return
    this.setData({ loading: true })
    friendService.sendRequest(result.code)
      .then(data => {
        wx.showToast({
          title: data.matched ? '已互加好友' : '申请已发送',
          icon: 'none'
        })
        this.setData({ searchResult: null, codeInput: '' })
        return this.refresh()
      })
      .catch(err => this.handleError(err))
  },

  onCopyCode() {
    const code = this.data.profile && this.data.profile.inviteCode
    if (!code) return
    wx.setClipboardData({ data: code })
  },

  onHandleRequest(e) {
    const requestId = e.currentTarget.dataset.id
    const accept = String(e.currentTarget.dataset.accept) === 'true'
    if (!requestId) return
    this.setData({ loading: true })
    friendService.handleRequest(requestId, accept)
      .then(() => {
        wx.showToast({ title: accept ? '已添加好友' : '已忽略', icon: 'none' })
        return this.refresh()
      })
      .catch(err => this.handleError(err))
  },

  onRemoveFriend(e) {
    const code = e.currentTarget.dataset.code
    if (!code) return
    wx.showModal({
      title: '删除好友',
      content: '确定要删除这位好友吗？聊天记录也会一并清除。',
      success: (res) => {
        if (!res.confirm) return
        this.setData({ loading: true })
        friendService.removeFriend(code)
          .then(() => this.refresh())
          .catch(err => this.handleError(err))
      }
    })
  },

  goChat(e) {
    const code = e.currentTarget.dataset.code
    if (!code) return
    wx.navigateTo({
      url: `${config.ROUTES.chat}?code=${encodeURIComponent(code)}`
    })
  }
})
