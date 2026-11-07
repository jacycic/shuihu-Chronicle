const config = require('../../config/index.js')
const heroService = require('../../services/heroService.js')
const progressService = require('../../services/progressService.js')

const FILTERS = [
  { mode: 'all', label: '全部' },
  { mode: 'unlocked', label: '已解锁优先' },
  { mode: 'locked', label: '未解锁优先' }
]

/** 把指定解锁状态排到前面，组内保持图鉴原顺序 */
function sortByUnlock(list, mode) {
  if (mode === 'all') return list
  const unlocked = list.filter(hero => hero.unlock)
  const locked = list.filter(hero => !hero.unlock)
  return mode === 'unlocked' ? [...unlocked, ...locked] : [...locked, ...unlocked]
}

Page({
  data: {
    filters: FILTERS,
    filterMode: 'all',
    heroList: [],
    collectCount: 0,
    total: config.HERO_TOTAL,
    progress: 0
  },

  onLoad() {
    this.refreshCodexData()
  },

  onShow() {
    this.refreshCodexData()
  },

  /** 重新读取解锁进度并按当前筛选排序 */
  refreshCodexData() {
    const unlockHero = progressService.getUnlockedHeroes()
    const count = unlockHero.length
    const sorted = sortByUnlock(heroService.getCodexList(unlockHero), this.data.filterMode)
    this.setData({
      heroList: sorted.map(hero => ({
        ...hero,
        avatar: hero.imglist && hero.imglist.length ? hero.imglist[0].img : ''
      })),
      collectCount: count,
      progress: Math.min(100, Math.round(count / config.HERO_TOTAL * 100))
    })
  },

  /** 切换排序：全部 / 已解锁在前 / 未解锁在前 */
  onFilterChange(e) {
    const mode = e.currentTarget.dataset.mode
    if (!mode || mode === this.data.filterMode) return
    this.setData({ filterMode: mode })
    this.refreshCodexData()
  },

  /** 点击卡片进入好汉介绍页，仅已解锁可进入 */
  goHeroDetail(e) {
    const index = Number(e.currentTarget.dataset.index)
    const hero = this.data.heroList[index]
    if (!hero || !hero.unlock) {
      wx.showToast({ title: "尚未解锁该好汉", icon: "none" })
      return
    }
    wx.navigateTo({
      url: `${config.ROUTES.heroDetail}?role=${encodeURIComponent(hero.name)}`
    })
  }
})
