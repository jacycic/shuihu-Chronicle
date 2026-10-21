Page({
  /**
   * 好汉详情主页（main）页面数据
   * role：当前好汉姓名
   * heroImg：好汉展示图片地址
   * showUnlockTip：好汉解锁弹窗显示标记
   * unlockHeroName：刚解锁的好汉名称
   * showAchievementTip：成就解锁弹窗显示标记（新增）
   * unlockAchievementName：刚解锁的成就名称
   */
  data: {
    role:"",
    heroImg:"",
    // 好汉解锁提示
    showUnlockTip: false,
    unlockHeroName: "",
    // 成就解锁提示【新增】
    showAchievementTip: false,
    unlockAchievementName: ""
  },

  onLoad(options) {
    // 打印路由传参，调试用
    console.log("main页面收到的全部参数:", options)

    // 判断是否传递好汉role参数，有则加载好汉信息（原有好汉逻辑）
    if(options.role){
      const roleName = decodeURIComponent(options.role)
      this.setData({role: roleName})
      // 获取全局app实例
      const app = getApp();
      const heroList = app.globalData.heroList;

      // 根据好汉名字在全局好汉数组中查找对应好汉对象
      const targetHero = heroList.find(item => item.name === roleName);
      
      // 判断好汉是否存在图片列表，取出第一张图
      if(targetHero && targetHero.imglist && targetHero.imglist.length>0){
        this.setData({
          heroImg: targetHero.imglist[0].img
        })
      }else{
        // 无图片时清空图片地址
        this.setData({heroImg:""})
      }

      // ============好汉解锁弹窗逻辑============
      // 路由参数isNewUnlock为字符串"true"代表本次是新解锁好汉
      const isNewUnlock = options.isNewUnlock === "true"
      if(isNewUnlock){
        this.setData({
          showUnlockTip:true,
          unlockHeroName: roleName
        })
        // 3秒后自动关闭好汉解锁提示弹窗
        this.unlockTimer = setTimeout(()=>{
          this.setData({
            showUnlockTip:false
          })
        },3000)
      }
    }

    // ============【新增】成就解锁弹窗逻辑 ============
    // 接收成就页面传过来的成就解锁参数，弹出成就提示
    if(options.isNewAchievement === "true" && options.achName){
      const achName = decodeURIComponent(options.achName)
      this.setData({
        showAchievementTip:true,
        unlockAchievementName: achName
      })
      // 3秒后自动关闭成就提示弹窗
      this.achTimer = setTimeout(()=>{
        this.setData({
          showAchievementTip:false
        })
      },3000)
    }

  },

  onReady() {
  
  },

  onShow() {
    
  },

  onHide() {

  },

  onUnload() {
    // 页面销毁时清除定时器，防止定时器继续执行引发内存泄漏、弹窗异常
    if(this.unlockTimer){
      clearTimeout(this.unlockTimer)
    }
    if(this.achTimer){
      clearTimeout(this.achTimer)
    }
  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  },
  
  // 跳转小游戏对战页，带上当前好汉名字
  goPlaying(){
    // 对好汉名字编码，避免特殊字符路由出错
    wx.navigateTo({
      url:`/pages/playing/playing?role=${encodeURIComponent(this.data.role)}`
    })
  },
  
  // 跳转好汉五维属性详情页
  goMans(){
    wx.navigateTo({
      url:"/pages/mans/mans"
    })
  },

  // 跳转成就页面
  goAchievements(){
    wx.navigateTo({
      url:"/pages/achievements/achievements"
    })
  },

  // 跳转图鉴页面
  goCodex(){
    wx.navigateTo({
      url:"/pages/codex/codex"
    })
  },

  // 点击音效
  ClicknSound(){
    const app = getApp()
    app.playSound("click")
    console.log('播放音效')
  },
  
})