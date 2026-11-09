const achievementService = require('../../services/achievementService.js')
const { flushAchievementTips } = require('../../utils/tip.js')

Page({
  /**
   * achievementList：带 unlocked 状态与科普资料 lore 的成就列表
   * progress：解锁百分比（0~100），进度条宽度用 {{progress}}%
   * detail / detailVisible：成就详情面板
   */
  data: {
    achievementList: [],
    unlockedCount: 0,
    lockedCount: 0,
    total: 0,
    progress: 0,
    detailVisible: false,
    detail: null
  },

  onLoad() {
    this.refreshAchievement()
  },

  onShow() {
    this.refreshAchievement()
    // 补弹在其它页面解锁、但尚未提示过的成就
    flushAchievementTips(this)
  },

  /** 从服务层取最新状态并刷新统计 */
  refreshAchievement() {
    const list = achievementService.getList()
    const unlockedCount = list.filter(item => item.unlocked).length
    this.setData({
      achievementList: list,
      unlockedCount,
      lockedCount: list.length - unlockedCount,
      total: list.length,
      progress: list.length ? Math.round(unlockedCount / list.length * 100) : 0
    })
  },

  /** 仅已解锁的成就可以点开科普介绍，未解锁项保持禁用 */
  clickItem(e) {
    const index = e.currentTarget.dataset.index
    const item = this.data.achievementList[index]
    if (!item || !item.unlocked) return
    this.setData({
      detailVisible: true,
      detail: {
        name: item.name,
        desc: item.desc,
        unlocked: item.unlocked,
        lore: item.lore || { intro: '', fact: '', source: '' }
      }
    })
  },

  closeDetail() {
    this.setData({ detailVisible: false })
  },

  noop() {}
})
