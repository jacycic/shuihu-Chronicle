Page({
  /**
   * 图鉴页面数据
   * allNameList：全部好汉名字数组
   * heroList：好汉完整列表，额外附带 unlock 解锁标记，供wxml渲染图鉴卡片
   * unlockHero：本地缓存读取到的已解锁好汉名字数组
   * collectCount：已解锁好汉数量，和user页变量名统一
   * total：好汉总数固定108
   */
  data:{
    allNameList:[],
    heroList:[],
    unlockHero: [],
    collectCount:0,
    total:108
  },

  onLoad(){
    // 获取app全局实例，读取全局好汉原始数据
    const app = getApp()
    const allHero = app.globalData.heroList
    // 提取所有好汉的名字，生成名字数组
    const nameArr = allHero.map(item=>{
      return item.name
    })
    // 从本地缓存读取已经解锁的好汉名单，无数据则为空数组
    const unlockHero = wx.getStorageSync('unlockHero') || []
    
    // 遍历好汉列表，给每个好汉对象加上 unlock 布尔标记，标记是否解锁
    const newHeroList = allHero.map(hero => {
      return {
        ...hero,
        unlock: unlockHero.includes(hero.name)
      }
    })

    // 已解锁好汉数量 = 解锁数组长度
    const collectCount = unlockHero.length

    // 把处理后的数据更新到页面data
    this.setData({
      allNameList: nameArr,
      heroList: newHeroList,
      unlockHero,
      collectCount
    })
  },

  // onShow：每次切回图鉴页面自动刷新解锁状态
  onShow(){
    this.refreshCodexData()
  },

  /**
   * 图鉴刷新核心方法：重新读取缓存，更新每个好汉的解锁标记和统计数量
   * 答题、测试解锁好汉之后回到图鉴，会自动同步最新状态
   */
  refreshCodexData(){
    const app = getApp()
    const allHero = app.globalData.heroList
    const unlockHero = wx.getStorageSync('unlockHero') || []
    // 重新生成带解锁标记的好汉列表
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