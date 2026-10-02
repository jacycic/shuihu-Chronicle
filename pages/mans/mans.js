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
  },

  onLoad(options) {
    const app = getApp()
    const hero = app.globalData.heroResult
    console.log("拿到好汉数据", hero)
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
    }
  }
})