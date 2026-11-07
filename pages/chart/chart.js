const heroService = require('../../services/heroService.js')
const progressService = require('../../services/progressService.js')

Page({
  data: {
    renRank: [],   // 仁榜
    yiRank: [],    // 义榜
    liRank: [],    // 礼榜
    zhiRank: [],   // 智榜
    xinRank: [],   // 信榜
    totalRank: [], // 总和榜
    activeTab: 0,
    tabList: ["仁", "义", "礼", "智", "信", "总和"]
  },

  onLoad() {
    this.buildFiveRank()
  },

  onShow() {
    this.buildFiveRank()
  },

  /** 生成六个榜单，只统计已解锁好汉 */
  buildFiveRank() {
    const unlockHeroList = heroService.getRankSource(progressService.getUnlockedHeroes())

    const sortByField = (field) => {
      const arr = [...unlockHeroList]
      arr.sort((a, b) => b[field] - a[field])
      return this.addRankNumber(arr, field)
    }

    this.setData({
      renRank: sortByField('ren'),
      yiRank: sortByField('yi'),
      liRank: sortByField('li'),
      zhiRank: sortByField('zhi'),
      xinRank: sortByField('xin'),
      totalRank: sortByField('totalScore')
    })
  },

  /** 计算排名，同分并列 */
  addRankNumber(list, field) {
    if (list.length === 0) return []
    const res = []
    let currentRank = 1
    res.push({ ...list[0], rank: currentRank })
    for (let i = 1; i < list.length; i++) {
      if (list[i][field] === list[i - 1][field]) {
        res.push({ ...list[i], rank: currentRank })
      } else {
        currentRank = i + 1
        res.push({ ...list[i], rank: currentRank })
      }
    }
    return res
  },

  tabChange(e) {
    this.setData({ activeTab: e.currentTarget.dataset.index })
  }
})
