const dialogData = require("../../data/semeDialog.js")

Page({
  data: {
    role:"",
    heroImg:"",
    showDialog: false,
    currentSceneName: "",
    currentSceneText: "",
    currentSceneIdx: 0, // 当前打开场景索引
    unlockIndex: 0, // 当前好汉的解锁标记
    sceneList:[],
    chatList: [],
    lastChatId: "",
    sceneDialog: [], // 当前场景对话脚本
    dialogStep: 0 // ✅新增：对话步骤指针，记录当前读到第几条对话
  },

  onLoad(options) {
    if (!options.role) {
      console.log("缺少role参数")
      return
    }
    const roleName = decodeURIComponent(options.role).trim()
    const app = getApp()
    // 找到当前好汉完整对象（包含它的sceneList）
    const targetHero = app.globalData.heroList.find(item => item.name === roleName)
    if(!targetHero){
      wx.showToast({title:"好汉不存在",icon:"none"})
      return
    }
    // 兜底：场景列表为空数组
    const heroSceneList = targetHero.sceneList || []
  
    // 读取这个好汉的解锁进度，优先缓存，写入全局
    let unlockObj = wx.getStorageSync('heroSceneUnlock') || {}
    app.globalData.heroSceneUnlock = unlockObj

    let unlockIndex = unlockObj[roleName] ?? 0
    // 边界保护，不能超过最大场景索引
    unlockIndex = Math.min(unlockIndex, heroSceneList.length -1)

    console.log("当前好汉：", roleName, "解锁关卡索引：", unlockIndex)
  
    this.setData({
      role: roleName,
      heroImg: targetHero.imglist?.[0]?.img || "",
      sceneList: heroSceneList,
      unlockIndex: unlockIndex
    })
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
    // 拼接key：好汉名|场景名，匹配someDialog.js中的key
    const dialogKey = `${this.data.role}|${sceneItem.name}`
    const sceneDialog = dialogData[dialogKey] || []
    console.log("dialogKey=", dialogKey)
    console.log("sceneDialog=", sceneDialog)
    console.log("长度：", sceneDialog.length)

    this.setData({
      showDialog:true,
      currentSceneIdx: idx,
      currentSceneName: sceneItem.name,
      currentSceneText: sceneItem.desc,
      chatList: [],
      lastChatId: "",
      sceneDialog: sceneDialog,
      dialogStep: 0 // 打开弹窗重置对话步数
    })
  },

  closeDialog(){
    const idx = this.data.currentSceneIdx
    // 关闭弹窗时：如果当前是已解锁最后一个，解锁下一个
    if(idx === this.data.unlockIndex && idx < this.data.sceneList.length -1){
      const newUnlock = idx + 1
      const roleName = this.data.role
      const app = getApp()
      // 更新全局对象
      app.globalData.heroSceneUnlock[roleName] = newUnlock
      // 持久化存入本地缓存
      wx.setStorageSync('heroSceneUnlock', app.globalData.heroSceneUnlock)
      this.setData({
        unlockIndex: newUnlock,
        showDialog:false
      })
    }else{
      this.setData({
        showDialog:false
      })
    }
  },
  
  stopBubble(){
    //阻止冒泡
  },

  // ✅ 点击聊天区域，推进对话
  tapChatArea() {
    const {sceneDialog, dialogStep, chatList} = this.data
    // 对话全部播放完毕
    if(dialogStep >= sceneDialog.length){
      wx.showToast({title:"对话已结束",icon:"none"})
      return
    }
    const currDialog = sceneDialog[dialogStep]
    const msgId = "msg-" + Date.now()
    const newChatList = [...chatList, {
      id: msgId,
      side: currDialog.type === "npc" ? "bot" : "user",
      text: currDialog.text
    }]

    this.setData({
      chatList: newChatList,
      lastChatId: msgId,
      dialogStep: dialogStep + 1
    })
  }
})