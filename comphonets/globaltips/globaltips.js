Component({
  properties: {},
  data: {
    showHeroTip: false,
    showAchTip: false,
    heroName: "",
    achName: "",
    heroTimer: null,
    achTimer: null,
    nextTimer: null,
    achQueue: []
  },

  lifetimes: {
    detached() {
      if (this.data.heroTimer) clearTimeout(this.data.heroTimer)
      if (this.data.achTimer) clearTimeout(this.data.achTimer)
      if (this.data.nextTimer) clearTimeout(this.data.nextTimer)
    }
  },

  methods: {
    // 弹出好汉解锁提示
    showHeroUnlock(name) {
      if (this.data.heroTimer) clearTimeout(this.data.heroTimer)
      this.setData({ showHeroTip: true, heroName: name })
      const timer = setTimeout(() => {
        this.setData({ showHeroTip: false })
      }, 3000)
      this.setData({ heroTimer: timer })
    },

    // 单个成就提示（保留原有调用方式）
    showAchUnlock(name) {
      this.showAchUnlockQueue([name])
    },

    // 多个成就同时解锁时依次弹出，避免互相覆盖只显示最后一个
    showAchUnlockQueue(names) {
      if (!Array.isArray(names) || !names.length) return
      this.setData({ achQueue: [...this.data.achQueue, ...names] })
      this.showNextAchTip()
    },

    showNextAchTip() {
      if (this.data.showAchTip || !this.data.achQueue.length) return

      const queue = [...this.data.achQueue]
      const name = queue.shift()
      this.setData({ achQueue: queue, showAchTip: true, achName: name })

      if (this.data.achTimer) clearTimeout(this.data.achTimer)
      const timer = setTimeout(() => {
        this.setData({ showAchTip: false, achTimer: null })
        // 等上一条消失后再显示下一条
        const nextTimer = setTimeout(() => this.showNextAchTip(), 200)
        this.setData({ nextTimer })
      }, 3000)
      this.setData({ achTimer: timer })
    }
  }
})
