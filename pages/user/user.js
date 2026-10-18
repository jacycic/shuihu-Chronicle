const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: "梁山来客",
    collectCount: 0,
    achievementCount: 0,
    total: 108,
    isSelectingAvatar: false
  },

  onLoad() {
    const savedAvatar = wx.getStorageSync('userAvatar')
    const savedName = wx.getStorageSync('userNickname')

    if (savedAvatar) {
      this.setData({ avatarUrl: savedAvatar })
    }

    if (savedName) {
      this.setData({ nickname: savedName })
    }

    this.refreshCollectCount()
    this.refreshAchievementCount()
  },

  onShow() {
    this.refreshCollectCount()
    this.refreshAchievementCount()
  },

  refreshCollectCount() {
    const unlockHero = wx.getStorageSync('unlockHero') || []
    this.setData({
      collectCount: unlockHero.length
    })
  },

  refreshAchievementCount() {
    const achievementList = wx.getStorageSync('achievementList') || []
    const unlockedCount = achievementList.filter(item => item.unlocked).length

    this.setData({
      achievementCount: unlockedCount
    })
  },

  onChooseAvatar(e) {
    if (this.data.isSelectingAvatar) return

    this.setData({ isSelectingAvatar: true })

    const { avatarUrl } = e.detail
    this.setData({ avatarUrl })
    wx.setStorageSync('userAvatar', avatarUrl)
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
          wx.removeStorageSync('userAvatar')
        }
      }
    })
  },

  editNickname() {
    wx.showModal({
      title: "修改昵称",
      editable: true,
      placeholderText: "输入你的梁山名号",
      success: (res) => {
        if (res.confirm && res.content.trim()) {
          this.setData({ nickname: res.content })
          wx.setStorageSync('userNickname', res.content)
          wx.setStorageSync('ach_privateCustom', true)

          wx.nextTick(() => {
            const tipComp = this.selectComponent("#unlockTipRef")
            if (tipComp) {
              tipComp.showAchUnlock("私人定制")
            }
          })
        }
      }
    })
  },

  goAchievements() {
    wx.navigateTo({ url: "/pages/achievements/achievements" })
  },

  goCodex() {
    wx.navigateTo({ url: "/pages/codex/codex" })
  },
  goBackTest01() {
    wx.navigateTo({ url: "/pages/test01/test01" })
  }
})