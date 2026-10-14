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

  onLoad() {
    this.buildFiveRank()
  },
  onShow() {
    this.buildFiveRank()
  },

  buildFiveRank() {
    const app = getApp()
    const allHero = app.globalData.heroList
    const unlockHeroNames = wx.getStorageSync('unlockHero') || []
    let unlockHeroList = allHero.filter(item => {
      return unlockHeroNames.includes(item.name)
    })

    // 给每条好汉预先计算总分
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

    const renRank = sortByField('ren')
    const yiRank = sortByField('yi')
    const liRank = sortByField('li')
    const zhiRank = sortByField('zhi')
    const xinRank = sortByField('xin')
    const totalRank = sortByField('totalScore')

    this.setData({
      renRank,
      yiRank,
      liRank,
      zhiRank,
      xinRank,
      totalRank
    })
  },

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

  tabChange(e){
    const index = e.currentTarget.dataset.index
    this.setData({activeTab: index})
  }
})