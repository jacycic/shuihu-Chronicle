const config = require('../../config/index.js')
const heroService = require('../../services/heroService.js')

const SCORE_LABELS = { ren: '仁', yi: '义', li: '礼', zhi: '智', xin: '信' }
const SCORE_MAX = 100

function getStatusBarHeight() {
  try {
    const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    return info.statusBarHeight || 20
  } catch (e) {
    return 20
  }
}

Page({
  data: {
    statusBarHeight: 20,
    total: config.HERO_TOTAL,
    notFound: false,
    profile: null
  },

  onLoad(options) {
    // 自定义导航：深色头部需把状态栏文字改成白色
    if (wx.setNavigationBarColor) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#221e19',
        fail: () => {}
      })
    }

    const statusBarHeight = getStatusBarHeight()
    const name = options.role ? decodeURIComponent(options.role).trim() : ''
    const hero = name ? heroService.findByName(name) : null

    if (!hero) {
      this.setData({ statusBarHeight, notFound: true, profile: null })
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

    const rawScenes = hero.sceneList || []
    const scenes = rawScenes.map((scene, index) => ({
      name: scene.name,
      desc: scene.desc,
      index: index + 1,
      hasLine: index < rawScenes.length - 1
    }))

    // 准备该好汉的上下文，后续「好汉」页展示同一位好汉的五维
    heroService.setResult(hero)
    const seat = heroService.getSeatIndex(hero.name)
    this.setData({
      statusBarHeight,
      notFound: false,
      profile: {
        name: hero.name,
        nick: hero.nick,
        star: hero.star,
        category: (hero.star || '')[0] === '天' ? '天罡' : '地煞',
        avatar: heroService.getAvatar(hero.name),
        seatText: String(seat).padStart(3, '0'),
        totalScore: heroService.getTotalScore(hero),
        rank: heroService.getPowerRank(hero.name),
        scores,
        scenes
      }
    })
  },

  onUnload() {
    // 返回其它页面时恢复全局导航栏配色
    if (wx.setNavigationBarColor) {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#E8F4F8',
        fail: () => {}
      })
    }
  },

  goBack() {
    wx.navigateBack({
      delta: 1,
      fail: () => wx.redirectTo({ url: config.ROUTES.codex })
    })
  },

  goPlaying() {
    const profile = this.data.profile
    if (!profile) return
    wx.navigateTo({
      url: `${config.ROUTES.playing}?role=${encodeURIComponent(profile.name)}`
    })
  }
})
