const friendService = require('../../services/friendService.js')

function withInitial(item) {
  return { ...item, initial: (item.nickName || '梁').slice(0, 1) }
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
    error: ''
  },

  onLoad() {
    this.setData({ available: friendService.isAvailable() })
  },

  onShow() {
    this.setData({ available: friendService.isAvailable() })
    if (this.data.available) this.refresh()
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
        this.setData({
          loading: false,
          profile: data.profile || null,
          friends: (data.friends || []).map(withInitial),
          requests: (data.requests || []).map(withInitial)
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
      content: '确定要删除这位好友吗？',
      success: (res) => {
        if (!res.confirm) return
        this.setData({ loading: true })
        friendService.removeFriend(code)
          .then(() => this.refresh())
          .catch(err => this.handleError(err))
      }
    })
  }
})
