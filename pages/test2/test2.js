// 引入外部对话脚本
const sceneDialog = require('../../data/sceneDialog.js')

Page({
  data: {
    // 模拟好汉数据，替代app.globalData，测试专用
    heroListTest: [
      {
        name:"邹润",
        imglist:[{img:""}],
        sceneList:[
          {
            name:"登云州登云山",
            desc:"出林龙，邹润叔父，登云山好汉。"
          }
        ]
      }
    ],
    role:"",
    heroImg:"",
    showDialog: false,
    currentSceneName: "",
    currentSceneText: "",
    currentSceneIdx: 0,
    unlockIndex: 0,
    sceneList:[],
    chatList: [],
    dialogScript: [],
    dialogIndex:0,
    isSceneStoryFinish: false,
  },

  onLoad() {
    // 测试页面直接固定加载【邹润】，不用页面传参
    const roleName = "邹润"
    const targetHero = this.data.heroListTest.find(item => item.name === roleName)
    const heroSceneList = targetHero.sceneList || []

    this.setData({
      role: roleName,
      sceneList: heroSceneList,
      unlockIndex:0
    })
  },

  // 打开场景弹窗
  openSceneDialog(e){
    const idx = e.currentTarget.dataset.index
    if(idx > this.data.unlockIndex){
      wx.showToast({title:"需要先完成上一场景",icon:"none"})
      return
    }
    const sceneItem = this.data.sceneList[idx]
    const key = `${this.data.role}|${sceneItem.name}`
    const script = sceneDialog[key] || []

    this.setData({
      showDialog:true,
      currentSceneIdx: idx,
      currentSceneName: sceneItem.name,
      currentSceneText: sceneItem.desc,
      dialogScript: script,
      dialogIndex:0,
      chatList: [],
      isSceneStoryFinish: false
    })
    if(script.length > 0){
      this.loadNextDialog()
    }else{
      this.setData({
        isSceneStoryFinish:true
      })
    }
  },

  // 加载下一句对话
  loadNextDialog(){
    const {dialogScript, dialogIndex, chatList} = this.data
    if(dialogIndex >= dialogScript.length){
      this.setData({
        isSceneStoryFinish:true
      })
      wx.showToast({title:"本场剧情已结束，可以关闭弹窗",icon:"none"})
      return
    }
    const currentTalk = dialogScript[dialogIndex]
    const newChatList = [...chatList, currentTalk]
    this.setData({
      chatList: newChatList,
      dialogIndex: dialogIndex + 1
    })
  },

  // 点击聊天区域推进剧情
  clickChatArea(){
    this.loadNextDialog()
  },

  closeDialog(){
    const idx = this.data.currentSceneIdx
    if(idx === this.data.unlockIndex && idx < this.data.sceneList.length -1){
      if(!this.data.isSceneStoryFinish){
        wx.showToast({title:"请看完本场对话剧情",icon:"none"})
        return
      }
      const newUnlock = idx + 1
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
  
  stopBubble(){}
})