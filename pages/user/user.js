const config = require('../../config/index.js')
const progressService = require('../../services/progressService.js')
const achievementService = require('../../services/achievementService.js')
const authService = require('../../services/authService.js')
const friendService = require('../../services/friendService.js')
const { flushAchievementTips } = require('../../utils/tip.js')

const defaultAvatarUrl = config.ASSETS.defaultAvatar

Page({
  /**
   * avatarUrl / nickname：用户资料
   * collectCount / achievementCount：收集与成就统计
   * isSelectingAvatar：头像选择锁，防止重复触发
   * unreadTotal：未读私信总数，用于「我的好友」入口红点
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: "梁山来客",
    loginDesc: "梁山好汉收集者",
    syncEnabled: false,
    collectCount: 0,
    achievementCount: 0,
    total: config.HERO_TOTAL,
    isSelectingAvatar: false,
    unreadTotal: 0
  },

  onLoad() {
    const savedAvatar = progressService.getAvatar()
    const savedName = progressService.getNickname()
    if (savedAvatar) this.setData({ avatarUrl: savedAvatar })
    if (savedName) this.setData({ nickname: savedName })
    this.refreshLoginState()
    this.refreshCollectCount()
    this.refreshAchievementCount()
  },

  onShow() {
    this.refreshLoginState()
    this.refreshCollectCount()
    this.refreshAchievementCount()
    this.refreshUnread()
    flushAchievementTips(this)
  },

  /** 未读私信总数：让「我的好友」入口在新消息到达时显示红点 */
  refreshUnread() {
    if (!friendService.isAvailable()) {
      this.setData({ unreadTotal: 0 })
      return
    }
    friendService.getUnread()
      .then(data => this.setData({ unreadTotal: (data && data.total) || 0 }))
      .catch(() => {})
  },

  refreshLoginState() {
    const state = authService.getLoginState()
    const isGuest = state && state.mode === authService.MODE.guest
    this.setData({
      loginDesc: isGuest
        ? "游客身份 · 进度仅存本机"
        : (state && state.account ? "账号 " + state.account + " · 进度已归档" : "梁山好汉收集者"),
      syncEnabled: authService.isCloudAvailable() && !!(state && state.account)
    })
  },

  onSyncProgress() {
    wx.showLoading({ title: "同步中", mask: true })
    authService.pushProgress().then(() => {
      wx.hideLoading()
      wx.showToast({ title: "进度已同步", icon: "success" })
    }).catch((err) => {
      wx.hideLoading()
      // 部署类错误文案较长，toast 会被截断，改用弹窗完整展示
      wx.showModal({
        title: "同步失败",
        content: (err && err.message) || "未知错误，请查看云函数日志",
        showCancel: false,
        confirmText: "知道了"
      })
    })
  },

  refreshCollectCount() {
    this.setData({ collectCount: progressService.getUnlockedHeroes().length })
  },

  /** 直接按规则计算，避免依赖缓存写入时机 */
  refreshAchievementCount() {
    const unlockedCount = achievementService.getList()
      .filter(item => item.unlocked).length
    this.setData({ achievementCount: unlockedCount })
  },

  onChooseAvatar(e) {
    if (this.data.isSelectingAvatar) return
    this.setData({ isSelectingAvatar: true })

    const { avatarUrl } = e.detail
    this.setData({ avatarUrl })
    progressService.setAvatar(avatarUrl)
    wx.showToast({ title: "头像已更新" })

    this.setData({ isSelectingAvatar: false })
  },

  onAvatarError(e) {
    console.log("头像操作取消", e.detail.errMsg)
    this.setData({ isSelectingAvatar: false })
  },

  clearAvatar() {
    wx.showModal({
      title: "提示",
      content: "确定重置头像为默认头像？",
      success: (res) => {
        if (res.confirm) {
          this.setData({ avatarUrl: defaultAvatarUrl })
          progressService.clearAvatar()
        }
      }
    })
  },

  /** 修改昵称后解锁「私人定制」成就 */
  editNickname() {
    wx.showModal({
      title: "修改昵称",
      editable: true,
      placeholderText: "输入你的梁山名号",
      success: (res) => {
        if (res.confirm && res.content.trim()) {
          this.setData({ nickname: res.content })
          progressService.setNickname(res.content)
          progressService.setFlag(config.STORAGE_KEYS.customProfile, true)
          // 刷新统计并弹出本次新解锁的成就
          this.refreshAchievementCount()
          flushAchievementTips(this)
        }
      }
    })
  },

  goAchievements() {
    wx.navigateTo({ url: config.ROUTES.achievements })
  },

  goCodex() {
    wx.navigateTo({ url: config.ROUTES.codex })
  },

  goFriends() {
    wx.navigateTo({ url: config.ROUTES.friends })
  },

  goBackTest01() {
    wx.navigateTo({ url: config.ROUTES.home })
  },

  /** 退出前把进度写入账号档（云同步开启时上传），再回到登录页 */
  onLogout() {
    wx.showModal({
      title: "退出登录",
      content: "退出后需重新登录，账号下的收集进度与成就不会丢失。",
      confirmText: "退出",
      confirmColor: "#b85c3e",
      success: (res) => {
        if (!res.confirm) return
        wx.showLoading({ title: "保存进度中", mask: true })
        const goLogin = () => {
          wx.hideLoading()
          wx.reLaunch({ url: config.ROUTES.login })
        }
        authService.logout().then(goLogin, goLogin)
      }
    })
  }
})
