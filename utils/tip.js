/**
 * 解锁提示桥接
 * ------------------------------------------------------------------
 * 把成就服务里的「待提示」名单交给页面上的 globaltips 组件。
 * 组件支持队列，多个成就会依次显示；确认展示后才标记为已提示，
 * 组件不存在时保留待提示状态，等下次页面 onShow 再补弹。
 */
const achievementService = require('../services/achievementService.js')

const TIP_SELECTOR = '#unlockTipRef'
let flushing = false

function getTipComponent(page) {
  try {
    return (page.selectComponent && page.selectComponent(TIP_SELECTOR)) || null
  } catch (e) {
    return null
  }
}

function flushAchievementTips(page) {
  if (flushing) return
  const pending = achievementService.getPendingUnlocks()
  if (!pending.length) return

  const deliver = () => {
    flushing = false
    const comp = getTipComponent(page)
    if (!comp) return

    if (typeof comp.showAchUnlockQueue === 'function') {
      comp.showAchUnlockQueue(pending)
    } else if (typeof comp.showAchUnlock === 'function') {
      comp.showAchUnlock(pending[0])
    } else {
      return
    }
    achievementService.markAsShown(pending)
  }

  // onShow 阶段组件通常已就绪，直接同步投递，避免页面切换时提示落在不可见页面上
  flushing = true
  if (getTipComponent(page)) {
    deliver()
  } else {
    // 首帧尚未渲染完成时延迟重试一次，仍找不到就保留待提示状态
    setTimeout(deliver, 200)
  }
}

module.exports = { flushAchievementTips }
