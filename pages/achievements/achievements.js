Page({
  data:{
    achievementList: [
      {
        name: "以史为镜",
        desc: "完成水浒故事初识，开启梁山旅途",
        unlocked: false,
        icon: "https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/other/finish.png",
        heroes: [],
        isFirstEnter: true // 标记：首次进入解锁
      },
      {
        name: "私人定制",
        desc: "修改你的梁山昵称，自定义头像",
        unlocked: !!wx.getStorageSync('ach_privateCustom'),
        icon: "",
        heroes: [],
        needEditInfo: true //标记：修改头像昵称解锁
      },
      {
        name: "好奇宝宝",
        desc: "任意解锁5名好汉",
        unlocked: false,
        icon: "",
        heroes: [],
        total: 5
      },
      {
        name: "谁说女子不如男",
        desc: "解锁三名女将：扈三娘、顾大嫂、孙二娘",
        unlocked: false,
        icon: "",
        heroes: ["扈三娘", "顾大嫂", "孙二娘"]
      },
      {
        name: "三十六天罡",
        desc: "解锁天罡系列好汉",
        unlocked: false,
        icon: "",
        heroes: ["宋江", "卢俊义", "吴用", "公孙胜", "关胜", "林冲", "秦明", "呼延灼", "花荣", "柴进", "李应", "朱仝", "鲁智深", "武松", "董平", "张清", "杨志", "徐宁", "索超", "戴宗", "刘唐", "李逵", "史进", "穆弘", "雷横", "李俊", "阮小二", "张横", "阮小五", "张顺", "阮小七", "杨雄"]
      },
      {
        name: "七十二地煞",
        desc: "解锁地煞系列好汉",
        unlocked: false,
        icon: "",
        heroes: ["朱武", "黄信", "孙立", "宣赞", "郝思文", "韩滔", "彭玘", "单廷圭", "魏定国", "萧让", "裴宣", "欧鹏", "邓飞", "燕顺", "杨林", "凌振", "蒋敬", "吕方", "郭盛", "安道全", "皇甫端", "王英", "扈三娘", "鲍旭", "樊瑞", "孔明", "孔亮", "项充", "李衮", "金大坚", "马麟", "童威", "童猛", "孟康", "侯健", "陈达", "杨春", "郑天寿", "陶宗旺", "宋清", "乐和", "龚旺", "丁得孙", "穆春", "曹正", "宋万", "杜迁", "薛永", "施恩", "李忠", "周通", "汤隆", "杜兴", "邹渊", "邹润", "朱贵", "朱富", "蔡福", "蔡庆", "李立", "李云", "焦挺", "石勇", "孙新", "顾大嫂", "张青", "孙二娘", "王定六", "郁保四", "白胜", "时迁", "段景住"]
      },
      {
        name: "七星聚义",
        desc: "解锁晁盖、吴用、公孙胜、刘唐、阮小二、阮小五、阮小七",
        unlocked: false,
        icon: "",
        heroes: ["晁盖", "吴用", "公孙胜", "刘唐", "阮小二", "阮小五", "阮小七"]
      },
      {
        name: "马军五虎将",
        desc: "解锁关胜、林冲、秦明、呼延灼、董平",
        unlocked: false,
        icon: "",
        heroes: ["关胜", "林冲", "秦明", "呼延灼", "董平"]
      },
      {
        name: "马军八骠骑",
        desc: "解锁花荣、徐宁、杨志、索超、张清、朱仝、史进、穆弘",
        unlocked: false,
        heroes: ["花荣", "徐宁", "杨志", "索超", "张清", "朱仝", "史进", "穆弘"]
      },
      {
        name: "阮氏三雄",
        desc: "解锁阮小二、阮小五、阮小七",
        unlocked: false,
        icon: "",
        heroes: ["阮小二", "阮小五", "阮小七"]
      },
      {
        name: "呼风唤雨",
        desc: "解锁公孙胜",
        unlocked: false,
        icon: "",
        heroes: ["公孙胜"]
      },
      {
        name: "水军头领",
        desc: "解锁李俊、阮小二、张横、阮小五、阮小七、童威、童猛",
        unlocked: false,
        icon: "",
        heroes: ["李俊", "阮小二", "张横", "阮小五", "阮小七", "童威", "童猛"]
      },
      {
        name: "刽子手",
        desc: "解锁蔡福、蔡庆",
        unlocked: false,
        icon: "",
        heroes: ["蔡福", "蔡庆"]
      },
      {
        name: "偷天换日",
        desc: "解锁时迁",
        unlocked: false,
        icon: "",
        heroes: ["时迁"]
      },
      {
        name: "一百单八将",
        desc: "解锁全部108名好汉",
        unlocked: false,
        icon: "",
        heroes: [],
        total: 108
      }
    ],
    unlockedCount: 0,
    lockedCount: 0
  },
  onLoad(options){
    this.refreshAchievement()
  },
  onShow(){
    this.refreshAchievement()
  },
  // 刷新成就解锁状态
  refreshAchievement() {
    const unlockHero = wx.getStorageSync('unlockHero') || []
    const unlockCount = unlockHero.length
    // 读取标记：是否已经解锁【以史为镜】成就
    const isUnlockYiShi = wx.getStorageSync('ach_yswj') || false

    const newList = this.data.achievementList.map(item => {
      let unlocked = false

      // 【移除原来写死的固定解锁】
      // 以史为镜：看缓存标记
      if(item.isFirstEnter){
        unlocked = isUnlockYiShi
      }
      // 私人定制：修改昵称头像后解锁，你后续在user页面修改信息时设置这个缓存标记
      else if(item.needEditInfo){
        unlocked = wx.getStorageSync('ach_privateCustom') || false
      }
      // 按总数判断：好奇宝宝、一百单八将
      else if (item.total) {
        unlocked = unlockCount >= item.total
      }
      // 按指定好汉判断
      else if (item.heroes && item.heroes.length > 0) {
        unlocked = item.heroes.every(name => unlockHero.includes(name))
      }

      return {
        ...item,
        unlocked
      }
    })
    const unlockedCount = newList.filter(item => item.unlocked).length
    const lockedCount = newList.length - unlockedCount

    this.setData({
      achievementList: newList,
      unlockedCount,
      lockedCount
    })
    wx.setStorageSync('achievementList', newList)
  },
  // 点击成就卡片
  clickItem(e){
    const index = e.currentTarget.dataset.index
    const item = this.data.achievementList[index]
    if(item.unlocked){
      wx.showModal({
        title: item.name,
        content: item.desc,
        showCancel:false
      })
    }
  }
})