// pages/main/main.js
Page({
  
  
  data: {
    role:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({role:options.role})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // wx.navigateTo({
    //   url: '/pages/playing/playing',
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  /**
   *跳转函数
   */
  goPlaying(){
   wx.navigateTo({
    url:"/pages/playing/playing"
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