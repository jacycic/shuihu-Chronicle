// section.js
const app = getApp()
Page({
  data: {
    // 题目数组，保留在这里
    questionList: [],
    // 用户五项得分
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

  // 洗牌函数，留在当前页面
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

  // 初始化题目
  initQuestion() {
    const questions = [
      {
        title: "遇到别人落难，你会？",
        options: [
          { text: "尽力出手相助", score: { ren: 2, yi: 1, li: 0, zhi: 0, xin: 1 } },
          { text: "量力而行，不勉强自己", score: { ren: 1, yi: 1, li: 0, zhi: 1, xin: 1 } },
          { text: "先观望，看清情况再说", score: { ren: 0, yi: 0, li: 1, zhi: 2, xin: 0 } },
          { text: "事不关己，远离麻烦", score: { ren: 0, yi: 0, li: 2, zhi: 0, xin: 0 } }
        ]
      },
      {
        title: "朋友被人欺负，你会？",
        options: [
          { text: "挺身而出帮朋友", score: { ren: 0, yi: 2, li: 1, zhi: 0, xin: 1 } },
          { text: "先问清楚对错再决定", score: { ren: 1, yi: 1, li: 0, zhi: 2, xin: 1 } },
          { text: "劝说朋友冷静处理", score: { ren: 1, yi: 0, li: 0, zhi: 2, xin: 0 } },
          { text: "不想掺和，保持距离", score: { ren: 0, yi: 0, li: 2, zhi: 0, xin: 0 } }
        ]
      },
      {
        title: "面对财富利益，你的想法？",
        options: [
          { text: "取之有道，不该拿的绝不碰", score: { ren: 1, yi: 1, li: 0, zhi: 1, xin: 2 } },
          { text: "合理争取属于自己的", score: { ren: 0, yi: 1, li: 2, zhi: 1, xin: 1 } },
          { text: "有机会就多拿一点", score: { ren: 0, yi: 0, li: 2, zhi: 0, xin: 0 } },
          { text: "只要有利，规则可以变通", score: { ren: 0, yi: 0, li: 2, zhi: 1, xin: 0 } }
        ]
      },
      {
        title: "做重大决定时，你习惯？",
        options: [
          { text: "深思熟虑，权衡利弊", score: { ren: 0, yi: 0, li: 0, zhi: 2, xin: 1 } },
          { text: "参考别人经验再判断", score: { ren: 0, yi: 0, li: 1, zhi: 2, xin: 0 } },
          { text: "凭直觉和本心快速决定", score: { ren: 2, yi: 1, li: 0, zhi: 0, xin: 1 } },
          { text: "容易犹豫，很难下决心", score: { ren: 1, yi: 0, li: 0, zhi: 0, xin: 0 } }
        ]
      },
      {
        title: "答应别人的事，你会？",
        options: [
          { text: "拼尽全力也要做到", score: { ren: 1, yi: 1, li: 0, zhi: 0, xin: 2 } },
          { text: "尽力而为，做不到提前说", score: { ren: 1, yi: 1, li: 0, zhi: 1, xin: 1 } },
          { text: "尽力就行，完不成没办法", score: { ren: 0, yi: 0, li: 1, zhi: 0, xin: 1 } },
          { text: "情况变了，可以反悔", score: { ren: 0, yi: 0, li: 2, zhi: 0, xin: 0 } }
        ]
      }
    ]
    // 洗牌
    const shuffled = this.shuffle(questions)
    this.setData({
      questionList: shuffled,
      currentIndex: 0,
      currentQuestion: shuffled[0],
      userScore: {
        ren: 0,
        yi: 0,
        li: 0,
        zhi: 0,
        xin: 0
      }
    })
  },

  // 点击选项
  chooseOption(e) {
    const idx = e.currentTarget.dataset.idx
    const opt = this.data.currentQuestion.options[idx]
    const score = this.data.userScore
    // 累加分数
    score.ren += opt.score.ren
    score.yi += opt.score.yi
    score.li += opt.score.li
    score.zhi += opt.score.zhi
    score.xin += opt.score.xin

    this.setData({
      userScore: score
    })

    const next = this.data.currentIndex + 1
    if (next >= this.data.questionList.length) {
      // 题目答完，开始匹配好汉
      this.matchHero()
    } else {
      this.setData({
        currentIndex: next,
        currentQuestion: this.data.questionList[next]
      })
    }
  },

  // 匹配好汉（从app.globalData拿heroList）
  matchHero() {
    const us = this.data.userScore
    const list = app.globalData.heroList
    let minDist = Infinity
    let matchList = []

    for(let h of list){
      const dist = Math.sqrt(
        Math.pow(us.ren - h.ren, 2) +
        Math.pow(us.yi - h.yi, 2) +
        Math.pow(us.li - h.li, 2) +
        Math.pow(us.zhi - h.zhi, 2) +
        Math.pow(us.xin - h.xin, 2)
      )
      if(dist < minDist){
        minDist = dist
        matchList = [h]
      }else if(dist === minDist){
        matchList.push(h)
      }
    }
    const hero = matchList[Math.floor(Math.random() * matchList.length)]
    app.globalData.heroResult = hero
    wx.navigateTo({
      url: `/pages/main/main?role=${hero.name}`,
    })
  }
})