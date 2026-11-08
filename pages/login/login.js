const config = require('../../config/index.js')
const authService = require('../../services/authService.js')
const audioService = require('../../services/audioService.js')

function getStatusBarHeight() {
  try {
    const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    return info.statusBarHeight || 20
  } catch (e) {
    return 20
  }
}

Page({
  data: {
    statusBarHeight: 20,
    skipLogin: false,
    redirecting: false,
    submitting: false,
    isRegister: false,
    showPassword: false,
    account: '',
    password: '',
    confirm: '',
    errorMsg: '',
    syncHint: ''
  },

  onLoad() {
    const skipLogin = authService.isLoggedIn()
    this.setData({
      statusBarHeight: getStatusBarHeight(),
      skipLogin,
      syncHint: authService.isCloudAvailable()
        ? '进度保存在账号云端，换设备登录后自动同步'
        : '进度按账号保存在本机，卸载或清理缓存会丢失'
    })

    // 自定义导航为深色，状态栏文字反白；已登录直接跳首页时不必改色
    if (!skipLogin && wx.setNavigationBarColor) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#211d18',
        fail: () => {}
      })
    }
  },

  /** 已经登录过就直接回首页；放在 onShow 里跳转，避免首屏未就绪时 reLaunch 失败 */
  onShow() {
    if (!this.data.skipLogin || this.data.redirecting) return
    this.setData({ redirecting: true })
    wx.reLaunch({
      url: config.ROUTES.home,
      fail: () => this.setData({ skipLogin: false, redirecting: false })
    })
  },

  onUnload() {
    // 离开登录页时恢复全局导航配色，避免影响后续页面
    if (wx.setNavigationBarColor) {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#E8F4F8',
        fail: () => {}
      })
    }
  },

  clearError() {
    if (this.data.errorMsg) this.setData({ errorMsg: '' })
  },

  onSwitchMode(e) {
    const isRegister = e.currentTarget.dataset.mode === 'register'
    if (isRegister === this.data.isRegister) return
    this.setData({ isRegister, errorMsg: '', password: '', confirm: '' })
  },

  onAccountInput(e) {
    this.setData({ account: e.detail.value })
    this.clearError()
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value })
    this.clearError()
  },

  onConfirmInput(e) {
    this.setData({ confirm: e.detail.value })
    this.clearError()
  },

  togglePassword() {
    this.setData({ showPassword: !this.data.showPassword })
  },

  onSubmit() {
    if (this.data.submitting) return
    const { isRegister, account, password, confirm } = this.data
    this.setData({ submitting: true, errorMsg: '' })
    audioService.play('click')

    const task = isRegister
      ? authService.register({ account, password, confirm })
      : authService.login({ account, password })

    task.then(() => {
      this.enterHome(isRegister ? '注册成功，进度已归档' : '欢迎回来')
    }).catch(err => {
      this.setData({ submitting: false, errorMsg: (err && err.message) || '登录失败，请重试' })
    })
  },

  onGuestLogin() {
    if (this.data.submitting) return
    this.setData({ submitting: true })
    audioService.play('click')
    authService.loginAsGuest()
    this.enterHome('以游客身份进入')
  },

  enterHome(tips) {
    wx.showToast({ title: tips, icon: 'none', duration: 1000 })
    setTimeout(() => {
      wx.reLaunch({
        url: config.ROUTES.home,
        fail: () => this.setData({ submitting: false })
      })
    }, 420)
  }
})
