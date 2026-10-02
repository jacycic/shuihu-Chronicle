Page({
  data:{
    allNameList:[] // 用来存放所有好汉name
  },
  onLoad(){
    const app = getApp()
    // 获取全部好汉数组
    const allHero = app.globalData.heroList
    // 提取所有name，map遍历
    const nameArr = allHero.map(item=>{
      return item.name
    })
    // 存入data，wxml就能渲染
    this.setData({
      allNameList: nameArr,
      heroList:allHero
    })
    
  }
})