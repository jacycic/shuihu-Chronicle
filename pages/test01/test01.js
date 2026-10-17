Page({
  data:{
    showNoticePopup: false,
    isSearchFocus: false
  },
  onLoad(){
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
  onSearchSubmit(){}
})