// section.js
const app = getApp()
Page({
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
    currentQuestion: null
  },

  shuffle(arr) {
    let newArr = [...arr]
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
    }
    return newArr
  },

  onLoad(options) {
    this.initQuestion()
  },

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

    // 9道计分题 + 1道趣味题（固定最后，不计分）
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

    const scoreQuestion = this.shuffle([q1, q2, q3, q4, q5, q6, q7, q8, q9])
    const finalQuestions = [...scoreQuestion, q10]

    this.setData({
      questionList: finalQuestions,
      currentIndex: 0,
      currentQuestion: finalQuestions[0],
      userScore: {
        ren: 0,
        yi: 0,
        li: 0,
        zhi: 0,
        xin: 0
      }
    })
  },

  chooseOption(e) {
    const idx = e.currentTarget.dataset.idx
    const opt = this.data.currentQuestion.options[idx]
    const score = this.data.userScore
    score.ren += opt.score.ren
    score.yi += opt.score.yi
    score.li += opt.score.li
    score.zhi += opt.score.zhi
    score.xin += opt.score.xin

    // 限制单项最高10分，防止溢出
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
    if (next >= this.data.questionList.length) {
      this.matchHeroByTotalScore()
    } else {
      this.setData({
        currentIndex: next,
        currentQuestion: this.data.questionList[next]
      })
    }
  },

  // ========= 新匹配函数：总分区间 + 区间内随机 =========
   // 新匹配函数：自动读取app.globalData.heroList，计算好汉总分，自动分组
   matchHeroByTotalScore() {
    const us = this.data.userScore
    const userTotal = us.ren + us.yi + us.li + us.zhi + us.xin
    console.log("用户五项得分：", us, " 用户总分：", userTotal)

    // 1. 读取全局好汉列表，计算每个好汉自身总分
    let heroPool = app.globalData.heroList.map(h => {
      const heroTotal = h.ren + h.yi + h.li + h.zhi + h.xin
      return {
        ...h,
        heroTotal
      }
    })

    // 2. 按好汉总分从小到大排序
    heroPool.sort((a,b)=> a.heroTotal - b.heroTotal)

    // 3. 把108好汉切成5等分，5个区间池
    const totalHeroCount = heroPool.length
    const partLen = Math.floor(totalHeroCount / 5)

    const zoneLow = heroPool.slice(0, partLen)                    // 低分池 0~20%
    const zoneLowMid = heroPool.slice(partLen, partLen*2)         // 中低 20~40%
    const zoneMid = heroPool.slice(partLen*2, partLen*3)          // 中等 40~60%
    const zoneMidHigh = heroPool.slice(partLen*3, partLen*4)     // 中高 60~80%
    const zoneHigh = heroPool.slice(partLen*4)                    // 高分 80~100%

    // 4. 根据用户总分（0~50）选择对应好汉池
    let targetPool
    if(userTotal <= 9){
      targetPool = zoneLow
    }else if(userTotal <= 19){
      targetPool = zoneLowMid
    }else if(userTotal <=29){
      targetPool = zoneMid
    }else if(userTotal <=39){
      targetPool = zoneMidHigh
    }else{
      targetPool = zoneHigh
    }

    // 5. 在当前池子随机抽一个好汉
    const randomHero = targetPool[Math.floor(Math.random() * targetPool.length)]
    const heroName = randomHero.name
    app.globalData.heroResult = randomHero

    // 解锁存储逻辑不变
    let isNewUnlock = false
    let unlockList = wx.getStorageSync('unlockHero') || []
    if (!unlockList.includes(heroName)) {
      unlockList.push(heroName)
      wx.setStorageSync('unlockHero', unlockList)
      isNewUnlock = true
    }

    wx.navigateTo({
      url: `/pages/main/main?role=${encodeURIComponent(heroName)}&isNewUnlock=${isNewUnlock}`,
    })
  },
})