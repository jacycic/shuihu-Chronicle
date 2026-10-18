Component({
  properties: {},
  data: {
    showHeroTip:false,
    showAchTip:false,
    heroName:"",
    achName:"",
    heroTimer:null,
    achTimer:null
  },
  methods:{
    // 弹出好汉解锁提示
    showHeroUnlock(name){
      // 如果已有弹窗，先清除旧定时器
      if(this.data.heroTimer) clearTimeout(this.data.heroTimer)
      this.setData({
        showHeroTip:true,
        heroName:name
      })
      const app = getApp()
      
      const timer = setTimeout(()=>{
        this.setData({showHeroTip:false})
      },3000)
      this.setData({heroTimer:timer})
    },
    // 弹出成就解锁提示
    showAchUnlock(name){
      if(this.data.achTimer) clearTimeout(this.data.achTimer)
      this.setData({
        showAchTip:true,
        achName:name
      })
      const timer = setTimeout(()=>{
        this.setData({showAchTip:false})
      },3000)
      this.setData({achTimer:timer})
    }
  }
})