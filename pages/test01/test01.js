const app = getApp()
Page({
  data:{
    bgmPlaying:false,
    showNoticePopup: false,
    isSearchFocus: false
  },
  onLoad(){
    // 页面加载时，同步全局BGM状态到页面data
    this.setData({
      bgmPlaying: app.globalData.bgmPlaying
    })

    const isUnlockYiShi = wx.getStorageSync('ach_yswj') || false
    if (!isUnlockYiShi) {
      wx.setStorageSync('ach_yswj', true)
      setTimeout(() => {
        const tipComp = this.selectComponent("#unlockTipRef")
        if (tipComp) {
          tipComp.showAchUnlock("以史为镜")
        }
      },200)
    }
  },

  //BGM切换按钮事件，调用app全局方法
  toggleBgm(){
    const playing = app.toggleGlobalBgm()
    this.setData({
      bgmPlaying: playing
    })
  },

  // 跳转页面
  goSection(){
    wx.navigateTo({url:"/pages/section/section"})
  },
  goAchievements(){
    wx.navigateTo({url:"/pages/achievements/achievements"})
  },
  goCodex(){
    wx.navigateTo({url:"/pages/codex/codex"})
    
  },
  goMans(){
    wx.navigateTo({url:"/pages/mans/mans"})
  },
  goChart(){
    wx.navigateTo({url:"/pages/chart/chart"})
  },
  goUser(){
    wx.navigateTo({url:"/pages/user/user"})
  },
  goQuizzes(){
    wx.navigateTo({url:"/pages/quizzes/quizzes"})
  },


  //公告弹窗
  openNoticePopup(){
    this.setData({showNoticePopup:true})
  },
  closeNoticePopup(){
    this.setData({showNoticePopup:false})
  },
  catchTap(){},

  //搜索相关
  onInput(e){},
  onBlur(){},
  onSearchSubmit(){},

  //页面显示时同步最新全局状态（从别的页面返回首页，图片状态自动更新）
  onShow(){
    this.setData({
      bgmPlaying: app.globalData.bgmPlaying
    })
  },
  ClickSound(){
    const app = getApp()
    app.playSound("click") // 播放点击音效
    console.log('播放音效')
  },
})