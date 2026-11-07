const config = require('../../config/index.js')
const audioService = require('../../services/audioService.js')
const progressService = require('../../services/progressService.js')
const { flushAchievementTips } = require('../../utils/tip.js')

Page({
  data: {
    bgmPlaying: false,
    showNoticePopup: false,
    isSearchFocus: false
  },

  onLoad() {
    this.setData({ bgmPlaying: audioService.isPlaying() })
    // 首次进入标记「以史为镜」，提示由统一队列补弹
    if (!progressService.getFlag(config.STORAGE_KEYS.firstEnter)) {
      progressService.setFlag(config.STORAGE_KEYS.firstEnter, true)
    }
  },

  toggleBgm() {
    this.setData({ bgmPlaying: audioService.toggleBgm() })
  },

  goSection() { wx.navigateTo({ url: config.ROUTES.section }) },
  goAchievements() { wx.navigateTo({ url: config.ROUTES.achievements }) },
  goCodex() { wx.navigateTo({ url: config.ROUTES.codex }) },
  goMans() { wx.navigateTo({ url: config.ROUTES.mans }) },
  goChart() { wx.navigateTo({ url: config.ROUTES.chart }) },
  goUser() { wx.navigateTo({ url: config.ROUTES.user }) },
  goQuizzes() { wx.navigateTo({ url: config.ROUTES.quizzes }) },

  openNoticePopup() { this.setData({ showNoticePopup: true }) },
  closeNoticePopup() { this.setData({ showNoticePopup: false }) },
  catchTap() {},

  // 搜索相关（预留）
  onInput(e) {},
  onBlur() {},
  onSearchSubmit() {},

  // 从其他页面返回时同步 BGM 状态，并补弹未提示的成就
  onShow() {
    this.setData({ bgmPlaying: audioService.isPlaying() })
    flushAchievementTips(this)
  },

  ClickSound() {
    audioService.play('click')
  }
})
