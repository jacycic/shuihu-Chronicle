Page({
  data: {
    role:"",
    heroImg:"",
    showDialog: false,
    currentSceneName: "",
    currentSceneText: "",
    // 解锁标记：0=赌场，1=柴府，2=客店，3=梁山
    unlockIndex: 0, // 默认解锁第0个【赌场】
    sceneList:[
      {name:"赌场",desc:"此处鱼龙混杂，三教九流汇聚，小心别卷入赌局。"},
      {name:"柴府",desc:"柴大官人府邸，后周皇室后裔，广纳天下好汉。柴进仗义疏财，庇护各路获罪的江湖豪杰，庄内食客无数。"},
      {name:"客店",desc:"路边荒村客店，往来行人歇脚之处，常有江湖人在此落脚。店家多是江湖老手，往来过客藏着无数秘闻，酒肆之间暗藏风波。"},
      {name:"梁山",desc:"水泊梁山，聚义厅在此，一百单八好汉栖身之地。八百里水泊易守难攻，众好汉替天行道，聚义于此，啸聚山林，劫富济贫。"}
    ],
    chatList: [],
    
    lastChatId: ""
  },

  onLoad(options) {
    
    if(!options.role) return;
    const roleName = decodeURIComponent(options.role)
    this.setData({role: roleName});
    const app = getApp();
    const heroList = app.globalData.heroList; 
    const targetHero = heroList.find(item => item.name === roleName); 
  
    if(targetHero && targetHero.imglist && targetHero.imglist.length>0){
      console.log('图片地址：', targetHero.imglist[0].img)
      this.setData({
        heroImg: targetHero.imglist[0].img
      })
    }else{
      this.setData({heroImg:""})
      console.log("没有找到或者无图片")
    }
  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  },

  // 打开场景弹窗
  openSceneDialog(e){
    const idx = e.currentTarget.dataset.index
    // 判断：不能打开未解锁场景
    if(idx > this.data.unlockIndex){
      wx.showToast({title:"需要先完成上一场景",icon:"none"})
      return
    }
    const sceneItem = this.data.sceneList[idx]
    this.setData({
      showDialog:true,
      currentSceneName: sceneItem.name,
      currentSceneText: sceneItem.desc
    })
  },
  closeDialog(){
    const idx = this.data.sceneList.findIndex(item=>item.name === this.data.currentSceneName)
    // 关闭弹窗时：如果当前是已解锁最后一个，解锁下一个
    if(idx === this.data.unlockIndex && idx < this.data.sceneList.length -1){
      this.setData({
        unlockIndex: idx + 1
      })
    }
    this.setData({
      showDialog:false
    })
  },
  stopBubble(){
    //阻止冒泡
  },
  // 输入框输入
  

  
  

  // 打开弹窗时清空聊天
  openSceneDialog(e){
    const idx = e.currentTarget.dataset.index
    if(idx > this.data.unlockIndex){
      wx.showToast({title:"需要先完成上一场景",icon:"none"})
      return
    }
    const sceneItem = this.data.sceneList[idx]
    this.setData({
      showDialog:true,
      currentSceneName: sceneItem.name,
      currentSceneText: sceneItem.desc,
      chatList: [],
      chatInput: "",
      lastChatId: ""
    })
  },
})