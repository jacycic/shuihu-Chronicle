Page({
  data: {
    renRank: [],   // 仁榜
    yiRank: [],    // 义榜
    liRank: [],    // 礼榜
    zhiRank: [],   // 智榜
    xinRank: [],   // 信榜
    totalRank: [], // 总和榜
    activeTab: 0,  // 0仁，1义，2礼，3智，4信，5总和
    tabList: ["仁","义","礼","智","信","总和"]
  },

  /**
   * 页面加载时，构建所有排行榜数据
   */
  onLoad() {
    this.buildFiveRank()
  },
  /**
   * 页面每次显示时重新生成榜单（解锁新好汉后进入页面自动刷新）
   */
  onShow() {
    this.buildFiveRank()
  },


  /**
   * 核心：生成仁、义、礼、智、信、总分六个排行榜
   * 只统计已经解锁的好汉
   */
  buildFiveRank() {
    // 获取全部好汉原始数据
    const app = getApp()
    // 从缓存读取已解锁好汉名字数组
    const allHero = app.globalData.heroList
    // 过滤，只保留已经解锁的好汉
    const unlockHeroNames = wx.getStorageSync('unlockHero') || []
    let unlockHeroList = allHero.filter(item => {
      return unlockHeroNames.includes(item.name)
    })

    // 给每个解锁好汉新增 totalScore 总分字段
    unlockHeroList = unlockHeroList.map(hero=>{
      return {
        ...hero,
        totalScore: hero.ren + hero.yi + hero.li + hero.zhi + hero.xin
      }
    })

    // 排序工具函数：按字段降序，同分并列
    const sortByField = (field) => {
      const arr = [...unlockHeroList]
      arr.sort((a,b)=>{
        return b[field] - a[field]
      })
      return this.addRankNumber(arr, field)
    }

    // 分别生成六个榜单
    const renRank = sortByField('ren')
    const yiRank = sortByField('yi')
    const liRank = sortByField('li')
    const zhiRank = sortByField('zhi')
    const xinRank = sortByField('xin')
    const totalRank = sortByField('totalScore')

    // 一次性更新页面榜单数据，渲染视图
    this.setData({
      renRank,
      yiRank,
      liRank,
      zhiRank,
      xinRank,
      totalRank
    })
  },

  //  计算排名（同分并列逻辑）
  addRankNumber(list, field) {
    if(list.length ===0) return []
    const res = []
    let currentRank = 1
    res.push({...list[0], rank: currentRank})
    for(let i=1; i<list.length; i++){
      const prevScore = list[i-1][field]
      const currScore = list[i][field]
      if(currScore === prevScore){
        res.push({...list[i], rank: currentRank})
      }else{
        currentRank = i+1
        res.push({...list[i], rank: currentRank})
      }
    }
    return res
  },

  // 切换标签页
  tabChange(e){
    // 取出当前点击标签的下标
    const index = e.currentTarget.dataset.index
    // 更新激活标签下标，视图自动切换到对应榜单
    this.setData({activeTab: index})
  }
})