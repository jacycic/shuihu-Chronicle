const dialogData = require("../../data/semeDialog.js")

Page({
  data: {
    role:"",
    heroImg:"",
    heroAvatar:"", // ✅新增
    showDialog: false,
    currentSceneName: "",
    currentSceneText: "",
    currentSceneIdx: 0, // 当前打开场景索引
    unlockIndex: 0, // 当前好汉的解锁标记
    sceneList:[],
    chatList: [],
    lastChatId: "",
    sceneDialog: [], // 当前场景对话脚本
    dialogStep: 0,
    scrollTopVal:0 // 新增滚动变量
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
    // 拼接key：好汉名|场景名，匹配semeDialog.js中的key
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
      dialogStep: 0,
      heroAvatar: this.data.heroImg, // ✅新增：把当前好汉图片存入data
      scrollTopVal:0 // 打开弹窗时，滚动条重置到顶部
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

  // 点击聊天区域，推进对话
  tapChatArea() {
      const {sceneDialog, dialogStep, chatList,heroAvatar} = this.data
      const app = getApp()
      // 对话全部播放完毕
      if(dialogStep >= sceneDialog.length){
        wx.showToast({title:"对话已结束",icon:"none"})
        return
      }
      const currDialog = sceneDialog[dialogStep]
      const msgId = "msg-" + Date.now()

      let newMsg = {
        id: msgId,
        type: currDialog.type,
        text: currDialog.text
      }
      if(currDialog.type === "narration"){
        // 旁白，无头像无名字
        newMsg.side = "narration"
      }else if(currDialog.type === "npc"){
        // NPC对话：bot侧，带上名字
        newMsg.side = "bot"
        newMsg.name = currDialog.name || this.data.role
        // 根据NPC名字查找对应好汉
        const npcHero = app.globalData.heroList.find(h => h.name === newMsg.name)
        if(npcHero){
          // 属于好汉，读取好汉头像
          newMsg.avatar = currDialog.avatar || npcHero.imglist?.[0]?.img
        }else{
          // 不是好汉NPC，没有匹配到heroList
          newMsg.avatar = currDialog.avatar || "https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/npc/npc.png"
        }
      }else{
        // user玩家对话，固定当前好汉头像
        newMsg.side = "user"
        newMsg.name = currDialog.name || "我"
        newMsg.avatar = currDialog.avatar || heroAvatar
      }

      const newChatList = [...chatList, newMsg]

      this.setData({
        chatList: newChatList,
        lastChatId: msgId,
        dialogStep: dialogStep + 1
      })
      // 延时执行滚动，等待dom渲染完成，真机关键修复
      setTimeout(()=>{
        this.setData({
          scrollTopVal:99999
        })
      },60)
  },
  ClicknSound(){
    const app = getApp()
    app.playSound("click") // 播放点击音效
    console.log('播放音效')
  },
  goMans(){
    wx.navigateTo({
      url:`/pages/mans/mans`
    })
  },
  goAchievements(){
    wx.navigateTo({
      url:`/pages/achievements/achievements`
    })
  },
  goCodex(){
    wx.navigateTo({
      url:`/pages/codex/codex`
    })
  }
})