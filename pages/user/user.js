const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  data:{
    avatarUrl: defaultAvatarUrl,
    nickname:"梁山来客",
    collectCount:0,
    achievementCount:0,
    total:108
  },
  onLoad(){
    //读取本地缓存头像昵称
    const savedAvatar = wx.getStorageSync('userAvatar')
    const savedName = wx.getStorageSync('userNickname')
    if(savedAvatar){
      this.setData({avatarUrl:savedAvatar})
    }
    if(savedName){
      this.setData({nickname:savedName})
    }
    // 页面初次加载读取解锁数量
    this.refreshCollectCount()
  },
  // 每次进入页面都会执行，用来同步已解锁好汉数量（核心）
  onShow(){
    const achievementList = wx.getStorageSync('achievementList') || []
    const unlockedCount = achievementList.filter(item => item.unlocked).length

    this.setData({
      achievementCount: unlockedCount
    })
    this.refreshCollectCount()
  },
  // 封装刷新已解锁数量函数
  refreshCollectCount(){
    const unlockHero = wx.getStorageSync('unlockHero') || []
    this.setData({
      collectCount: unlockHero.length
    })
  },
  //更换头像
  onChooseAvatar(e){
    const {avatarUrl}=e.detail
    this.setData({avatarUrl})
    wx.setStorageSync('userAvatar',avatarUrl)
    wx.showToast({title:"头像已更新"})
  },
  //重置头像
  clearAvatar(){
    wx.showModal({
      title:"提示",
      content:"确定重置头像为默认头像？",
      success:(res)=>{
        if(res.confirm){
          this.setData({avatarUrl:defaultAvatarUrl})
          wx.removeStorageSync('userAvatar')
        }
      }
    })
  },
  //修改昵称
  //修改昵称
  editNickname(){
    wx.showModal({
      title:"修改昵称",
      editable:true,
      placeholderText:"输入你的梁山名号",
      success:(res)=>{
        if(res.confirm && res.content.trim()){
          this.setData({nickname:res.content})
          wx.setStorageSync('userNickname',res.content)
          wx.setStorageSync('ach_privateCustom', true)
          
          // nextTick 确保视图就绪再调用弹窗，替换setTimeout
          wx.nextTick(() => {
            const tipComp = this.selectComponent("#unlockTipRef")
            if(tipComp){
              tipComp.showAchUnlock("私人定制")
            }else{
              console.log("找不到globaltips组件！检查wxml的id")
            }
          })
        }
      }
    })
  },
  
  goAchievements(){
    wx.navigateTo({url:"/pages/achievements/achievements"})
  },
  goCodex(){
    wx.navigateTo({url:"/pages/codex/codex"})
  }
})