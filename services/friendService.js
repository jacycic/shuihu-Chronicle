/**
 * 好友数据服务 —— 前端与云函数的唯一边界
 * ------------------------------------------------------------------
 * 页面不直接调用 wx.cloud，也不接触任何 openid。
 * 每次请求都会带上当前登录账号，云端按账号隔离好友与私信；
 * 云开发未启用时统一抛出 FRIEND_CLOUD_DISABLED，由页面显示开通引导。
 */
const config = require('../config/index.js')
const progressService = require('./progressService.js')

function isAvailable() {
  return !!(config.CLOUD.enabled && config.CLOUD.env && wx.cloud)
}

/**
 * 当前登录账号：云端据此隔离数据，未登录时由云函数分配独立游客身份。
 * 账号登录态里 account 意外缺失时，用进度作用域兜底，避免静默降级成游客
 * （同一微信号的游客身份固定，会让不同账号拿到同一个邀请码）。
 */
function currentAccount() {
  const state = progressService.getLoginState()
  if (!state || state.mode === 'guest') return ''
  if (state.account) return state.account
  return progressService.getAccountScope() || ''
}

/** 同步本地资料与收集进度；临时头像路径不能跨设备访问，改用默认头像 */
function localProfile() {
  const saved = progressService.getAvatar()
  return {
    nickName: progressService.getNickname() || '梁山来客',
    avatarUrl: /^https?:\/\//.test(saved) ? saved : config.ASSETS.defaultAvatar,
    unlockCount: progressService.getUnlockedHeroes().length
  }
}

function call(action, payload = {}) {
  if (!isAvailable()) {
    return Promise.reject(new Error('FRIEND_CLOUD_DISABLED'))
  }
  return wx.cloud.callFunction({
    name: config.CLOUD.functionName,
    data: Object.assign({ action, account: currentAccount() }, payload)
  }).then(res => {
    const body = res && res.result
    if (!body) throw new Error('云函数没有返回内容')
    if (!body.ok) throw new Error(body.error || '操作失败')
    return body.data
  })
}

module.exports = {
  isAvailable,
  currentAccount,
  bootstrap: () => call('bootstrap', localProfile()),
  findByCode: code => call('findByCode', { code }),
  sendRequest: code => call('sendRequest', { code }),
  handleRequest: (requestId, accept) => call('handleRequest', { requestId, accept }),
  removeFriend: code => call('removeFriend', { code }),
  getUnread: () => call('getUnread'),
  getMessages: code => call('getMessages', { code }),
  sendMessage: (code, text) => call('sendMessage', { code, text })
}
