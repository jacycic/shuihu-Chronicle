// pages/mans/mans.js
Page({
  data: {
    name:"",
    nick:"",
    star:"",
    ren:0,
    yi:0,
    li:0,
    zhi:0,
    xin:0,
    heroImg:""
  },

  onLoad(options) {
    const app = getApp()
    const hero = app.globalData.heroResult
    if(hero){
      // 把好汉信息存入data，wxml才能渲染
      this.setData({
        name: hero.name,
        nick: hero.nick,
        star: hero.star,
        ren: hero.ren,
        yi: hero.yi,
        li: hero.li,
        zhi: hero.zhi,
        xin: hero.xin,
      })
      if(hero && hero.imglist && hero.imglist.length>0){
        console.log('图片地址：', hero.imglist[0].img)
        this.setData({
          heroImg: hero.imglist[0].img
        })
      }else{
        this.setData({heroImg:""})
        console.log("没有找到或者无图片")
      }
    }
  
  }
})