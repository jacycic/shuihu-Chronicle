/**
 * 联机对战服务 —— 前端与 cloudfunction/battle 的唯一边界
 * ------------------------------------------------------------------
 * 每次请求自动带当前登录账号、昵称与题库容量；云端只回传题目下标，
 * 页面再用 services/quizService.js 还原题目与计分。
 */
const config = require('../config/index.js')
const progressService = require('./progressService.js')
const quizService = require('./quizService.js')

function isAvailable() {
  return !!(config.CLOUD.enabled && config.CLOUD.env && wx.cloud)
}

/** 与好友功能一致：账号身份由云端用 sh_accounts.openid 校验 */
function currentAccount() {
  const state = progressService.getLoginState()
  if (!state || state.mode === 'guest') return ''
  if (state.account) return state.account
  return progressService.getAccountScope() || ''
}

function localName() {
  return progressService.getNickname() || '梁山来客'
}

function call(action, payload = {}) {
  if (!isAvailable()) {
    return Promise.reject(new Error('BATTLE_CLOUD_DISABLED'))
  }
  return wx.cloud.callFunction({
    name: config.CLOUD.battleFunction,
    data: Object.assign({
      action,
      account: currentAccount(),
      nickName: localName(),
      bankSize: quizService.getBankSize()
    }, payload)
  }).then(res => {
    const body = res && res.result
    if (!body) throw new Error('云函数没有返回内容')
    if (!body.ok) throw new Error(body.error || '操作失败')
    if (body.version !== 2) throw new Error('BATTLE_CLOUD_OUTDATED')
    return body.data
  }).catch(err => {
    const raw = String((err && (err.errMsg || err.message)) || '')
    if (/FunctionName|function.*not.*found|云函数.*不存在|-501000|cloud function/i.test(raw)) {
      throw new Error('BATTLE_CLOUD_OUTDATED')
    }
    throw err
  })
}

module.exports = {
  isAvailable,
  hello: () => call('hello'),
  match: () => call('match'),
  createRoom: () => call('createRoom'),
  joinRoom: roomId => call('joinRoom', { roomId }),
  getState: roomId => call('getState', { roomId }),
  submitAnswer: (roomId, index, answer) => call('submitAnswer', { roomId, index, answer }),
  leave: roomId => call('leave', { roomId })
}
