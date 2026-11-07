const config = require('../../config/index.js')
const dialogService = require('../../services/dialogService.js')
const heroService = require('../../services/heroService.js')
const progressService = require('../../services/progressService.js')
const audioService = require('../../services/audioService.js')

Page({
  /**
   * playing 对话场景页面数据
   * role：当前好汉名字
   * heroImg：好汉主图
   * heroAvatar：好汉头像（新增）
   * showDialog：场景对话弹窗显示标记
   * currentSceneName：当前场景名称
   * currentSceneText：当前场景简介描述
   * currentSceneIdx：当前打开的场景下标
   * unlockIndex：该好汉已解锁到的场景索引
   * sceneList：好汉所有场景列表
   * chatList：对话消息列表，渲染聊天框
   * lastChatId：最新一条消息id
   * sceneDialog：当前场景对应的完整对话脚本数组
   * dialogStep：当前对话走到第几步
   * scrollTopVal：聊天区域滚动值，用于自动滚动到底部（新增）
   */
  data: {
    role:"",
    heroImg:"",
    heroAvatar:"",
    showDialog: false,
    currentSceneName: "",
    currentSceneText: "",
    currentSceneIdx: 0,
    unlockIndex: 0,
    sceneList:[],
    chatList: [],
    lastChatId: "",
    sceneDialog: [],
    dialogStep: 0,
    scrollTopVal:0
  },

  onLoad(options) {
    // 缺少好汉名字参数，直接退出
    if (!options.role) {
      console.log("缺少role参数")
      return
    }
    // 解码并去除首尾空格，拿到好汉名称
    const roleName = decodeURIComponent(options.role).trim()
    const targetHero = heroService.findByName(roleName)
    if(!targetHero){
      wx.showToast({title:"好汉不存在",icon:"none"})
      return
    }
    // 兜底，场景列表不存在则赋值空数组
    const heroSceneList = targetHero.sceneList || []

    // 场景解锁进度统一由进度服务读取（含历史缓存键迁移）
    const unlockObj = progressService.getSceneUnlock()

    // 获取当前好汉已解锁场景下标，默认0
    let unlockIndex = unlockObj[roleName] ?? 0
    // 边界保护：解锁索引不能超过场景总数上限，防止越界
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

  /**
   * 打开场景对话弹窗
   *  点击事件，携带场景index下标
   */
  openSceneDialog(e){
    const idx = e.currentTarget.dataset.index
    // 校验：不能打开还未解锁的场景
    if(idx > this.data.unlockIndex){
      wx.showToast({title:"需要先完成上一场景",icon:"none"})
      return
    }
    const sceneItem = this.data.sceneList[idx]
    const dialogKey = dialogService.buildKey(this.data.role, sceneItem.name)
    const sceneDialog = dialogService.getDialog(this.data.role, sceneItem.name)
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
      heroAvatar: this.data.heroImg,
      scrollTopVal:0
    })
  },

  /**
   * 关闭场景弹窗
   * 逻辑：如果当前是最后一个已解锁场景，并且后面还有场景，自动解锁下一关并保存
   */
  closeDialog(){
    const idx = this.data.currentSceneIdx
    if(idx === this.data.unlockIndex && idx < this.data.sceneList.length -1){
      const newUnlock = idx + 1
      // 场景进度统一写入进度服务
      progressService.setSceneUnlock(this.data.role, newUnlock)
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

  // 阻止事件冒泡
  stopBubble(){
  },

  /**
   * 点击聊天区域，推进一句对话
   */
  tapChatArea() {
      const {sceneDialog, dialogStep, chatList,heroAvatar} = this.data
      // 全部对话播放完毕，提示
      if(dialogStep >= sceneDialog.length){
        wx.showToast({title:"对话已结束",icon:"none"})
        return
      }
      // 获取当前这一条对话配置
      const currDialog = sceneDialog[dialogStep]
      // 用时间戳生成唯一消息id
      const msgId = "msg-" + Date.now()

      let newMsg = {
        id: msgId,
        type: currDialog.type,
        text: currDialog.text
      }
      if(currDialog.type === "narration"){
        // 旁白，没有头像、名字
        newMsg.side = "narration"
      }else if(currDialog.type === "npc"){
        // NPC对话，bot侧气泡
        newMsg.side = "bot"
        newMsg.name = currDialog.name || this.data.role
        // 从好汉服务取 NPC 头像，普通 NPC 回退到配置中的占位图
        const npcAvatar = heroService.getAvatar(newMsg.name)
        newMsg.avatar = currDialog.avatar || npcAvatar || config.asset(config.ASSETS.npcAvatar)
      }else{
        // user玩家侧对话，使用当前好汉头像
        newMsg.side = "user"
        newMsg.name = currDialog.name || "我"
        newMsg.avatar = currDialog.avatar || heroAvatar
      }

      // 追加新消息到聊天列表
      const newChatList = [...chatList, newMsg]

      this.setData({
        chatList: newChatList,
        lastChatId: msgId,
        dialogStep: dialogStep + 1
      })
      // 延时滚动到底部，等待dom渲染完成，修复真机滚动不生效问题
      setTimeout(()=>{
        this.setData({
          scrollTopVal:99999
        })
      },60)
  },

  // 播放点击音效
  ClicknSound(){
    audioService.play('click')
  },

  // 跳转到五维属性页
  goMans(){
    wx.navigateTo({ url: config.ROUTES.mans })
  },
  // 跳转成就页
  goAchievements(){
    wx.navigateTo({ url: config.ROUTES.achievements })
  },
  // 跳转图鉴页
  goCodex(){
    wx.navigateTo({ url: config.ROUTES.codex })
  }
})