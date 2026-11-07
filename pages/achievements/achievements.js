const achievementService = require('../../services/achievementService.js')
const { flushAchievementTips } = require('../../utils/tip.js')

Page({
  /**
   * achievementList：带 unlocked 状态的成就列表（规则与计算在服务层）
   * unlockedCount / lockedCount：统计
   * progress：解锁百分比
   */
  data: {
    achievementList: [],
    unlockedCount: 0,
    lockedCount: 0,
    total: 0,
    progress: 0
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

  /** 已解锁的成就点击展示说明 */
  clickItem(e) {
    const index = e.currentTarget.dataset.index
    const item = this.data.achievementList[index]
    if (item && item.unlocked) {
      wx.showModal({
        title: item.name,
        content: item.desc,
        showCancel: false
      })
    }
  }
})
