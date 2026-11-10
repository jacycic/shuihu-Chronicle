const config = require('../../config/index.js')
const { shuffle } = require('../../utils/util.js')
const heroService = require('../../services/heroService.js')
const progressService = require('../../services/progressService.js')
const audioService = require('../../services/audioService.js')

Page({
  /**
   * 人格测试页面数据
   * questionList：全部题目数组
   * userScore：用户五项维度得分 仁、义、礼、智、信，初始全0
   * currentIndex：当前题目下标
   * currentQuestion：当前展示的题目对象
   * inputHeroName：好汉手动输入框绑定值，用于直接跳转好汉详情
   */
  data: {
    questionList: [],
    userScore: {
      ren: 0,
      yi: 0,
      li: 0,
      zhi: 0,
      xin: 0
    },
    currentIndex: 0,
    currentQuestion: null,
    inputHeroName:"",
    randomHero: null,      // 本次随机抽中的未解锁好汉
    randomRemain: 0,       // 尚未解锁的好汉数量
    randomAllDone: false   // 是否已全部集齐
  },

  /**
   * Fisher-Yates 洗牌算法，打乱数组顺序
   * @param {Array} arr 待打乱数组
   * @returns {Array} 打乱后的新数组
   */
  /** 复用公共洗牌工具，避免与答题页重复实现 */
  shuffle(arr) {
    return shuffle(arr)
  },

  // 页面加载，初始化题目
  onLoad(options) {
    this.initQuestion()
  },

  /** 从好汉详情返回时刷新「未解锁剩余」，避免按钮状态停留在旧数据 */
  onShow() {
    const remain = this.getLockedHeroes().length
    this.setData({ randomRemain: remain, randomAllDone: remain === 0 })
  },

  /** 尚未解锁的好汉档案：按当前账号的收集进度过滤 */
  getLockedHeroes() {
    const unlocked = progressService.getUnlockedHeroes()
    return heroService.getAll().filter(hero => !unlocked.includes(hero.name))
  },

  /** 随机按钮：只在未解锁好汉中抽，不立即解锁，确认后再前往 */
  randomPickHero() {
    const locked = this.getLockedHeroes()
    if (!locked.length) {
      this.setData({ randomHero: null, randomRemain: 0, randomAllDone: true })
      wx.showToast({ title: '好汉已全部解锁', icon: 'none' })
      return
    }
    const hero = this.shuffle(locked)[0]
    this.setData({
      randomHero: { name: hero.name, nick: hero.nick || '', star: hero.star || '' },
      randomRemain: locked.length,
      randomAllDone: false
    })
  },

  /** 确认前往：与手动输入、测试匹配的解锁流程保持一致 */
  goRandomHero() {
    const picked = this.data.randomHero
    if (!picked) return
    const hero = heroService.findByName(picked.name)
    if (!hero) {
      wx.showToast({ title: '该好汉不存在', icon: 'none' })
      return
    }
    this.setData({ randomHero: null })
    heroService.setResult(hero)
    const isNewUnlock = progressService.unlockHero(picked.name)
    wx.navigateTo({
      url: `${config.ROUTES.main}?role=${encodeURIComponent(picked.name)}&isNewUnlock=${isNewUnlock}`
    })
  },

  closeRandom() {
    this.setData({ randomHero: null })
  },

  noop() {},

  /**
   * 初始化题目核心函数
   * 题库分为：仁/义/礼/智/信单项题、混合维度题、趣味不计分题
   * 每组题库随机抽取一题，9道计分题打乱顺序，最后固定放趣味题
   */
  initQuestion() {
    // 题库：每题单项最高+2，5题单项拉满就能拿到单项10分上限
    const questionBank = {
      renList: [
        {
          type: "ren",
          title: "路上遇见素不相识的落难百姓，饥寒交迫，你会？",
          options: [
            { text: "倾囊相助，先救人性命", score: { ren: 2, yi: 0, li: 0, zhi: 0, xin: 0 } },
            { text: "量力接济，不掏空自己", score: { ren: 1, yi: 0, li: 0, zhi: 0, xin: 0 } },
            { text: "观望风险，不轻易出手", score: { ren: 0, yi: 0, li: 0, zhi: 1, xin: 0 } },
            { text: "世道艰难，自顾尚且不暇", score: { ren: 0, yi: 0, li: 1, zhi: 0, xin: 0 } }
          ]
        }
      ],
      yiList: [
        {
          type: "yi",
          title: "结义兄弟蒙冤受难，营救会连累你自身，你选择？",
          options: [
            { text: "舍身相救，义字当先", score: { ren: 0, yi: 2, li: 0, zhi: 0, xin: 0 } },
            { text: "暗中相助，控制自身风险", score: { ren: 0, yi: 1, li: 0, zhi: 0, xin: 0 } },
            { text: "好言宽慰，不陪他冒险", score: { ren: 0, yi: 0, li: 0, zhi: 1, xin: 0 } },
            { text: "避而远之，防止被牵连", score: { ren: 0, yi: 0, li: 1, zhi: 0, xin: 0 } }
          ]
        }
      ],
      liList: [
        {
          type: "li",
          title: "山寨议事，哪怕是底层小喽啰进言，你会？",
          options: [
            { text: "以礼相待，认真倾听判断", score: { ren: 0, yi: 0, li: 2, zhi: 0, xin: 0 } },
            { text: "礼貌听听，仅供参考", score: { ren: 0, yi: 0, li: 1, zhi: 0, xin: 0 } },
            { text: "身份低微，不必重点考量", score: { ren: 0, yi: 0, li: 0, zhi: 1, xin: 0 } },
            { text: "地位悬殊，直接不予采纳", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 0 } }
          ]
        }
      ],
      zhiList: [
        {
          type: "zhi",
          title: "对手抛出巨大利益引诱，你怀疑暗藏圈套，你会？",
          options: [
            { text: "冷静推演，识破计谋", score: { ren: 0, yi: 0, li: 0, zhi: 2, xin: 0 } },
            { text: "多方试探，验证真假", score: { ren: 0, yi: 0, li: 0, zhi: 1, xin: 0 } },
            { text: "利益足够，值得一试", score: { ren: 0, yi: 0, li: 1, zhi: 0, xin: 0 } },
            { text: "机会难得，立刻抓住", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 0 } }
          ]
        }
      ],
      xinList: [
        {
          type: "xin",
          title: "你当众立下重诺，时局突变，履约代价极大，你？",
          options: [
            { text: "一诺千金，拼死践行诺言", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 2 } },
            { text: "尽力去做，做不到提前告知", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 1 } },
            { text: "形势有变，承诺可以变通", score: { ren: 0, yi: 0, li: 0, zhi: 1, xin: 0 } },
            { text: "保命优先，承诺可以作废", score: { ren: 0, yi: 0, li: 1, zhi: 0, xin: 0 } }
          ]
        }
      ],
      mix1List: [
        {
          type: "mix",
          title: "山寨缺粮，有一富户囤积大量粮食，你主张？",
          options: [
            { text: "好言劝说，借粮留凭证归还", score: { ren: 2, yi: 0, li: 0, zhi: 0, xin: 0 } },
            { text: "取其钱粮，救济贫苦百姓", score: { ren: 0, yi: 2, li: 0, zhi: 0, xin: 0 } },
            { text: "谨慎谋划，防止官府围剿", score: { ren: 0, yi: 0, li: 0, zhi: 2, xin: 0 } },
            { text: "不惹官府，另寻办法", score: { ren: 0, yi: 0, li: 2, zhi: 0, xin: 0 } }
          ]
        }
      ],
      mix2List: [
        {
          type: "mix",
          title: "战斗中队友犯错导致战局不利，你会？",
          options: [
            { text: "先掩护队友，战后再论对错", score: { ren: 0, yi: 2, li: 0, zhi: 0, xin: 0 } },
            { text: "客观问责，赏罚分明", score: { ren: 0, yi: 0, li: 2, zhi: 0, xin: 0 } },
            { text: "快速止损，优先保全队伍", score: { ren: 0, yi: 0, li: 0, zhi: 2, xin: 0 } },
            { text: "怪罪此人，与其划清界限", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 0 } }
          ]
        }
      ],
      mix3List: [
        {
          type: "mix",
          title: "面对招安，你心中第一想法是？",
          options: [
            { text: "盼招安，为国效力", score: { ren: 0, yi: 0, li: 2, zhi: 0, xin: 0 } },
            { text: "不愿招安，自在梁山快活", score: { ren: 0, yi: 2, li: 0, zhi: 0, xin: 0 } },
            { text: "静观其变，权衡利弊再定", score: { ren: 0, yi: 0, li: 0, zhi: 2, xin: 0 } },
            { text: "招安是陷阱，坚决反对", score: { ren: 2, yi: 0, li: 0, zhi: 0, xin: 0 } }
          ]
        }
      ],
      mix4List: [
        {
          type: "mix",
          title: "有人重金收买你出卖山寨机密，你会？",
          options: [
            { text: "断然拒绝，誓死保守秘密", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 2 } },
            { text: "假意答应，借机反设圈套", score: { ren: 0, yi: 0, li: 0, zhi: 2, xin: 0 } },
            { text: "拒绝诱惑，委婉推脱", score: { ren: 0, yi: 0, li: 2, zhi: 0, xin: 0 } },
            { text: "看报酬多少再考虑", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 0 } }
          ]
        }
      ],
      funList: [
        {
          type: "fun",
          title: "上梁山，你最想带什么随身物品？",
          options: [
            { text: "宝刀利剑", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 0 } },
            { text: "笔墨书卷", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 0 } },
            { text: "好酒一坛", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 0 } },
            { text: "干粮肉脯", score: { ren: 0, yi: 0, li: 0, zhi: 0, xin: 0 } }
          ]
        }
      ]
    }

    // 每组题库随机抽一题，得到9道计分题 + 1道趣味题（不计分，放最后）
    const q1 = this.shuffle(questionBank.renList)[0]
    const q2 = this.shuffle(questionBank.yiList)[0]
    const q3 = this.shuffle(questionBank.liList)[0]
    const q4 = this.shuffle(questionBank.zhiList)[0]
    const q5 = this.shuffle(questionBank.xinList)[0]
    const q6 = this.shuffle(questionBank.mix1List)[0]
    const q7 = this.shuffle(questionBank.mix2List)[0]
    const q8 = this.shuffle(questionBank.mix3List)[0]
    const q9 = this.shuffle(questionBank.mix4List)[0]
    const q10 = questionBank.funList[0]

    // 打乱9道计分题顺序，趣味题固定放在末尾
    const scoreQuestion = this.shuffle([q1, q2, q3, q4, q5, q6, q7, q8, q9])
    const finalQuestions = [...scoreQuestion, q10]

    this.setData({
      questionList: finalQuestions,
      currentIndex: 0,
      currentQuestion: finalQuestions[0],
      // 重置五项分数为0
      userScore: {
        ren: 0,
        yi: 0,
        li: 0,
        zhi: 0,
        xin: 0
      }
    })
  },

  /**
   * 选择选项
   * 点击事件，携带选项下标idx
   */
  chooseOption(e) {
    const idx = e.currentTarget.dataset.idx
    const opt = this.data.currentQuestion.options[idx]
    const score = this.data.userScore
    // 累加该选项对应的五项分值
    score.ren += opt.score.ren
    score.yi += opt.score.yi
    score.li += opt.score.li
    score.zhi += opt.score.zhi
    score.xin += opt.score.xin

    // 单项上限锁定为10，防止分数溢出
    if(score.ren>10) score.ren=10
    if(score.yi>10) score.yi=10
    if(score.li>10) score.li=10
    if(score.zhi>10) score.zhi=10
    if(score.xin>10) score.xin=10

    this.setData({
      userScore: score
    })
    console.log("当前得分：", this.data.userScore)

    const next = this.data.currentIndex + 1
    // 题目答完，进入匹配好汉逻辑；否则切换下一题
    if (next >= this.data.questionList.length) {
      this.matchHeroByTotalScore()
    } else {
      this.setData({
        currentIndex: next,
        currentQuestion: this.data.questionList[next]
      })
    }
  },

  /**
   * 匹配好汉主逻辑：根据用户总分划分区间，在对应区间池随机抽取好汉
   */
  matchHeroByTotalScore() {
    const us = this.data.userScore
    const userTotal = us.ren + us.yi + us.li + us.zhi + us.xin
    console.log("用户五项得分：", us, " 用户总分：", userTotal)

    // 分池与随机抽取规则由领域服务负责
    const randomHero = heroService.matchByScore(userTotal)
    const heroName = randomHero.name
    // 结果存入服务层，供好汉详情页读取
    heroService.setResult(randomHero)

    // 解锁持久化由进度服务负责，返回是否为本次新解锁
    const isNewUnlock = progressService.unlockHero(heroName)

    wx.navigateTo({
      url: `${config.ROUTES.main}?role=${encodeURIComponent(heroName)}&isNewUnlock=${isNewUnlock}`,
    })
  },

  /**
   * 输入框绑定事件，接收用户输入的好汉名字
   */
  onInputHero(e){
    this.setData({
      inputHeroName:e.detail.value
    })
  },
  /**
   * 手动输入好汉直接跳转详情，和测试匹配的解锁逻辑完全一致
   */
  manualJumpHero(){
    const inputName = this.data.inputHeroName.trim()
    if(!inputName){
      wx.showToast({title:"请输入好汉名字",icon:"none"})
      return
    }
    // 好汉查询、结果保存与解锁逻辑与测试匹配保持一致
    const targetHero = heroService.findByName(inputName)
    if(!targetHero){
      wx.showToast({title:"该好汉不存在",icon:"none"})
      return
    }
    heroService.setResult(targetHero)
    const isNewUnlock = progressService.unlockHero(inputName)
    wx.navigateTo({
      url: `${config.ROUTES.main}?role=${encodeURIComponent(inputName)}&isNewUnlock=${isNewUnlock}`
    })
  },
  // 播放section音效
  SectionSound(){
    audioService.play('section')
  },
  // 播放click点击音效
  ClicknSound(){
    audioService.play('click')
  }
})