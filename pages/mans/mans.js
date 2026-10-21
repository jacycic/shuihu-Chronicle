// pages/mans/mans.js
// 好汉结果展示页：接收测试匹配出来的好汉数据，渲染好汉信息、五维属性、头像图片
Page({
  data: {
    name:"",        // 好汉本名
    nick:"",        // 好汉绰号
    star:"",        // 好汉星级
    ren:0,          // 仁 分值
    yi:0,           // 义 分值
    li:0,           // 礼 分值
    zhi:0,          // 智 分值
    xin:0,          // 信 分值
    heroImg:""      // 好汉展示图片地址
  },

  onLoad(options) {
    // 获取全局app实例
    const app = getApp()
    // 取出上一页（人格测试页）存入全局的匹配好汉结果
    const hero = app.globalData.heroResult
    if(hero){
      // 将好汉基础信息赋值到页面data，供wxml页面渲染
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
      // 判断好汉是否存在图片数组，且数组不为空
      if(hero && hero.imglist && hero.imglist.length>0){
        console.log('图片地址：', hero.imglist[0].img)
        // 取第一张图片地址赋值给heroImg用于展示
        this.setData({
          heroImg: hero.imglist[0].img
        })
      }else{
        // 没有图片时清空图片地址
        this.setData({heroImg:""})
        console.log("没有找到或者无图片")
      }
    }
  
  }
})