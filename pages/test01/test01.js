// 获取小程序全局实例
const app = getApp()
Page({
  data:{
    /**
   * 页面数据
   * bgmPlaying: 背景音乐是否正在播放
   * showNoticePopup: 公告弹窗显示控制
   * isSearchFocus: 搜索框是否获得焦点
   */
    bgmPlaying:false,
    showNoticePopup: false,
    isSearchFocus: false
  },
  onLoad(){
    // 同步全局背景音乐播放状态到当前页面
    this.setData({
      bgmPlaying: app.globalData.bgmPlaying
    })
    // 读取本地缓存，判断【以史为镜】成就是否解锁
    const isUnlockYiShi = wx.getStorageSync('ach_yswj') || false
    // 如果未解锁
    if (!isUnlockYiShi) {
      // 标记成就为已解锁存入缓存，避免重复触发
      wx.setStorageSync('ach_yswj', true)
      // 延迟一点时间再弹出成就提示，防止页面渲染未完成找不到组件
      setTimeout(() => {
        // 获取成就提示自定义组件实例
        const tipComp = this.selectComponent("#unlockTipRef")
        if (tipComp) {
          // 调用组件方法，弹出成就解锁提示，成就名称：以史为镜
          tipComp.showAchUnlock("以史为镜")
        }
      },200)
    }
  },

 /**
   * 切换背景音乐播放/暂停
   * 调用app全局音频方法，统一管理BGM，多页面状态同步
   */
  toggleBgm(){
    // 调用全局BGM切换函数，返回最新播放状态
    const playing = app.toggleGlobalBgm()
    this.setData({
      // 更新页面状态，刷新按钮UI
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
  goAi(){
    wx.navigateTo({url:"/pages/ai/ai"})
  },


  //公告弹窗
  openNoticePopup(){
    this.setData({showNoticePopup:true})
  },
  closeNoticePopup(){
    this.setData({showNoticePopup:false})
  },
  catchTap(){},

  //搜索相关(预留,有待后期开发)
  onInput(e){},
  onBlur(){},
  onSearchSubmit(){},

  /**
   * 页面每次显示时触发（从其他页面返回首页也会执行）
   * 同步全局BGM状态，保证页面UI和全局音频状态一致
   */
  onShow(){
    this.setData({
      bgmPlaying: app.globalData.bgmPlaying
    })
  },
  /**
   * 点击音效触发函数
   * 调用全局音频接口播放click点击音效
   */
  ClickSound(){
    const app = getApp()
    app.playSound("click") // 播放点击音效
    console.log('播放音效')
  },
})