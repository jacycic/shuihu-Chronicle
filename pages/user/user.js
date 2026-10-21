// 微信默认头像兜底地址
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  /**
   * 页面数据
   * avatarUrl: 用户头像链接
   * nickname: 用户昵称，默认梁山来客
   * collectCount: 已解锁好汉数量
   * achievementCount: 已解锁成就数量
   * total: 好汉总数108
   * isSelectingAvatar: 头像选择锁，防止重复多次触发头像选择
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: "梁山来客",
    collectCount: 0,
    achievementCount: 0,
    total: 108,
    isSelectingAvatar: false
  },

  /**
   * 页面加载
   * 读取缓存里保存的头像、昵称，同时刷新收集、成就数量
   */
  onLoad() {
    // 读取缓存头像
    const savedAvatar = wx.getStorageSync('userAvatar')
    // 读取缓存昵称
    const savedName = wx.getStorageSync('userNickname')

    // 如果缓存存在头像，覆盖默认头像
    if (savedAvatar) {
      this.setData({ avatarUrl: savedAvatar })
    }

    // 如果缓存存在昵称，覆盖默认昵称
    if (savedName) {
      this.setData({ nickname: savedName })
    }

    // 刷新收集数量
    this.refreshCollectCount()
    // 刷新成就解锁数量
    this.refreshAchievementCount()
  },

  /**
   * 页面每次显示时触发
   * 从其他页面回来，自动刷新收集数、成就数
   */
  onShow() {
    this.refreshCollectCount()
    this.refreshAchievementCount()
  },

  /**
   * 刷新好汉收集数量
   * 从本地缓存读取已解锁好汉数组，数组长度就是收集个数
   */
  refreshCollectCount() {
    const unlockHero = wx.getStorageSync('unlockHero') || []
    this.setData({
      collectCount: unlockHero.length
    })
  },

  /**
   * 刷新已解锁成就数量
   * 遍历成就列表，筛选 unlocked = true 的成就统计数量
   */
  refreshAchievementCount() {
    const achievementList = wx.getStorageSync('achievementList') || []
    const unlockedCount = achievementList.filter(item => item.unlocked).length

    this.setData({
      achievementCount: unlockedCount
    })
  },

  
  onChooseAvatar(e) {
    // 正在选头像时，拦截重复点击，防止多次执行
    if (this.data.isSelectingAvatar) return

    this.setData({ isSelectingAvatar: true })

    const { avatarUrl } = e.detail
    // 更新页面头像
    this.setData({ avatarUrl })
    // 存入本地缓存持久保存
    wx.setStorageSync('userAvatar', avatarUrl)
    wx.showToast({ title: "头像已更新" })

    // 解除选择锁
    this.setData({ isSelectingAvatar: false })
  },

  /**
   * 头像选择失败/取消回调
   * 比如用户点取消、授权失败，重置锁状态
   */
  onAvatarError(e) {
    console.log("头像操作取消", e.detail.errMsg)
    this.setData({ isSelectingAvatar: false })
  },

  // 重置头像，恢复为默认头像
  clearAvatar() {
    wx.showModal({
      title: "提示",
      content: "确定重置头像为默认头像？",
      success: (res) => {
        if (res.confirm) {
          // 切回默认头像地址
          this.setData({ avatarUrl: defaultAvatarUrl })
          // 删除缓存里保存的自定义头像
          wx.removeStorageSync('userAvatar')
        }
      }
    })
  },

  /**
   * 修改昵称弹窗
   * 支持输入自定义梁山名号，修改后解锁【私人定制】成就
   */
  editNickname() {
    wx.showModal({
      title: "修改昵称",
      editable: true, // 开启弹窗输入框
      placeholderText: "输入你的梁山名号",
      success: (res) => {
        // 确认提交，并且输入内容不为空
        if (res.confirm && res.content.trim()) {
          // 更新页面昵称
          this.setData({ nickname: res.content })
          // 保存昵称到缓存
          wx.setStorageSync('userNickname', res.content)
          // 标记私人定制成就
          wx.setStorageSync('ach_privateCustom', true)

          // 等视图更新完成后，调用成就提示组件
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

  /**
   * 跳转到成就页面
   */
  goAchievements() {
    wx.navigateTo({ url: "/pages/achievements/achievements" })
  },

  /**
   * 跳转到图鉴页面
   */
  goCodex() {
    wx.navigateTo({ url: "/pages/codex/codex" })
  },

  /**
   * 跳转测试页面 test01
   */
  goBackTest01() {
    wx.navigateTo({ url: "/pages/test01/test01" })
  }
})