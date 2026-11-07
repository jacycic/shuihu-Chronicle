/**
 * 统一网络层 —— 前端与后端的唯一边界
 * ------------------------------------------------------------------
 * 业务 service 不直接调用 wx.request，统一经由本模块，
 * 便于集中处理 baseURL、超时、登录态、错误与响应解包。
 */
const config = require('../config/index.js')

function isEnabled() {
  return !!(config.API.enabled && config.API.baseURL)
}

function request(path, { method = 'GET', data = {} } = {}) {
  return new Promise((resolve, reject) => {
    if (!isEnabled()) {
      reject(new Error('远程数据源未启用'))
      return
    }
    wx.request({
      url: /^https?:\/\//.test(path) ? path : config.API.baseURL + path,
      method,
      data,
      timeout: config.API.timeout,
      header: { 'content-type': 'application/json' },
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const body = res.data
          // 兼容 { code, data } 与裸数据两种响应体
          resolve(body && body.data !== undefined ? body.data : body)
        } else {
          reject(new Error(`请求失败：HTTP ${res.statusCode}`))
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

function get(path, params) {
  return request(path, { method: 'GET', data: params })
}

function post(path, data) {
  return request(path, { method: 'POST', data })
}

module.exports = { isEnabled, get, post }
