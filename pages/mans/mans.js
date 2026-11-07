const config = require('../../config/index.js')
const heroService = require('../../services/heroService.js')

const SCORE_LABELS = { ren: '仁', yi: '义', li: '礼', zhi: '智', xin: '信' }
const SCORE_MAX = 100

Page({
  data: {
    notFound: true,
    name: '',
    nick: '',
    star: '',
    heroImg: '',
    totalScore: 0,
    scores: []
  },

  onLoad() {
    const hero = heroService.getResult()
    if (!hero) {
      this.setData({ notFound: true })
      return
    }

    const scores = config.SCORE_FIELDS.map(key => {
      const value = Number(hero[key]) || 0
      return {
        key,
        label: SCORE_LABELS[key],
        value,
        percent: Math.min(100, Math.round(value / SCORE_MAX * 100))
      }
    })

    this.setData({
      notFound: false,
      name: hero.name,
      nick: hero.nick,
      star: hero.star,
      heroImg: heroService.getAvatar(hero.name),
      totalScore: heroService.getTotalScore(hero),
      scores
    })
  },

  goHeroDetail() {
    if (!this.data.name) return
    wx.navigateTo({
      url: `${config.ROUTES.heroDetail}?role=${encodeURIComponent(this.data.name)}`
    })
  },

  goCodex() {
    wx.navigateTo({ url: config.ROUTES.codex })
  }
})
