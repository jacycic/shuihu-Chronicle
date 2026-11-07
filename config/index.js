/**
 * 全局配置层
 * ------------------------------------------------------------------
 * 视图层（pages/）不再硬编码资源地址、缓存键、路由与后端地址，统一从这里取。
 * 接入真实后端时，只需修改 API 一节，页面代码无需改动。
 */
const OSS_BASE = 'https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img'

// 资源统一用相对路径登记，由 asset() 拼成完整地址
const ASSETS = {
  bgm: [
    '/bgm/bgm1.mp3',
    '/bgm/bgm2.mp3',
    '/bgm/bgm3.mp3',
    '/bgm/bgm4.mp3'
  ],
  sound: {
    click: '/bgm/click.mp3',
    tips: '/bgm/tips.mp3',
    section: '/bgm/section.mp3'
  },
  npcAvatar: '/npc/npc.png',
  finishIcon: '/other/finish.png',
  defaultAvatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
}

// 本地持久化键：全部在此登记，禁止页面内直接写字符串
const STORAGE_KEYS = {
  unlockHero: 'unlockHero',
  sceneUnlock: 'heroSceneUnlock',
  legacySceneUnlock: 'heroSceneUnlockStorage', // 历史遗留键，init() 时自动迁移
  achievements: 'achievementList',
  shownAchievements: 'shownAchievements', // 已弹过解锁提示的成就名
  firstEnter: 'ach_yswj',
  customProfile: 'ach_privateCustom',
  avatar: 'userAvatar',
  nickname: 'userNickname',
  logs: 'logs'
}

const ROUTES = {
  home: '/pages/test01/test01',
  section: '/pages/section/section',
  main: '/pages/main/main',
  mans: '/pages/mans/mans',
  playing: '/pages/playing/playing',
  achievements: '/pages/achievements/achievements',
  codex: '/pages/codex/codex',
  heroDetail: '/pages/hero-detail/hero-detail',
  chart: '/pages/chart/chart',
  user: '/pages/user/user',
  friends: '/pages/friends/friends',
  quizzes: '/pages/quizzes/quizzes',
  logs: '/pages/logs/logs'
}

/**
 * 后端接口配置。
 * enabled=false 时全项目零网络请求，保持纯本地可用；
 * 打开后由 services/request.js 统一发出请求，services 负责离线回退。
 */
const API = {
  enabled: false,
  baseURL: '',
  timeout: 10000,
  endpoints: {
    heroes: '/heroes',
    dialogs: '/dialogs',
    progress: '/progress'
  }
}

/**
 * 微信云开发（好友功能）。
 * 默认关闭：未部署云函数时全项目零网络请求，好友页会显示开通引导。
 * 部署步骤见 README「好友功能部署」。
 */
const CLOUD = {
  enabled: true,
  env: 'cloud1-d5gfygc8z412eb684',              // 例：cloud1-d5gfygc8z412eb684
  functionName: 'friend'
}

const HERO_TOTAL = 108
const SCORE_FIELDS = ['ren', 'yi', 'li', 'zhi', 'xin']

function asset(path) {
  if (!path) return ''
  return /^https?:\/\//.test(path) ? path : OSS_BASE + path
}

module.exports = {
  OSS_BASE,
  ASSETS,
  STORAGE_KEYS,
  ROUTES,
  API,
  CLOUD,
  HERO_TOTAL,
  SCORE_FIELDS,
  asset
}
