Page({
  data:{
    allNameList:[],
    heroList:[],
    unlockHero: [],
    collectCount:0, // 已解锁数量（和user.js变量名保持一致）
    total:108       // 总数固定108
  },
  onLoad(){
    const app = getApp()
    const allHero = app.globalData.heroList
    const nameArr = allHero.map(item=>{
      return item.name
    })
    // 获取本地已解锁好汉数组
    const unlockHero = wx.getStorageSync('unlockHero') || []
    
    // 遍历给每一条hero数据增加 unlock 属性
    const newHeroList = allHero.map(hero => {
      return {
        ...hero,
        unlock: unlockHero.includes(hero.name)
      }
    })

    // 统计已解锁数量
    const collectCount = unlockHero.length
    // 未解锁 = total - collectCount，wxml直接计算 108 - collectCount

    this.setData({
      allNameList: nameArr,
      heroList: newHeroList,
      unlockHero,
      collectCount
    })
  },
  // 新增 onShow，切回图鉴页面自动刷新解锁数量
  onShow(){
    this.refreshCodexData()
  },
  refreshCodexData(){
    const app = getApp()
    const allHero = app.globalData.heroList
    const unlockHero = wx.getStorageSync('unlockHero') || []
    const newHeroList = allHero.map(hero => {
      return {
        ...hero,
        unlock: unlockHero.includes(hero.name)
      }
    })
    const collectCount = unlockHero.length
    this.setData({
      heroList: newHeroList,
      unlockHero,
      collectCount
    })
  }
})