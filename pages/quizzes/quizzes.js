Page({
  data: {
    allQuestion: [], //全部40道题库
    questionList: [], //本次抽取20题
    current:0,
    score:0,
    fullScore:100,
    total:20,
    isFinish:false,
    evaluateText:""
  },

  onLoad() {
    this.initQuiz()
  },

  //初始化：加载40题，随机打乱，取前20题
  initQuiz(){
    const all = [
      {title:"《水浒传》的作者是？",opt:["施耐庵","罗贯中"],ans:0},
      {title:"梁山泊的寨主，第一位是谁？",opt:["晁盖","王伦"],ans:1},
      {title:"绰号及时雨的好汉是？",opt:["宋江","卢俊义"],ans:0},
      {title:"豹子头是哪位好汉的绰号？",opt:["林冲","武松"],ans:0},
      {title:"鲁智深的原名叫做？",opt:["鲁达","鲁修"],ans:0},
      {title:"武松打虎的地点是？",opt:["景阳冈","黄泥冈"],ans:0},
      {title:"“智取生辰纲”的领头人是？",opt:["晁盖","吴用"],ans:0},
      {title:"智多星指的是谁？",opt:["吴用","公孙胜"],ans:0},
      {title:"黑旋风是哪位好汉？",opt:["李逵","张飞"],ans:0},
      {title:"梁山一百单八将中第一个出场的是？",opt:["史进","鲁智深"],ans:0},
      {title:"绰号玉麒麟的是？",opt:["卢俊义","林冲"],ans:0},
      {title:"宋江在浔阳楼题写了什么？",opt:["反诗","家书"],ans:0},
      {title:"杨志押送的生辰纲送给谁？",opt:["蔡京","高俅"],ans:0},
      {title:"花和尚鲁智深最后在哪圆寂？",opt:["杭州六和寺","五台山"],ans:0},
      {title:"行者武松，行者代表什么？",opt:["头陀打扮的人","赶路商人"],ans:0},
      {title:"母夜叉是谁？",opt:["孙二娘","顾大嫂"],ans:0},
      {title:"一丈青是哪位女将？",opt:["扈三娘","潘金莲"],ans:0},
      {title:"戴宗的绰号是？",opt:["神行太保","飞天大圣"],ans:0},
      {title:"小李广指的是？",opt:["花荣","杨志"],ans:0},
      {title:"秦明的绰号是？",opt:["霹雳火","急先锋"],ans:0},
      {title:"林冲被谁设计误入白虎堂？",opt:["高俅","高衙内"],ans:0},
      {title:"风雪山神庙是谁的经典故事？",opt:["林冲","鲁智深"],ans:0},
      {title:"倒拔垂杨柳的好汉是？",opt:["鲁智深","李逵"],ans:0},
      {title:"李逵的母亲死在哪里？",opt:["沂岭","梁山"],ans:0},
      {title:"宋江接受招安之后，征讨的第一个大寇是？",opt:["辽国","方腊"],ans:0},
      {title:"梁山聚义大厅最初叫什么？",opt:["聚义厅","忠义堂"],ans:0},
      {title:"宋江将聚义厅改为？",opt:["忠义堂","替天厅"],ans:0},
      {title:"鼓上蚤是谁？",opt:["时迁","段景住"],ans:0},
      {title:"金毛犬段景住的特长是？",opt:["相马","偷盗"],ans:0},
      {title:"浪里白条是谁？",opt:["张顺","张横"],ans:0},
      {title:"宋江的外号孝义黑三郎，黑是因为？",opt:["肤色黝黑","黑衣打扮"],ans:0},
      {title:"武松在鸳鸯楼一共杀了几人？",opt:["十五人","八人"],ans:0},
      {title:"王进是哪位好汉的师父？",opt:["史进","鲁智深"],ans:0},
      {title:"九纹龙史进身上有几条龙纹身？",opt:["九条","五条"],ans:0},
      {title:"公孙胜擅长什么道术？",opt:["呼风唤雨","隐身术"],ans:0},
      {title:"青面兽杨志脸上胎记是什么颜色？",opt:["青褐色","红色"],ans:0},
      {title:"呼延灼的坐骑叫做？",opt:["踏雪乌骓","千里白龙驹"],ans:0},
      {title:"金枪手徐宁的独门兵器是？",opt:["钩镰枪","梨花枪"],ans:0},
      {title:"方腊是被谁活捉？",opt:["鲁智深","武松"],ans:0},
      {title:"梁山好汉排座次，是谁主持的？",opt:["宋江","晁盖"],ans:0}
    ]
    //打乱全部题库
    let shuffleList = this.shuffle(all)
    //取出前20题
    const pick20 = shuffleList.slice(0,20)
    this.setData({
      allQuestion: all,
      questionList: pick20,
      current:0,
      score:0,
      isFinish:false,
      evaluateText:""
    })
  },

  //洗牌函数
  shuffle(arr) {
    let newArr = [...arr]
    for(let i = newArr.length -1; i>0; i--){
      const r = Math.floor(Math.random()*(i+1))
      [newArr[i],newArr[r]] = [newArr[r],newArr[i]]
    }
    return newArr
  },

  //选择答案
  selectAnswer(e){
    const selectIdx = Number(e.currentTarget.dataset.idx)
    const {current, questionList, score} = this.data
    const rightAns = questionList[current].ans
    let newScore = score
    if(selectIdx === rightAns){
      newScore +=5
    }
    //判断是否最后一题
    if(current >= this.data.total -1){
      //根据分数给出水浒评价
      let text = ""
      if(newScore >=90) text = "✅ 梁山百事通！熟读水浒，好汉如数家珍！"
      else if(newScore >=70) text = "👍 不错！你对梁山故事颇为熟悉！"
      else if(newScore >=50) text = "📖 略知一二，可以再多读读水浒故事！"
      else text = "📚 初入梁山，不妨从头品读《水浒传》！"
      this.setData({
        score: newScore,
        isFinish:true,
        evaluateText:text
      })
    }else{
      this.setData({
        current: current+1,
        score: newScore
      })
    }
  },

  //重新答题
  restartQuiz(){
    this.initQuiz()
  }
})