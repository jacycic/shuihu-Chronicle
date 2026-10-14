Page({
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
    // 判断是否收到role参数，存在则解码（好汉逻辑不变）
    console.log("main页面收到的全部参数:", options)
    if(options.role){
      const roleName = decodeURIComponent(options.role)
      this.setData({role: roleName})
      // 拿到app全局
      const app = getApp();
      const heroList = app.globalData.heroList;

      // 根据role名字，在heroList里查找好汉
      const targetHero = heroList.find(item => item.name === roleName);
      
      if(targetHero && targetHero.imglist && targetHero.imglist.length>0){
        this.setData({
          heroImg: targetHero.imglist[0].img
        })
      }else{
        // 找不到或者没有图片，置空
        this.setData({heroImg:""})
      }

      // ============好汉解锁弹窗逻辑============
      const isNewUnlock = options.isNewUnlock === "true"
      if(isNewUnlock){
        this.setData({
          showUnlockTip:true,
          unlockHeroName: roleName
        })
        // 3秒后自动关闭提示
        this.unlockTimer = setTimeout(()=>{
          this.setData({
            showUnlockTip:false
          })
        },3000)
      }
    }

    // ============【新增】成就解锁弹窗逻辑 ============
    if(options.isNewAchievement === "true" && options.achName){
      const achName = decodeURIComponent(options.achName)
      this.setData({
        showAchievementTip:true,
        unlockAchievementName: achName
      })
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
    // 页面销毁清除两个定时器，防止内存泄漏
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
  
  goPlaying(){
    // 把当前页面的role编码传给playing页面
    wx.navigateTo({
      url:`/pages/playing/playing?role=${encodeURIComponent(this.data.role)}`
    })
  },
  
  goMans(){
    wx.navigateTo({
      url:"/pages/mans/mans"
    })
  },

  goAchievements(){
    wx.navigateTo({
      url:"/pages/achievements/achievements"
    })
  },

  goCodex(){
    wx.navigateTo({
      url:"/pages/codex/codex"
    })
  },
})