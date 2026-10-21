const app = getApp()

// 原始题库，每一题单独包裹成数组
const questionBank = [
  [{title:"《水浒传》的作者是？",opt:["施耐庵","罗贯中"],ans:0}],
  [{title:"梁山泊的寨主，第一位是谁？",opt:["晁盖","王伦"],ans:1}],
  [{title:"绰号及时雨的好汉是？",opt:["宋江","卢俊义"],ans:0}],
  [{title:"豹子头是哪位好汉的绰号？",opt:["林冲","武松"],ans:0}],
  [{title:"鲁智深的原名叫做？",opt:["鲁达","鲁修"],ans:0}],
  [{title:"武松打虎的地点是？",opt:["景阳冈","黄泥冈"],ans:0}],
  [{title:"“智取生辰纲”的领头人是？",opt:["晁盖","吴用"],ans:0}],
  [{title:"智多星指的是谁？",opt:["吴用","公孙胜"],ans:0}],
  [{title:"黑旋风是哪位好汉？",opt:["李逵","张飞"],ans:0}],
  [{title:"梁山一百单八将中第一个出场的是？",opt:["史进","鲁智深"],ans:0}],
  [{title:"绰号玉麒麟的是？",opt:["卢俊义","林冲"],ans:0}],
  [{title:"宋江在浔阳楼题写了什么？",opt:["反诗","家书"],ans:0}],
  [{title:"杨志押送的生辰纲送给谁？",opt:["蔡京","高俅"],ans:0}],
  [{title:"花和尚鲁智深最后在哪圆寂？",opt:["杭州六和寺","五台山"],ans:0}],
  [{title:"行者武松，行者代表什么？",opt:["头陀打扮的人","赶路商人"],ans:0}],
  [{title:"母夜叉是谁？",opt:["孙二娘","顾大嫂"],ans:0}],
  [{title:"一丈青是哪位女将？",opt:["扈三娘","潘金莲"],ans:0}],
  [{title:"戴宗的绰号是？",opt:["神行太保","飞天大圣"],ans:0}],
  [{title:"小李广指的是？",opt:["花荣","杨志"],ans:0}],
  [{title:"秦明的绰号是？",opt:["霹雳火","急先锋"],ans:0}],
  [{title:"林冲被谁设计误入白虎堂？",opt:["高俅","高衙内"],ans:0}],
  [{title:"风雪山神庙是谁的经典故事？",opt:["林冲","鲁智深"],ans:0}],
  [{title:"倒拔垂杨柳的好汉是？",opt:["鲁智深","李逵"],ans:0}],
  [{title:"李逵的母亲死在哪里？",opt:["沂岭","梁山"],ans:0}],
  [{title:"宋江接受招安之后，征讨的第一个大寇是？",opt:["辽国","方腊"],ans:0}],
  [{title:"梁山聚义大厅最初叫什么？",opt:["聚义厅","忠义堂"],ans:0}],
  [{title:"宋江将聚义厅改为？",opt:["忠义堂","替天厅"],ans:0}],
  [{title:"鼓上蚤是谁？",opt:["时迁","段景住"],ans:0}],
  [{title:"金毛犬段景住的特长是？",opt:["相马","偷盗"],ans:0}],
  [{title:"浪里白条是谁？",opt:["张顺","张横"],ans:0}],
  [{title:"宋江的外号孝义黑三郎，黑是因为？",opt:["肤色黝黑","黑衣打扮"],ans:0}],
  [{title:"武松在鸳鸯楼一共杀了几人？",opt:["十五人","八人"],ans:0}],
  [{title:"王进是哪位好汉的师父？",opt:["史进","鲁智深"],ans:0}],
  [{title:"九纹龙史进身上有几条龙纹身？",opt:["九条","五条"],ans:0}],
  [{title:"公孙胜擅长什么道术？",opt:["呼风唤雨","隐身术"],ans:0}],
  [{title:"青面兽杨志脸上胎记是什么颜色？",opt:["青褐色","红色"],ans:0}],
  [{title:"呼延灼的坐骑叫做？",opt:["踏雪乌骓","千里白龙驹"],ans:0}],
  [{title:"金枪手徐宁的独门兵器是？",opt:["钩镰枪","梨花枪"],ans:0}],
  [{title:"方腊是被谁活捉？",opt:["鲁智深","武松"],ans:0}],
  [{title:"梁山好汉排座次，是谁主持的？",opt:["宋江","晁盖"],ans:0}]
]

Page({
  /**
   * 页面数据
   * allQuestion：全部40道原始题库
   * questionList：本次答题随机抽取的20道题目
   * current：当前题目下标，从0开始
   * score：当前得分，一题5分，满分100
   * fullScore：总分上限100
   * total：本轮题目总数固定20题
   * isFinish：答题是否结束
   * evaluateText：考完后的评语文本
   */
  data: {
    allQuestion: [],
    questionList: [],
    current:0,
    score:0,
    fullScore:100,
    total:20,
    isFinish:false,
    evaluateText:""
  },

  /**
   * 和你参考页面完全一样的洗牌函数，保证行为一致
   */
  shuffle(arr) {
    let newArr = [...arr]
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
    }
    return newArr
  },

  onLoad() {
    this.initQuiz()
  },
  onShow() {
    this.initQuiz()
  },

  /**
   * 初始化试卷：循环抽20题，【每抽一题都单独shuffle一次题库】
   * 并且已经抽走的题目会从候选池移除，不会重复抽到同一题
   */
  initQuiz(){
    // 复制一份候选池，抽走一题就删掉，保证一套卷内题目不重复
    let pool = [...questionBank]
    let pickList = []

    // 循环抽取20题
    for(let i=0;i<20;i++){
      // 重点：每次抽取前都shuffle，和你参考页多次shuffle逻辑一模一样
      const oneGroup = this.shuffle(pool)[0]
      pickList.push(oneGroup[0])
      // 把已经抽到的这一题从候选池删掉，防止同套卷子重复出题
      const delIndex = pool.findIndex(item => item[0].title === oneGroup[0].title)
      pool.splice(delIndex,1)
    }

    this.setData({
      allQuestion: questionBank,
      questionList: pickList,
      current: 0,
      score: 0,
      isFinish: false,
      evaluateText: ""
    })
  },

  /**
   * 选择答案
   * 点击事件，dataset.idx 选中选项下标
   */
  selectAnswer(e){
    const selectIdx = Number(e.currentTarget.dataset.idx)
    const {current, questionList, score} = this.data
    const rightAns = questionList[current].ans
    let newScore = score
    if(selectIdx === rightAns){
      newScore +=5
    }
    // 判断是否最后一题
    if(current >= this.data.total - 1){
      let text = ""
      if(newScore >=90) text = "✅ 梁山百事通！熟读水浒，好汉如数家珍！"
      else if(newScore >=70) text = "👍 不错！你对梁山故事颇为熟悉！"
      else if(newScore >=50) text = "📖 略知一二，可以再多读读水浒故事！"
      else text = "📚 初入梁山，不妨从头品读《水浒传》！"
      this.setData({
        score: newScore,
        isFinish: true,
        evaluateText: text
      })
    }else{
      this.setData({
        current: current + 1,
        score: newScore
      })
    }
  },

  /**
   * 点击音效，和项目统一
   */
  SectionSound(){
    const app = getApp()
    app.playSound("section")
    console.log('播放音效')
  },

  /**
   * 重新答题，再次执行initQuiz，重复上面多次shuffle抽取流程
   */
  restartQuiz(){
    this.initQuiz()
  }
})