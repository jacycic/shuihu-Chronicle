const config = require('../../config/index.js')
const progressService = require('../../services/progressService.js')
const achievementService = require('../../services/achievementService.js')
const { flushAchievementTips } = require('../../utils/tip.js')

const defaultAvatarUrl = config.ASSETS.defaultAvatar

Page({
  /**
   * avatarUrl / nickname：用户资料
   * collectCount / achievementCount：收集与成就统计
   * isSelectingAvatar：头像选择锁，防止重复触发
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: "梁山来客",
    collectCount: 0,
    achievementCount: 0,
    total: config.HERO_TOTAL,
    isSelectingAvatar: false
  },

  onLoad() {
    const savedAvatar = progressService.getAvatar()
    const savedName = progressService.getNickname()
    if (savedAvatar) this.setData({ avatarUrl: savedAvatar })
    if (savedName) this.setData({ nickname: savedName })
    this.refreshCollectCount()
    this.refreshAchievementCount()
  },

  onShow() {
    this.refreshCollectCount()
    this.refreshAchievementCount()
    flushAchievementTips(this)
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
  }
})
