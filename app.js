/**
 * 应用入口：只负责生命周期编排，不再存放业务数据。
 * 静态数据 → data/，配置 → config/，数据与领域逻辑 → services/。
 */
const config = require('./config/index.js')
const audioService = require('./services/audioService.js')
const heroService = require('./services/heroService.js')
const progressService = require('./services/progressService.js')

App({
  // 保留空容器兼容历史写法；运行时状态统一由各 service 维护
  globalData: {},

  onLaunch() {
    // 云开发按需启用：好友功能或账号云同步打开时才初始化，否则零网络请求
    if ((config.CLOUD.enabled || config.AUTH.cloudEnabled) && config.CLOUD.env && wx.cloud) {
      try {
        wx.cloud.init({ env: config.CLOUD.env, traceUser: true })
      } catch (e) {
        console.error('云开发初始化失败', e)
      }
    }
    // 初始化全局 BGM 单例
    audioService.init()
    // 迁移历史缓存键（旧版本场景进度写在另一个 key 上）
    progressService.init()
    // 恢复上次登录账号的进度作用域，必须在任何进度读写之前
    progressService.restoreAccountScope()
    // 默认使用本地数据、不发请求；config.API.enabled 打开后自动从后端预热
    heroService.refreshFromRemote()
  },

  // 兼容旧调用（页面已改为直接使用 services）
  playSound(key) {
    audioService.play(key)
  },

  toggleGlobalBgm() {
    return audioService.toggleBgm()
  }
})
