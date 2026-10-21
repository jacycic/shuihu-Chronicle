Page({
  /**
   * 页面数据
   * achievementList：成就配置列表，存放所有成就的规则、文案、图标等信息
   * unlockedCount：已解锁成就数量
   * lockedCount：未解锁成就数量
   */
  data:{
    achievementList: [
      {
        name: "以史为镜",
        desc: "完成水浒故事初识，开启梁山旅途",
        unlocked: false,
        icon: "https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/other/finish.png",
        heroes: [],
        isFirstEnter: true  // 标记：特殊成就，不靠好汉解锁，单独存储标记判断
      },
      {
        name: "私人定制",
        desc: "修改你的梁山昵称，自定义头像",
        unlocked: false,
        icon: "",
        heroes: [],
        needEditInfo: true  // 标记：特殊成就，修改资料触发解锁，单独存储标记
      },
      {
        name: "好奇宝宝",
        desc: "任意解锁5名好汉",
        unlocked: false,
        icon: "",
        heroes: [],
        total: 5  // 规则类型：累计解锁好汉数量达到 total 值即解锁
      },
      {
        name: "谁说女子不如男",
        desc: "解锁三名女将：扈三娘、顾大嫂、孙二娘",
        unlocked: false,
        icon: "",
        heroes: ["扈三娘", "顾大嫂", "孙二娘"] // 规则类型：列表内所有好汉全部解锁才解锁成就
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

  // 页面加载时，刷新成就解锁状态
  onLoad(options){
    this.refreshAchievement()
  },

  // 页面每次显示时，重新校验成就（从别的页面回来同步状态）
  onShow(){
    this.refreshAchievement()
  },

  /**
   * 刷新、校验所有成就解锁状态，核心函数
   * 读取本地存储的解锁好汉列表，按每条成就规则判断是否解锁
   */
  refreshAchievement() {
    // 获取本地已经解锁的好汉数组
    const unlockHero = wx.getStorageSync('unlockHero') || []
    const unlockCount = unlockHero.length
    // “以史为镜”成就单独标记
    const isUnlockYiShi = wx.getStorageSync('ach_yswj') || false
    // 读取上一次保存的成就状态，用来对比判断本次有没有新解锁
    const oldList = wx.getStorageSync('achievementList') || []

    // 遍历成就配置，逐条计算解锁状态
    const newList = this.data.achievementList.map(item => {
      let unlocked = false
      if(item.isFirstEnter){
        // 规则1：以史为镜，读取独立标记
        unlocked = isUnlockYiShi
      } else if(item.needEditInfo){
        // 规则2：私人定制，修改资料独立标记
        unlocked = wx.getStorageSync('ach_privateCustom') || false
      } else if (item.total) {
        // 规则3：数量型成就：解锁好汉总数 >= 目标数量
        unlocked = unlockCount >= item.total
      } else if (item.heroes && item.heroes.length > 0) {
        // 规则4：集合型成就：数组内全部好汉都解锁
        unlocked = item.heroes.every(name => unlockHero.includes(name))
      }
      // 返回新对象，保留原有配置，更新unlocked状态
      return {
        ...item,
        unlocked
      }
    })

    // 筛选【本次刷新刚刚解锁】的成就（旧状态未解锁，新状态解锁）
    const newUnlockArr = newList.filter(newItem => {
      const oldItem = oldList.find(o => o.name === newItem.name)
      return newItem.unlocked && (!oldItem || !oldItem.unlocked)
    })

    // 统计已解锁、未解锁成就数量
    const unlockedCount = newList.filter(item => item.unlocked).length
    const lockedCount = newList.length - unlockedCount

    // 更新页面渲染数据
    this.setData({
      achievementList: newList,
      unlockedCount,
      lockedCount
    })
    // 把最新成就状态存入本地缓存持久化
    wx.setStorageSync('achievementList', newList)

    // 触发自定义事件，通知父页面弹出成就解锁提示弹窗
    newUnlockArr.forEach(item => {
      this.triggerEvent('showAchievementTip', {
        achName: item.name,
        achDesc: item.desc,
        achIcon: item.icon
      })
    })
  },

  /**
   * 点击成就条目
   * 已解锁的成就，弹出模态框展示说明；未解锁点击无响应
   */
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