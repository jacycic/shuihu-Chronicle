const aiService = require('../../services/aiService.js')
const audioService = require('../../services/audioService.js')

const QUICK_QUESTIONS = [
  '宋江是个什么样的人？',
  '武松有哪些故事？',
  '梁山座次怎么排？',
  '水浒是谁写的？',
  '瓦舍勾栏是什么？',
  '交子是什么？'
]

const WELCOME = [
  '在下「智多星」，水浒百问，有问必答。',
  '可问我某位好汉的形貌与行迹、梁山座次、成书背景，或宋代瓦舍、交子这类小知识。',
  '点下方快捷问题即可开问；若在线 AI 连不上，点右上「自检」查看原因。'
].join('\n')

function nowId(prefix) {
  return prefix + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
}

Page({
  data: {
    messages: [],
    inputText: '',
    canSend: false,
    sending: false,
    checking: false,
    modeText: '',
    lastError: '',
    scrollIntoView: '',
    quickList: QUICK_QUESTIONS
  },

  onLoad() {
    this.resetMessages()
  },

  resetMessages() {
    this.setData({
      messages: [{ id: 'welcome', role: 'assistant', text: WELCOME, source: 'system' }],
      inputText: '',
      canSend: false,
      sending: false,
      modeText: aiService.isCloudReady() ? '在线 AI · 已接入大模型' : '本地资料 · 未开通在线 AI',
      lastError: '',
      scrollIntoView: ''
    })
  },

  clearChat() {
    audioService.play('click')
    if (aiService.retryCloud) aiService.retryCloud()
    this.resetMessages()
  },

  /** 连接自检：显示云函数实际读到的地址、模型与失败原因 */
  checkConnection() {
    if (this.data.checking) return
    audioService.play('click')
    this.setData({ checking: true })
    wx.showLoading({ title: '正在检测…', mask: true })

    aiService.diagnose().then(info => {
      wx.hideLoading()
      const lines = [
        '配置读取：' + (info.configured ? '正常' : '未读取 / 不完整'),
        '服务地址：' + (info.baseURL || '—'),
        '接口路径：' + (info.endpoint || '—'),
        '模型名称：' + (info.model || '—'),
        '鉴权方式：' + (info.authMode || '—'),
        '连通测试：' + (info.reachable ? '正常' : '失败'),
        info.message || ''
      ]
      const patch = {
        checking: false,
        lastError: info.reachable ? '' : (info.message || '连接检测未通过')
      }
      if (info.reachable) {
        patch.modeText = '在线 AI · 已接入大模型'
        if (aiService.retryCloud) aiService.retryCloud()
      }
      this.setData(patch)
      wx.showModal({ title: 'AI 连接自检', content: lines.join('\n'), showCancel: false, confirmText: '知道了' })
    }).catch(() => {
      wx.hideLoading()
      this.setData({ checking: false, lastError: '连接检测失败，请确认 ai 云函数已部署' })
      wx.showToast({ title: '检测失败', icon: 'none' })
    })
  },

  onInput(e) {
    const text = String((e.detail && e.detail.value) || '')
    this.setData({ inputText: text, canSend: !!text.trim() })
  },

  onQuickTap(e) {
    const q = e.currentTarget.dataset.q
    if (!q || this.data.sending) return
    this.setData({ inputText: q, canSend: true }, () => this.send())
  },

  send() {
    const text = String(this.data.inputText || '').trim().slice(0, aiService.MAX_INPUT)
    if (!text || this.data.sending) return
    audioService.play('click')

    const history = this.data.messages
      .filter(m => m.source !== 'system' && m.source !== 'pending')
      .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
    history.push({ role: 'user', content: text })

    const userMsg = { id: nowId('u'), role: 'user', text, source: '' }
    const pending = { id: nowId('p'), role: 'assistant', text: '军师正在翻书……', source: 'pending' }
    this.setData({
      messages: this.data.messages.concat([userMsg, pending]),
      inputText: '',
      canSend: false,
      sending: true
    }, () => this.scrollToBottom())

    aiService.ask(history).then(reply => {
      const answer = { id: nowId('a'), role: 'assistant', text: reply.text, source: reply.source }
      const list = this.data.messages.slice()
      const idx = list.findIndex(m => m.source === 'pending')
      if (idx >= 0) list.splice(idx, 1, answer)
      else list.push(answer)
      const patch = { messages: list, sending: false }
      if (reply.degraded) {
        patch.modeText = '在线 AI 暂不可用 · 已用本地资料作答'
        patch.lastError = reply.reason || '在线 AI 暂不可用'
      } else if (reply.source === 'ai') {
        patch.modeText = '在线 AI · 已接入大模型'
        patch.lastError = ''
      }
      this.setData(patch, () => {
        this.scrollToBottom()
        if (reply.degraded) wx.showToast({ title: 'AI 调用失败，已用本地资料作答', icon: 'none' })
      })
    }).catch(() => {
      const list = this.data.messages.filter(m => m.source !== 'pending')
      list.push({ id: nowId('a'), role: 'assistant', text: '暂时没能作答，请稍后再试。', source: 'local' })
      this.setData({ messages: list, sending: false }, () => this.scrollToBottom())
    })
  },

  scrollToBottom() {
    const list = this.data.messages
    if (!list.length) return
    this.setData({ scrollIntoView: 'msg-' + list[list.length - 1].id })
  }
})
