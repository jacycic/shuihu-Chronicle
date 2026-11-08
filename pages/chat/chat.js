/**
 * 好友私信页
 * ------------------------------------------------------------------
 * 只通过 services/friendService.js 收发消息，不接触 openid 与数据库。
 * 云端的 getMessages 会把对方发来的消息标记为已读，好友页红点随之清零。
 */
const friendService = require('../../services/friendService.js')

const POLL_MS = 6000
const CODE_RE = /^[0-9A-F]{6}$/

function pad(n) {
  return n < 10 ? '0' + n : String(n)
}

function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  const today = new Date()
  const sameDay = d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() && d.getDate() === today.getDate()
  const clock = pad(d.getHours()) + ':' + pad(d.getMinutes())
  return sameDay ? clock : pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + clock
}

/** 时间只在首条或与上一条相隔 5 分钟以上时显示，避免每条气泡都带时间 */
function decorate(list) {
  let last = -1
  return list.map(item => {
    const ts = Number(item.createdAt) || 0
    const showTime = last < 0 || ts - last > 5 * 60 * 1000
    last = ts
    return {
      id: item.id,
      text: item.text,
      mine: !!item.mine,
      timeText: formatTime(ts),
      showTime
    }
  })
}

Page({
  data: {
    code: '',
    peer: { code: '', nickName: '好友', avatarUrl: '' },
    messages: [],
    inputText: '',
    canSend: false,
    sending: false,
    loading: false,
    available: false,
    error: '',
    scrollIntoView: ''
  },

  onLoad(options) {
    const code = String((options && options.code) || '').trim().toUpperCase()
    const available = friendService.isAvailable()
    this.setData({ code, available })
    if (!CODE_RE.test(code)) {
      this.setData({ error: '缺少好友邀请码，请从好友列表进入聊天' })
    } else if (!available) {
      this.setData({ error: '好友功能尚未开通，请先按 README 部署云开发' })
    }
  },

  onShow() {
    if (this.isReady()) {
      this.loadMessages(false)
      this.startPolling()
    }
  },

  onHide() {
    this.stopPolling()
  },

  onUnload() {
    this.stopPolling()
  },

  isReady() {
    return !!(this.data.available && CODE_RE.test(this.data.code))
  },

  startPolling() {
    this.stopPolling()
    this._pollTimer = setInterval(() => this.loadMessages(true), POLL_MS)
  },

  stopPolling() {
    if (this._pollTimer) {
      clearInterval(this._pollTimer)
      this._pollTimer = null
    }
  },

  /**
   * silent=true 用于轮询：失败时保持已有消息与错误条不抖动。
   * 并发时用 _pending 补一次拉取，避免发送后的刷新被轮询吞掉。
   */
  loadMessages(silent) {
    if (!this.isReady()) return
    if (this._loading) {
      this._pending = true
      return
    }
    this._loading = true
    if (!this.data.messages.length) this.setData({ loading: true })

    friendService.getMessages(this.data.code)
      .then(data => {
        this.applyMessages(data)
      }, err => {
        this.setData({ loading: false })
        if (!silent) {
          this.setData({ error: (err && err.message) || '读取消息失败' })
        }
      })
      .then(() => {
        this._loading = false
        if (this._pending) {
          this._pending = false
          this.loadMessages(silent)
        }
      })
  },

  applyMessages(data) {
    const list = decorate((data && data.messages) || [])
    const peer = Object.assign(
      { code: this.data.code, nickName: '好友', avatarUrl: '' },
      (data && data.peer) || {}
    )
    peer.initial = String(peer.nickName || '友').slice(0, 1)
    const lastId = list.length ? list[list.length - 1].id : ''
    const changed = list.length !== this._lastCount || lastId !== this._lastId
    this._lastCount = list.length
    this._lastId = lastId

    this.setData({ loading: false, error: '', peer, messages: list }, () => {
      if (changed) this.scrollToBottom()
    })
    if (peer.nickName) wx.setNavigationBarTitle({ title: peer.nickName })
  },

  scrollToBottom() {
    // 先清空再赋值，保证同一锚点每次都能重新触发滚动
    this.setData({ scrollIntoView: '' }, () => {
      this.setData({ scrollIntoView: 'chat-bottom' })
    })
  },

  onRefresh() {
    if (this.isReady()) this.loadMessages(false)
  },

  onInput(e) {
    const value = String(e.detail.value || '')
    this.setData({ inputText: value, canSend: !!value.trim() })
  },

  onSend() {
    const text = String(this.data.inputText || '').trim()
    if (!this.isReady()) {
      wx.showToast({ title: '好友功能尚未开通', icon: 'none' })
      return
    }
    if (!text) {
      wx.showToast({ title: '说点什么吧', icon: 'none' })
      return
    }
    if (this.data.sending) return

    this.setData({ sending: true })
    friendService.sendMessage(this.data.code, text)
      .then(() => {
        this.setData({ sending: false, inputText: '', canSend: false })
        this.loadMessages(false)
      }, err => {
        this.setData({ sending: false })
        wx.showToast({ title: (err && err.message) || '发送失败', icon: 'none' })
      })
  }
})
