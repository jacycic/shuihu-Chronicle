/**
 * 音频服务 —— 全局 BGM 单例与短音效
 * ------------------------------------------------------------------
 * 音频状态属于运行时而非业务数据，由本模块独立维护，
 * 不再挂在 app.globalData 上，也不参与可序列化的数据层。
 */
const config = require('../config/index.js')

const bgmList = config.ASSETS.bgm.map(path => config.asset(path))
const soundMap = {
  click: config.asset(config.ASSETS.sound.click),
  tips: config.asset(config.ASSETS.sound.tips),
  section: config.asset(config.ASSETS.sound.section)
}

let bgmAudio = null
let playing = false
let currentIndex = 0

function init() {
  if (bgmAudio) return
  bgmAudio = wx.createInnerAudioContext()
  bgmAudio.src = bgmList[currentIndex]
  // 关闭 loop，靠 onEnded 自动切下一首
  bgmAudio.loop = false
  bgmAudio.onPlay(() => { playing = true })
  bgmAudio.onPause(() => { playing = false })
  bgmAudio.onEnded(() => {
    currentIndex = (currentIndex + 1) % bgmList.length
    bgmAudio.src = bgmList[currentIndex]
    bgmAudio.play()
  })
  bgmAudio.onError(err => console.error('BGM播放错误:', err))
}

function play(key) {
  const src = soundMap[key]
  if (!src) return
  const sound = wx.createInnerAudioContext()
  sound.src = src
  sound.loop = false
  sound.volume = key === 'section' ? 0.30 : 1
  sound.play()
  sound.onEnded(() => sound.destroy())
  sound.onError(err => {
    console.error('音效播放失败', err)
    sound.destroy()
  })
}

function toggleBgm() {
  if (!bgmAudio) init()
  const isPaused = bgmAudio.paused
  if (isPaused) {
    bgmAudio.play()
  } else {
    bgmAudio.pause()
  }
  playing = !isPaused
  return playing
}

function isPlaying() {
  return playing
}

module.exports = { init, play, toggleBgm, isPlaying }
