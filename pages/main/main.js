const config = require('../../config/index.js')
const heroService = require('../../services/heroService.js')
const audioService = require('../../services/audioService.js')
const { flushAchievementTips } = require('../../utils/tip.js')

Page({
  data: {
    role: "",
    heroImg: "",
    showUnlockTip: false,
    unlockHeroName: ""
  },

  onLoad(options) {
    console.log("main页面收到的全部参数:", options)

    if (options.role) {
      const roleName = decodeURIComponent(options.role)
      this.setData({
        role: roleName,
        heroImg: heroService.getAvatar(roleName)
      })

      const isNewUnlock = options.isNewUnlock === "true"
      if (isNewUnlock) {
        this.setData({
          showUnlockTip: true,
          unlockHeroName: roleName
        })
        this.unlockTimer = setTimeout(() => {
          this.setData({ showUnlockTip: false })
        }, 3000)
      }
    }
  },

  onShow() {
    // 解锁好汉常会连带达成成就，在这里统一补弹成就提示
    flushAchievementTips(this)
  },

  onUnload() {
    if (this.unlockTimer) clearTimeout(this.unlockTimer)
  },

  goPlaying() {
    wx.navigateTo({
      url: `${config.ROUTES.playing}?role=${encodeURIComponent(this.data.role)}`
    })
  },

  goMans() {
    wx.navigateTo({ url: config.ROUTES.mans })
  },

  goAchievements() {
    wx.navigateTo({ url: config.ROUTES.achievements })
  },

  goCodex() {
    wx.navigateTo({ url: config.ROUTES.codex })
  },

  ClicknSound() {
    audioService.play('click')
  }
})
