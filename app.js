App({
  globalData: {
    // 本次测试匹配出来的好汉对象
    heroResult: null,
    // 全部好汉静态档案，全局共享
   
    heroList: [
      { name:"宋江", nick:"呼保义", star:"天魁星", ren:78, yi:85, li:82, zhi:76, xin:72,
        imglist:[
          {name:"宋江",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songjiang/sj1.png"},
          
        ],
        sceneList: [
          {
            name: "郓城县衙",
            desc: "郓城县衙之内，宋江身为押司，在此处理文书，结交各路江湖好汉。"
          },
          {
            name: "浔阳楼",
            desc: "浔阳楼上，宋江醉酒题反诗，引来大祸，是命运转折之地。"
          },
          {
            name: "梁山聚义厅",
            desc: "水泊梁山聚义厅，宋江坐头把交椅，号令一百单八将。"
          }
        ]
      },
      { name:"卢俊义", nick:"玉麒麟", star:"天罡星", ren:70, yi:80, li:88, zhi:58, xin:85,
        imglist:[
          {name:"卢俊义",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lujunyi/ljy1.png"},
        ],
        sceneList:[
          {name:"大名府",desc:"大名府卢员外宅院，卢俊义本是河北富商，在此安稳度日，后被吴用设计骗上梁山。"},
          {name:"梁山金沙滩",desc:"金沙滩一战，卢俊义活捉史文恭，为晁盖报仇，奠定梁山第二把交椅。"},
          {name:"泗州淮河",desc:"征方腊班师后，遭奸臣下毒，在淮河舟中落水身亡。"}
        ]
        
      },
      { name:"吴用", nick:"智多星", star:"天机星", ren:55, yi:75, li:88, zhi:92, xin:68,
        imglist:[
          {name:"吴用",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wuyong/wy1.png"},
          
        ],
        sceneList:[
          {name:"黄泥岗",desc:"黄泥冈巧设妙计，智取生辰纲，是吴用名动江湖的经典谋划。"},
          {name:"梁山聚义厅",desc:"梁山军师，坐镇聚义厅谋划大小战事，调度一百单八将。"},
          {name:"蓼儿洼",desc:"宋江被害之后，吴用来到蓼儿洼宋江墓前，自缢殉义。"}
        ]
      },
      { name:"公孙胜", nick:"入云龙", star:"天闲星", ren:85, yi:84, li:85, zhi:90, xin:88,
        imglist:[
          {name:"公孙胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gongsunsheng/gss1.png"},
          
        ],
        sceneList:[
          {name:"七星聚义处",desc:"东溪村七星聚义，公孙胜前来投奔，共谋智取生辰纲。"},
          {name:"高唐州",desc:"高唐州斗法破高廉，以道术大破妖法，助梁山攻破城池。"},
          {name:"二仙山",desc:"平定淮西之后，功成身退，返回二仙山继续修道。"}
        ]
      },
      { name:"关胜", nick:"大刀", star:"天勇星", ren:72, yi:83, li:90, zhi:65, xin:86,
        imglist:[
          {name:"关胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/guansheng/gs1.png"},
          
        ],
        sceneList:[
          {name:"蒲东衙门",desc:"关胜原为蒲东巡检，熟读兵书，善使青龙偃月刀。"},
          {name:"梁山寨外",desc:"领兵征讨梁山，独战林冲、秦明二将，勇武无双。"},
          {name:"征方腊常州",desc:"征方腊时奋勇破敌，得胜后回京受封，后操练军马。"}
        ]
      },
      { name:"林冲", nick:"豹子头", star:"天雄星", ren:76, yi:81, li:84, zhi:70, xin:83,
        imglist:[
          {name:"林冲",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/linchong/lc1.png"},
          
        ],
        sceneList:[
          {name:"白虎堂",desc:"误入白虎节堂，遭高俅陷害，蒙冤刺配沧州。"},
          {name:"山神庙",desc:"风雪山神庙，林冲手刃陆谦，彻底断绝退路。"},
          {name:"梁山断金亭",desc:"雪夜上梁山，火并王伦，助晁盖坐稳梁山头领之位。"}
        ]
      },
      { name:"秦明", nick:"霹雳火", star:"天猛星", ren:62, yi:86, li:70, zhi:52, xin:88,
        imglist:[
          {name:"秦明",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/qinming/qm1.png"},
          
        ],
        sceneList:[
          {name:"青州府",desc:"青州兵马总管，人称霹雳火，性情刚烈，掌中狼牙棒。"},
          {name:"清风山",desc:"宋江巧设苦肉计，迫使秦明全家遇害，无奈归降梁山。"},
          {name:"清溪洞",desc:"征方腊攻打清溪洞，被方腊侄子方杰一刀斩杀。"}
        ]
      },
      { name:"呼延灼", nick:"双鞭", star:"天威星", ren:68, yi:78, li:86, zhi:66, xin:82,
        imglist:[
          {name:"呼延灼",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huyanzhuo/hyz1.png"},
          
        ],
        sceneList:[
          {name:"汝宁府",desc:"开国名将呼延赞后人，汝宁郡都统制，善使双鞭。"},
          {name:"梁山战场",desc:"率领连环马大军征讨梁山，一度把梁山逼入绝境。"},
          {name:"御营",desc:"平定方腊后受封，晚年在御营抗金，为国战死。"}
        ]
      },
      { name:"花荣", nick:"小李广", star:"天英星", ren:74, yi:90, li:80, zhi:75, xin:92,
        imglist:[
          {name:"花荣",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huarong/hr1.png"},
          
        ],
        sceneList:[
          {name:"清风寨",desc:"清风寨武知寨，与宋江交好，大闹清风寨，弃官投奔。"},
          {name:"梁山校场",desc:"梁山射雁，一箭落雁，震慑众好汉，神箭名扬山寨。"},
          {name:"蓼儿洼",desc:"宋江死后，花荣在宋江墓前自缢，追随义兄而去。"}
        ]
      },
      { name:"柴进", nick:"小旋风", star:"天贵星", ren:80, yi:84, li:88, zhi:72, xin:78,
        imglist:[
          {name:"柴进",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/chaijin/cj1.png"},
          
        ],
        sceneList:[
          {name:"沧州柴府",desc:"后周皇室后裔，持有丹书铁券，广纳天下豪杰。"},
          {name:"高唐州大牢",desc:"被高廉陷害打入死牢，梁山发兵攻破高唐州救出柴进。"},
          {name:"方腊皇宫",desc:"征方腊时化名柯引潜入方腊朝中，卧底内应。"}
        ]
      },
      { name:"李应", nick:"扑天雕", star:"天富星", ren:71, yi:76, li:82, zhi:74, xin:80,
        imglist:[
          {name:"李应",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liying/ly1.png"},
          
        ],
        sceneList:[
          {name:"独龙冈李家庄",desc:"李家庄庄主，善使飞刀，原本不想掺和祝、扈、李三庄纷争。"},
          {name:"祝家庄",desc:"为救时迁出兵攻打祝家庄，被祝彪射伤。"},
          {name:"梁山钱粮库",desc:"上梁山总管钱粮，掌管山寨所有粮草物资。"}
        ]
      },
      { name:"朱仝", nick:"美髯公", star:"天满星", ren:86, yi:88, li:85, zhi:68, xin:90,
        imglist:[
          {name:"朱仝",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhutong/zt1.png"},
          
        ],
        sceneList:[
          {name:"郓城县衙",desc:"郓城马兵都头，面如重枣，义薄云天，私放晁盖、宋江。"},
          {name:"沧州府",desc:"被设计发配沧州，看管小衙内，后李逵斧劈小衙内，被逼落草。"},
          {name:"保定府",desc:"征方腊得胜归来，官至保定都统制，善终。"}
        ]
      },
      { name:"鲁智深", nick:"花和尚", star:"天孤星", ren:92, yi:94, li:65, zhi:80, xin:91,
        imglist:[
          {name:"鲁智深",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/luzhishen/lzs1.png"},
          
        ],
        sceneList:[
          {name:"渭州潘家酒楼",desc:"拳打镇关西，为民除害，从此弃官逃亡。"},
          {name:"五台山",desc:"五台山出家为僧，不守清规，大闹文殊院。"},
          {name:"钱塘江六和寺",desc:"征方腊后在六和寺坐化圆寂，顿悟人生。"}
        ]
      },
      { name:"武松", nick:"行者", star:"天伤星", ren:65, yi:87, li:62, zhi:78, xin:84,
        imglist:[
          {name:"武松",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wusong/ws1.png"},
          
        ],
        sceneList:[
          {name:"景阳冈",desc:"景阳冈密林，猛虎出没，武松醉酒打虎名扬天下。"},
          {name:"狮子楼",desc:"狮子楼内，武松斗杀西门庆，为兄长武大郎报仇。"},
          {name:"飞云浦",desc:"飞云浦险境，埋伏重重，武松绝地反杀。"}
        ]
      },
      { name:"董平", nick:"双枪将", star:"天立星", ren:40, yi:65, li:42, zhi:60, xin:58,
        imglist:[
          {name:"董平",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dongping/dp1.png"},
          
        ],
        sceneList:[
          {name:"东平府",desc:"东平府都监，双枪猛将，人称双枪将，心高气傲。"},
          {name:"东平城门",desc:"宋江攻打东平府，董平被俘之后归降梁山。"},
          {name:"独松关",desc:"征方腊独松关，被敌将拦腰砍死。"}
        ]
      },
      { name:"张清", nick:"没羽箭", star:"天捷星", ren:60, yi:72, li:66, zhi:63, xin:76,
        imglist:[
          {name:"张清",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangqing/zq1.png"},
          
        ],
        sceneList:[
          {name:"东昌府",desc:"东昌府守将，善用飞石打人，百发百中，人称没羽箭。"},
          {name:"梁山阵前",desc:"飞石连打梁山十五员大将，威震梁山。"},
          {name:"独松关",desc:"独松关作战，被敌将杀死。"}
        ]
      },
      { name:"杨志", nick:"青面兽", star:"天暗星", ren:70, yi:79, li:83, zhi:64, xin:81,
        imglist:[
          {name:"杨志",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangzhi/yz1.png"},
          
        ],
        sceneList:[
          {name:"汴梁街头",desc:"杨志落魄街头，变卖祖传宝刀，怒杀泼皮牛二。"},
          {name:"黄泥冈",desc:"押送生辰纲，被晁盖等人智取，前途尽毁。"},
          {name:"丹徒县",desc:"征方腊途中，在丹徒患病病故。"}
        ]
      },
      { name:"徐宁", nick:"金枪手", star:"天佑星", ren:73, yi:77, li:81, zhi:61, xin:80,
        imglist:[
          {name:"徐宁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xuning/xn1.png"},
          
        ],
        sceneList:[
          {name:"东京徐府",desc:"东京金枪班教师，祖传钩镰枪法，被时迁盗甲赚上梁山。"},
          {name:"梁山战场",desc:"施展钩镰枪大破呼延灼连环马。"},
          {name:"杭州",desc:"征方腊攻打杭州，中箭重伤不治身亡。"}
        ]
      },
      { name:"索超", nick:"急先锋", star:"天空星", ren:63, yi:82, li:71, zhi:55, xin:83,
        imglist:[
          {name:"索超",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/suochao/sc1.png"},
          
        ],
        sceneList:[
          {name:"大名府校场",desc:"大名府留守司正牌军，急先锋，作战勇猛急躁。"},
          {name:"梁山大战",desc:"大名府之战与杨志斗武，之后被俘归梁山。"},
          {name:"杭州北关",desc:"攻打杭州北关，被石宝流星锤打死。"}
        ]
      },
      { name:"戴宗", nick:"神行太保", star:"天速星", ren:75, yi:83, li:74, zhi:71, xin:86,
        imglist:[
          {name:"戴宗",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/daizong/dz1.png"},
          
        ],
        sceneList:[
          {name:"江州牢城",desc:"江州两院押牢节级，神行法日行八百里。"},
          {name:"梁山各处",desc:"梁山总探声息头领，传递紧急军情。"},
          {name:"泰安州",desc:"平定方腊后辞官，泰安州出家，善终。"}
        ]
      },
      { name:"刘唐", nick:"赤发鬼", star:"天异星", ren:58, yi:84, li:50, zhi:62, xin:82,
        imglist:[
          {name:"刘唐",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liutang/lt1.png"},
          
        ],
        sceneList:[
          {name:"东溪村",desc:"赤发鬼夜奔东溪村，报信晁盖，提议劫生辰纲。"},
          {name:"梁山大战曾头市",desc:"曾头市大战，奋勇厮杀。"},
          {name:"杭州候潮门",desc:"攻打候潮门，被闸门砸死。"}
        ]
      },
      { name:"李逵", nick:"黑旋风", star:"天杀星", ren:35, yi:88, li:30, zhi:28, xin:85,
        imglist:[
          {name:"李逵",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/likui/lk1.png"},
          
        ],
        sceneList:[
          {name:"江州琵琶亭",desc:"江州牢卒，结识宋江，江州劫法场，斧砍官军。"},
          {name:"沂岭",desc:"沂岭杀四虎，为母报仇。"},
          {name:"润州",desc:"宋江喝毒酒，骗李逵一同喝下，毒发身亡。"}
        ]
      },
      { name:"史进", nick:"九纹龙", star:"天微星", ren:72, yi:85, li:73, zhi:60, xin:84,
        imglist:[
          {name:"史进",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shijin/sj1.png"},
          
        ],
        sceneList:[
          {name:"史家庄",desc:"华阴史家庄少庄主，第一个出场梁山好汉，拜师王进。"},
          {name:"少华山",desc:"与少华山好汉结交，官府围剿，烧庄落草。"},
          {name:"昱岭关",desc:"征方腊昱岭关，中箭战死。"}
        ]
      },
      { name:"穆弘", nick:"没遮拦", star:"天究星", ren:61, yi:78, li:65, zhi:64, xin:79,
        imglist:[
          {name:"穆弘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/muhong/mh1.png"},
          
        ],
        sceneList:[
          {name:"揭阳镇",desc:"揭阳镇一霸，穆家庄主，与弟弟穆春称霸当地。"},
          {name:"江州城外",desc:"江州劫法场，带领揭阳弟兄接应宋江。"},
          {name:"杭州",desc:"征方腊，杭州感染瘟疫病死。"}
        ]
      },
      { name:"雷横", nick:"插翅虎", star:"天退星", ren:74, yi:82, li:72, zhi:59, xin:81,
        imglist:[
          {name:"雷横",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/leiheng/lh1.png"},
          
        ],
        sceneList:[
          {name:"郓城县衙",desc:"郓城步军都头，膂力过人，能跳高墙，人称插翅虎。"},
          {name:"勾栏坊",desc:"怒杀白秀英，被判死罪，朱仝放走雷横。"},
          {name:"德清县",desc:"征方腊德清县，战死沙场。"}
        ]
      },
      { name:"李俊", nick:"混江龙", star:"天寿星", ren:76, yi:81, li:75, zhi:88, xin:84,
        imglist:[
          {name:"李俊",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lijun/lj1.png"},
          
        ],
        sceneList:[
          {name:"浔阳江",desc:"浔阳江艄公，混江龙，揭阳三霸之首，多次救下宋江。"},
          {name:"梁山水寨",desc:"梁山水军大头领，统领四寨水军。"},
          {name:"苏州",desc:"征方腊后诈病，携童威童猛出海，远赴暹罗。"}
        ]
      },
      { name:"阮小二", nick:"立地太岁", star:"天剑星", ren:64, yi:83, li:58, zhi:67, xin:83,
        imglist:[
          {name:"阮小二",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaoer/rxe1.png"},
          
        ],
        sceneList:[
          {name:"石碣村",desc:"石碣村渔民，阮氏三雄之长，水性极强。"},
          {name:"黄泥冈",desc:"参与智取生辰纲，石碣村水战大败官军。"},
          {name:"乌龙岭水寨",desc:"乌龙岭水战，被敌军围困，自刎而死。"}
        ]
      },
      { name:"张横", nick:"船火儿", star:"天平星", ren:57, yi:79, li:55, zhi:66, xin:77,
        imglist:[
          {name:"张横",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangheng/zh1.png"},
          
        ],
        sceneList:[
          {name:"浔阳江渡口",desc:"浔阳江船伙，船火儿，江上杀人劫财。"},
          {name:"江州江面",desc:"江上拦截宋江，后成为梁山水军头领。"},
          {name:"杭州",desc:"征方腊杭州，感染瘟疫病故。"}
        ]
      },
      { name:"阮小五", nick:"短命二郎", star:"天罪星", ren:60, yi:81, li:54, zhi:65, xin:80,
        imglist:[
          {name:"阮小五",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaowu/rxw1.png"},
          
        ],
        sceneList:[
          {name:"石碣村湖面",desc:"石碣村渔民，短命二郎，水上身手矫健。"},
          {name:"梁山水战",desc:"多次随水军出击，冲锋在前。"},
          {name:"清溪县",desc:"攻打清溪，被娄丞相杀死。"}
        ]
      },
      { name:"张顺", nick:"浪里白条", star:"天损星", ren:70, yi:84, li:63, zhi:74, xin:85,
        imglist:[
          {name:"张顺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangshun/zs1.png"},
          
        ],
        sceneList:[
          {name:"浔阳江",desc:"浪里白条，水底可潜伏七日，浔阳江与李逵水中争斗。"},
          {name:"涌金门",desc:"杭州涌金门，潜水入城，被乱箭射杀。"},
          {name:"西湖水底",desc:"死后魂魄附身，斩杀方腊大将方天定。"}
        ]
      },
      { name:"阮小七", nick:"活阎罗", star:"天败星", ren:62, yi:82, li:52, zhi:69, xin:81,
        imglist:[
          {name:"阮小七",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaoqi/rxq1.png"},
          
        ],
        sceneList:[
          {name:"石碣村",desc:"活阎罗，阮氏三雄最小，性格洒脱不羁。"},
          {name:"方腊皇宫",desc:"攻入方腊皇宫，戏穿方腊龙袍。"},
          {name:"石碣村旧居",desc:"得胜回朝，因穿龙袍被削官，回乡打鱼善终。"}
        ]
      },
      { name:"杨雄", nick:"病关索", star:"天牢星", ren:66, yi:76, li:68, zhi:56, xin:75,
        imglist:[
          {name:"杨雄",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangxiong/yx1.png"},
          
        ],
        sceneList:[
          {name:"蓟州府",desc:"蓟州两院押狱，病关索，结识石秀。"},
          {name:"翠屏山",desc:"翠屏山，与石秀杀死潘巧云。"},
          {name:"杭州",desc:"征方腊杭州，瘟疫病死。"}
        ]
      },
      { name:"石秀", nick:"拼命三郎", star:"天慧星", ren:68, yi:86, li:64, zhi:82, xin:87,
        imglist:[
          {name:"石秀",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shixiu/sx1.png"},
          
        ],
        sceneList:[
          {name:"蓟州街头",desc:"拼命三郎，流落蓟州，见义勇为救下杨雄。"},
          {name:"祝家庄",desc:"潜入祝家庄做卧底，探查敌情。"},
          {name:"昱岭关",desc:"昱岭关中箭，被乱箭射死。"}
        ]
      },
      { name:"解珍", nick:"两头蛇", star:"天暴星", ren:69, yi:80, li:61, zhi:57, xin:82,
        imglist:[
          {name:"解珍",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiezhen/xz1.png"},
          
        ],
        sceneList:[
          {name:"登州深山",desc:"登州猎户，两头蛇，兄弟二人擅长翻山捕兽。"},
          {name:"登州大牢",desc:"遭毛太公陷害入狱，孙立等人劫牢反狱。"},
          {name:"乌龙岭",desc:"乌龙岭攀崖，被敌军发现，坠崖身死。"}
        ]
      },
      { name:"解宝", nick:"双尾蝎", star:"天哭星", ren:68, yi:81, li:60, zhi:59, xin:83,
        imglist:[
          {name:"解宝",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiebao/xb1.png"},
          
        ],
        sceneList:[
          {name:"登州山林",desc:"登州猎户，双尾蝎，解珍之弟。"},
          {name:"登州牢狱",desc:"兄弟蒙冤，登州劫牢，投奔梁山。"},
          {name:"乌龙岭",desc:"乌龙岭山崖，被乱石砸死。"}
        ]
      },
      { name:"燕青", nick:"浪子", star:"天巧星", ren:84, yi:89, li:91, zhi:93, xin:90,
        imglist:[
          {name:"燕青",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanqing/yq1.png"},
          
        ],
        sceneList:[
          {name:"大名府卢府",desc:"卢俊义家仆，浪子燕青，精通相扑、弩箭。"},
          {name:"泰安州擂台",desc:"泰安州打擂，扑倒擎天柱任原。"},
          {name:"梁山水边",desc:"平定方腊，辞别卢俊义，隐于江湖不知所踪。"}
        ]
      },
      { name:"朱武", nick:"神机军师", star:"地魁星", ren:85, yi:75, li:80, zhi:77, xin:83,
        imglist:[
          {name:"朱武",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhuwu/zw1.png"},
          
        ],
        sceneList:[
          {name:"少华山",desc:"少华山寨主，地魁星，精通阵法，神机军师。"},
          {name:"史家庄外",desc:"设计救史进，之后一同上梁山。"},
          {name:"玉田县",desc:"征方腊结束，辞官入山修道，善终。"}
        ]
      },
      { name:"黄信", nick:"镇三山", star:"地煞星", ren:64, yi:73, li:76, zhi:58, xin:75,
        imglist:[
          {name:"黄信",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huangxin/hx1.png"},
          
        ],
        sceneList:[
          {name:"青州府",desc:"青州都监，镇三山，曾扬言要扫平三山贼寇。"},
          {name:"清风山",desc:"奉命征讨清风山，被好汉围困归降。"},
          {name:"青州",desc:"征方腊归来，官复原职，善终。"}
        ]
      },
      { name:"孙立", nick:"病尉迟", star:"地勇星", ren:67, yi:77, li:80, zhi:84, xin:76,
        imglist:[
          {name:"孙立",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunli/sl1.png"},
          
        ],
        sceneList:[
          {name:"登州府",desc:"登州兵马提辖，病尉迟，善使钢鞭。"},
          {name:"祝家庄",desc:"假装投奔祝家庄，卧底破祝家庄。"},
          {name:"登州故里",desc:"征方腊平安归来，回登州做官善终。"}
        ]
      },
      { name:"宣赞", nick:"丑郡马", star:"地杰星", ren:66, yi:74, li:77, zhi:57, xin:78,
        imglist:[
          {name:"宣赞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xuanzan/xz1.png"},
          
        ],
        sceneList:[
          {name:"东京衙门",desc:"东京衙门防御使，丑郡马，武艺不俗。"},
          {name:"关胜军中",desc:"举荐关胜领兵攻打梁山，一同被俘归降。"},
          {name:"苏州",desc:"征方腊攻打苏州，战死。"}
        ]
      },
      { name:"郝思文", nick:"井木犴", star:"地雄星", ren:65, yi:75, li:75, zhi:56, xin:77,
        imglist:[
          {name:"郝思文",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/haosiwen/hsw1.png"},
         
        ],
        sceneList:[
          {name:"蒲东",desc:"关胜副将，井木犴，和关胜、宣赞一同出征梁山。"},
          {name:"梁山阵前",desc:"随关胜大战梁山，兵败被俘。"},
          {name:"杭州",desc:"杭州城外被活捉，斩首。"}
        ]
      },
      { name:"韩滔", nick:"百胜将", star:"地威星", ren:63, yi:74, li:74, zhi:55, xin:76,
        imglist:[
          {name:"韩滔",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/hantao/ht1.png"},
          
        ],
        sceneList:[
          {name:"陈州",desc:"陈州团练使，百胜将，呼延灼副将。"},
          {name:"梁山战场",desc:"跟随呼延灼率领连环马攻打梁山。"},
          {name:"常州",desc:"征方腊常州，被冷箭射杀。"}
        ]
      },
      { name:"彭玘", nick:"天目将", star:"地英星", ren:64, yi:73, li:75, zhi:54, xin:76,
        imglist:[
          {name:"彭玘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/pengqi/pq1.png"},
          
        ],
        sceneList:[
          {name:"颍州",desc:"颍州团练使，天目将，呼延灼副将。"},
          {name:"梁山对阵",desc:"随连环马出征，被俘归顺梁山。"},
          {name:"常州",desc:"常州被敌将斩杀。"}
        ]
      },
      { name:"单廷圭", nick:"圣水将", star:"地奇星", ren:62, yi:72, li:74, zhi:53, xin:75,
        imglist:[
          {name:"单廷圭",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shanyangui/syg1.png"},
         
        ],
        sceneList:[
          {name:"凌州",desc:"凌州团练使，圣水将，善用水浸兵之法。"},
          {name:"凌州城外",desc:"领兵征梁山，被关胜打败归降。"},
          {name:"歙州",desc:"征方腊歙州，战死。"}
        ]
      },
      { name:"魏定国", nick:"神火将", star:"地猛星", ren:61, yi:72, li:73, zhi:52, xin:74,
        imglist:[
          {name:"魏定国",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/weidingguo/wdg1.png"},
          
        ],
        sceneList:[
          {name:"凌州",desc:"凌州团练使，神火将，擅长火攻战法。"},
          {name:"凌州大战",desc:"与单廷圭一同征讨梁山，兵败归降。"},
          {name:"歙州",desc:"歙州作战阵亡。"}
        ]
      },
      { name:"萧让", nick:"圣手书生", star:"地文星", ren:72, yi:74, li:80, zhi:76, xin:81,
        imglist:[
          {name:"萧让",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiaorang/xr1.png"},
          
        ],
        sceneList:[
          {name:"济州城内",desc:"济州秀才，圣手书生，善仿各家书法。"},
          {name:"梁山帐内",desc:"伪造蔡京书信，营救宋江。"},
          {name:"蔡京府",desc:"征方腊前被蔡京截留，留在府中做门客，善终。"}
        ]
      },
      { name:"裴宣", nick:"铁面孔目", star:"地正星", ren:86, yi:82, li:90, zhi:88, xin:92,
        imglist:[
          {name:"裴宣",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/peixuan/px1.png"},
          
        ],
        sceneList:[
          {name:"饮马川",desc:"饮马川寨主，铁面孔目，掌管梁山军法。"},
          {name:"山寨公堂",desc:"梁山断案量刑，赏罚分明。"},
          {name:"饮马川",desc:"平定方腊后回饮马川隐居。"}
        ]
      },
      { name:"欧鹏", nick:"摩云金翅", star:"地阔星", ren:70, yi:79, li:77, zhi:75, xin:84,
        imglist:[
          {name:"欧鹏",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/oupeng/op1.png"},
          
        ],
        sceneList:[
          {name:"黄门山",desc:"黄门山寨主，摩云金翅，原本是守把军将。"},
          {name:"祝家庄之战",desc:"祝家庄一战奋力厮杀。"},
          {name:"歙州",desc:"歙州被庞万春一箭射死。"}
        ]
      },
      { name:"邓飞", nick:"火眼狻猊", star:"地阖星", ren:63, yi:81, li:62, zhi:66, xin:82,
        imglist:[
          {name:"邓飞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dengfei/df1.png"},
          
        ],
        sceneList:[
          {name:"饮马川",desc:"饮马川二寨主，火眼狻猊，善使铁链。"},
          {name:"祝家庄",desc:"祝家庄救欧鹏，奋勇冲锋。"},
          {name:"杭州",desc:"杭州被石宝一刀砍死。"}
        ]
      },
      { name:"燕顺", nick:"锦毛虎", star:"地强星", ren:60, yi:82, li:55, zhi:61, xin:83,
        imglist:[
          {name:"燕顺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanshun/ys1.png"},
          
        ],
        sceneList:[
          {name:"清风山",desc:"清风山大寨主，锦毛虎，原为羊马贩子。"},
          {name:"清风山聚义",desc:"救下宋江，之后跟随宋江投奔梁山。"},
          {name:"乌龙岭",desc:"乌龙岭战死。"}
        ]
      },
      { name:"杨林", nick:"锦豹子", star:"地暗星", ren:65, yi:78, li:63, zhi:79, xin:80,
        imglist:[
          {name:"杨林",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanglin/yl1.png"},
          
        ],
        sceneList:[
          {name:"蓟州道路",desc:"锦豹子，江湖游走，受公孙胜引荐投奔梁山。"},
          {name:"祝家庄",desc:"扮作探哨潜入祝家庄侦查。"},
          {name:"饮马川",desc:"征方腊生还，回饮马川隐居。"}
        ]
      },
      { name:"凌振", nick:"轰天雷", star:"地轴星", ren:67, yi:74, li:71, zhi:78, xin:79,
        imglist:[
          {name:"凌振",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lingzhen/lz1.png"},
          
        ],
        sceneList:[
          {name:"东京火药局",desc:"东京炮手，轰天雷，大宋唯一火炮专家。"},
          {name:"梁山阵前",desc:"火炮轰击梁山营寨，被俘归顺。"},
          {name:"火药营",desc:"平定方腊后，回到朝廷火药局任职。"}
        ]
      },
      { name:"蒋敬", nick:"神算子", star:"地会星", ren:69, yi:76, li:70, zhi:84, xin:83,
        imglist:[
          {name:"蒋敬",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jiangjing/jj1.png"},
          
        ],
        sceneList:[
          {name:"黄门山",desc:"黄门山好汉，神算子，精通算术账册。"},
          {name:"梁山库房",desc:"掌管山寨钱粮核算。"},
          {name:"潭州",desc:"平定方腊，辞官回潭州为民。"}
        ]
      },
      { name:"吕方", nick:"小温侯", star:"地佐星", ren:63, yi:77, li:68, zhi:61, xin:78,
        imglist:[
          {name:"吕方",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lvfang/lf1.png"},
          
        ],
        sceneList:[
          {name:"对影山",desc:"对影山寨主，小温侯，手持方天画戟。"},
          {name:"对影山争斗",desc:"与郭盛比武，遇宋江，归顺梁山。"},
          {name:"乌龙岭",desc:"乌龙岭坠崖身亡。"}
        ]
      },
      { name:"郭盛", nick:"赛仁贵", star:"地佑星", ren:64, yi:77, li:67, zhi:60, xin:78,
        imglist:[
          {name:"郭盛",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/guosheng/gs1.png"},
          
        ],
        sceneList:[
          {name:"对影山",desc:"赛仁贵，戟法精湛，和吕方争夺山寨。"},
          {name:"梁山中军",desc:"宋江贴身护卫，守护中军。"},
          {name:"乌龙岭",desc:"乌龙岭被巨石砸死。"}
        ]
      },
      { name:"安道全", nick:"神医", star:"地灵星", ren:85, yi:76, li:81, zhi:79, xin:82,
        imglist:[
          {name:"安道全",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/andaoquan/adq1.png"},
          
        ],
        sceneList:[
          {name:"建康府",desc:"建康名医，神医安道全，医术高明。"},
          {name:"梁山军营",desc:"医治宋江背疽，救治伤病好汉。"},
          {name:"皇宫",desc:"征方腊途中被召回皇宫做御医，善终。"}
        ]
      },
      { name:"皇甫端", nick:"紫髯伯", star:"地兽星", ren:82, yi:75, li:80, zhi:77, xin:83,
        imglist:[
          {name:"皇甫端",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huangfuduan/hfd1.png"},
          
        ],
        sceneList:[
          {name:"东昌府",desc:"东昌兽医，紫髯伯，相马医马天下一绝。"},
          {name:"梁山马场",desc:"照料梁山所有战马。"},
          {name:"御马监",desc:"征方腊前被朝廷留用，掌管御马。"}
        ]
      },
      { name:"王英", nick:"矮脚虎", star:"地微星", ren:42, yi:74, li:38, zhi:53, xin:67,
        imglist:[
          {name:"王英",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wangying/wy1.png"},
          
        ],
        sceneList:[
          {name:"清风山",desc:"清风山二寨主，矮脚虎，好色，善使短刀。"},
          {name:"祝家庄",desc:"战场上被扈三娘活捉，后娶扈三娘。"},
          {name:"睦州",desc:"征方腊睦州，被郑彪杀死。"}
        ]
      },
      { name:"扈三娘", nick:"一丈青", star:"地慧星", ren:67, yi:75, li:78, zhi:62, xin:80,
        imglist:[
          {name:"扈三娘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/husanniang/hsn1.png"},
          
        ],
        sceneList:[
          {name:"扈家庄",desc:"扈家庄大小姐，一丈青，善使日月双刀。"},
          {name:"祝家庄战场",desc:"生擒王英，大战梁山众将。"},
          {name:"睦州",desc:"为报夫仇，被郑彪金砖砸死。"}
        ]
      },
      { name:"鲍旭", nick:"丧门神", star:"地暴星", ren:44, yi:73, li:46, zhi:54, xin:74,
        imglist:[
          {name:"鲍旭",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/baoxu/bx1.png"},
         
        ],
        sceneList:[
          {name:"枯树山",desc:"枯树山寨主，丧门神，凶狠善战。"},
          {name:"梁山步军",desc:"李逵副手，冲锋陷阵。"},
          {name:"杭州",desc:"杭州被石宝砍死。"}
        ]
      },
      { name:"樊瑞", nick:"混世魔王", star:"地然星", ren:65, yi:76, li:60, zhi:78, xin:77,
        imglist:[
          {name:"樊瑞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/fanrui/fr1.png"},
          
        ],
        sceneList:[
          {name:"芒砀山",desc:"芒砀山寨主，混世魔王，会法术。"},
          {name:"芒砀山前",desc:"扬言要吞并梁山，战败归顺。"},
          {name:"出家学道",desc:"征方腊之后拜公孙胜为师修道，善终。"}
        ]
      },
      { name:"孔明", nick:"毛头星", star:"地猖星", ren:62, yi:77, li:56, zhi:57, xin:78,
        imglist:[
          {name:"孔明",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/kongming/km1.png"},
          
        ],
        sceneList:[
          {name:"白虎山",desc:"白虎山大寨主，毛头星，孔家庄子弟。"},
          {name:"孔家庄",desc:"宋江徒弟，随宋江学习武艺。"},
          {name:"杭州",desc:"征方腊杭州，瘟疫病死。"}
        ]
      },
      { name:"孔亮", nick:"独火星", star:"地狂星", ren:61, yi:76, li:55, zhi:56, xin:77,
        imglist:[
          {name:"孔亮",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/kongliang/kl1.png"},
          
        ],
        sceneList:[
          {name:"白虎山",desc:"独火星，孔明之弟，孔家二公子。"},
          {name:"青州城外",desc:"白虎山聚义，攻打青州。"},
          {name:"昆山",desc:"征方腊昆山，落水淹死。"}
        ]
      },
      { name:"项充", nick:"八臂哪吒", star:"地飞星", ren:51, yi:76, li:50, zhi:63, xin:77,
        imglist:[
          {name:"项充",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiangchong/xc1.png"},
          
        ],
        sceneList:[
          {name:"芒砀山",desc:"八臂哪吒，樊瑞副将，善用飞刀盾牌。"},
          {name:"芒砀山对阵",desc:"和李衮掩护樊瑞作战。"},
          {name:"睦州",desc:"睦州战场，落马被乱刀砍死。"}
        ]
      },
      { name:"李衮", nick:"飞天大圣", star:"地走星", ren:50, yi:76, li:49, zhi:62, xin:77,
        imglist:[
          {name:"李衮",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ligun/lg1.png"},
          
        ],
        sceneList:[
          {name:"芒砀山",desc:"飞天大圣，樊瑞副将，善使标枪。"},
          {name:"阵前突击",desc:"与项充一同步战冲杀。"},
          {name:"睦州",desc:"睦州失足落水，被敌军杀死。"}
        ]
      },
      { name:"金大坚", nick:"玉臂匠", star:"地巧星", ren:74, yi:73, li:79, zhi:75, xin:82,
        imglist:[
          {name:"金大坚",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jindajian/jdj1.png"},
          
        ],
        sceneList:[
          {name:"济州城",desc:"济州工匠，玉臂匠，篆刻刻章天下无双。"},
          {name:"梁山营中",desc:"雕刻兵符印信，伪造印章。"},
          {name:"朝廷内府",desc:"征方腊前被朝廷留在内府，善终。"}
        ]
    
      },
      { name:"马麟", nick:"铁笛仙", star:"地明星", ren:64, yi:77, li:60, zhi:67, xin:78,
        imglist:[
          {name:"马麟",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/malin/ml1.png"},
          
        ],
        sceneList:[
          {name:"黄门山",desc:"黄门山好汉，铁笛仙，会吹铁笛，双刀作战。"},
          {name:"祝家庄",desc:"祝家庄大战，奋力接应队伍。"},
          {name:"乌龙岭",desc:"乌龙岭被白钦斩杀。"}
        ]
      },
      { name:"童威", nick:"出洞蛟", star:"地进星", ren:64, yi:83, li:53, zhi:65, xin:84,
        imglist:[
          {name:"童威",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tongwei/tw1.png"},
          
        ],
        sceneList:[
          {name:"浔阳江",desc:"浔阳江私盐贩子，出洞蛟，李俊心腹。"},
          {name:"梁山水寨",desc:"水军头领，水上侦查偷袭。"},
          {name:"苏州港口",desc:"征方腊后随李俊、童猛出海远赴暹罗。"}
        ]
      },
      { name:"童猛", nick:"翻江蜃", star:"地退星", ren:65, yi:84, li:54, zhi:66, xin:85,
        imglist:[
          {name:"童猛",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tongmeng/tm1.png"},
          
        ],
        sceneList:[
          {name:"浔阳江江面",desc:"翻江蜃，童威弟弟，水性卓绝，追随李俊。"},
          {name:"水寨夜袭",desc:"水下潜行，夜袭敌船，切断缆绳。"},
          {name:"太仓港",desc:"苏州诈病留下，自太仓港出海去往暹罗。"}
        ]
      },
      { name:"孟康", nick:"玉幡竿", star:"地满星", ren:60, yi:75, li:58, zhi:70, xin:76,
        imglist:[
          {name:"孟康",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/mengkang/mk1.png"},
          
        ],
        sceneList:[
          {name:"饮马川",desc:"玉幡竿，造船工匠，因监造大船获罪落草饮马川。"},
          {name:"梁山船厂",desc:"督造梁山大小战船，打造水军船只。"},
          {name:"乌龙岭江面",desc:"乌龙岭水战，被火炮炸死。"}
        ]
      },
      { name:"侯健", nick:"通臂猿", star:"地遂星", ren:63, yi:74, li:57, zhi:73, xin:75,
        imglist:[
          {name:"侯健",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/houjian/hj1.png"},
          
        ],
        sceneList:[
          {name:"江州",desc:"通臂猿，裁缝出身，善做旌旗铠甲衣物。"},
          {name:"无为军",desc:"协助宋江攻破无为军，杀黄文炳。"},
          {name:"钱塘江",desc:"征方腊乘船落水，淹死海中。"}
        ]
      },
      { name:"陈达", nick:"跳涧虎", star:"地周星", ren:62, yi:78, li:59, zhi:58, xin:79,
        imglist:[
          {name:"陈达",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/chenda/cd1.png"},
          
        ],
        sceneList:[
          {name:"少华山",desc:"少华山二寨主，跳涧虎，善使长枪。"},
          {name:"史家庄",desc:"带兵攻打史家庄，被史进活捉。"},
          {name:"昱岭关",desc:"昱岭关被乱箭射死。"}
        ]
      },
    { name:"杨春", nick:"白花蛇", star:"地隐星", ren:61, yi:77, li:58, zhi:57, xin:78,
      imglist:[
        {name:"杨春",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangchun/yc1.png"},
       
      ],
      sceneList:[
        {name:"少华山",desc:"少华山三寨主，白花蛇，擅长步战。"},
        {name:"少华山聚义",desc:"同朱武、陈达占据少华山。"},
        {name:"昱岭关",desc:"昱岭关中箭阵亡。"}
      ]
    },
    { name:"郑天寿", nick:"白面郎君", star:"地异星", ren:62, yi:76, li:57, zhi:56, xin:77,
      imglist:[
        {name:"郑天寿",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhengtianshou/zts1.png"},
        
      ],
      sceneList:[
        {name:"清风山",desc:"清风山三寨主，白面郎君，银枪好手。"},
        {name:"清风山",desc:"清风山聚义，随宋江投奔梁山。"},
        {name:"宣州",desc:"征方腊攻打宣州，被城上磨盘砸死。"}
      ]
    },
    { name:"陶宗旺", nick:"九尾龟", star:"地理星", ren:68, yi:78, li:63, zhi:64, xin:81,
      imglist:[
        {name:"陶宗旺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/taozongwang/tzw1.png"},
        
      ],
      sceneList:[
        {name:"黄门山",desc:"九尾龟，田户出身，精通土木工程。"},
        {name:"梁山基建",desc:"修筑梁山寨墙、码头，开山筑城。"},
        {name:"润州",desc:"征方腊润州，第一个战死的梁山好汉。"}
      ]
    },
    { name:"宋清", nick:"铁扇子", star:"地俊星", ren:66, yi:75, li:72, zhi:60, xin:76,
      imglist:[
        {name:"宋清",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songqing/sq1.png"},
        
      ],
      sceneList:[
        {name:"宋家庄",desc:"铁扇子，宋江亲弟弟，不擅长武艺。"},
        {name:"梁山宴席厅",desc:"主管梁山酒席宴会安排。"},
        {name:"郓城宋家庄",desc:"平定方腊，回乡务农，善终。"}
      ]
    },
    { name:"乐和", nick:"铁叫子", star:"地乐星", ren:71, yi:83, li:75, zhi:85, xin:84,
      imglist:[
        {name:"乐和",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yuehe/yh1.png"},
        
      ],
      sceneList:[
        {name:"登州牢城",desc:"铁叫子，牢中小吏，歌喉动听，文武兼备。"},
        {name:"登州大牢",desc:"传递消息，协助孙立登州劫牢。"},
        {name:"王都尉府",desc:"征方腊前被王都尉留用，善终。"}
      ]
    },
    { name:"穆春", nick:"小遮拦", star:"地镇星", ren:59, yi:75, li:56, zhi:58, xin:76,
      imglist:[
        {name:"穆春",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/muchun/mc1.png"},
        
      ],
      sceneList:[
        {name:"揭阳镇",desc:"小遮拦，穆弘弟弟，揭阳当地豪强。"},
        {name:"揭阳镇街头",desc:"街头欺压外乡人，后跟随兄长上梁山。"},
        {name:"揭阳镇",desc:"征方腊生还，回乡做百姓。"}
      ]
    },
    { name:"曹正", nick:"操刀鬼", star:"地羁星", ren:64, yi:79, li:61, zhi:74, xin:81,
      imglist:[
        {name:"曹正",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caozheng/cz1.png"},
        
      ],
      sceneList:[
        {name:"二龙山",desc:"操刀鬼，林冲徒弟，开酒店杀猪屠户。"},
        {name:"二龙山宝珠寺",desc:"献计帮助鲁智深、杨志夺取二龙山。"},
        {name:"宣州",desc:"征方腊宣州，中箭战死。"}
      ]
    },
    { name:"宋万", nick:"云里金刚", star:"地魔星", ren:62, yi:76, li:54, zhi:55, xin:77,
      imglist:[
        {name:"宋万",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songwan/sw1.png"},
        
      ],
      sceneList:[
        {name:"梁山旧寨",desc:"云里金刚，梁山早期元老，王伦时代头领。"},
        {name:"梁山聚义",desc:"见证梁山从初创到一百单八将聚齐。"},
        {name:"润州",desc:"征方腊润州，乱军之中阵亡。"}
      ]
    },
    { name:"杜迁", nick:"摸着天", star:"地妖星", ren:61, yi:75, li:53, zhi:54, xin:76,
      imglist:[
        {name:"杜迁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duqian/dq1.png"},
        
      ],
      sceneList:[
        {name:"梁山山寨",desc:"摸着天，梁山最早的头领之一，跟随王伦。"},
        {name:"聚义厅",desc:"历经王伦、晁盖、宋江三任寨主。"},
        {name:"清溪县",desc:"攻打清溪，战死沙场。"}
      ]
    },
    { name:"薛永", nick:"病大虫", star:"地幽星", ren:65, yi:80, li:60, zhi:63, xin:79,
      imglist:[
        {name:"薛永",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xueyong/xy1.png"},
        
      ],
      sceneList:[
        {name:"江州街头",desc:"病大虫，江湖卖艺武师，结识宋江。"},
        {name:"江州劫法场",desc:"参与营救宋江，一同上梁山。"},
        {name:"昱岭关",desc:"昱岭关被乱箭射杀。"}
      ]
    },
    { name:"施恩", nick:"金眼彪", star:"地伏星", ren:63, yi:81, li:58, zhi:67, xin:82,
      imglist:[
        {name:"施恩",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shien/se1.png"},
        
      ],
      sceneList:[
        {name:"孟州快活林",desc:"金眼彪，孟州小管营，快活林店主。"},
        {name:"孟州牢狱",desc:"求助武松，夺回快活林酒店。"},
        {name:"常熟",desc:"征方腊常熟，落水淹死。"}
      ]
    },
    { name:"李忠", nick:"打虎将", star:"地僻星", ren:59, yi:76, li:55, zhi:52, xin:74,
      imglist:[
        {name:"李忠",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lizhong/lz1.png"},
        
      ],
      sceneList:[
        {name:"桃花山",desc:"打虎将，桃花山寨主，江湖卖药武师。"},
        {name:"渭州街头",desc:"教史进武艺，结识鲁智深。"},
        {name:"昱岭关",desc:"昱岭关中箭阵亡。"}
      ]
    },
    { name:"周通", nick:"小霸王", star:"地空星", ren:54, yi:72, li:47, zhi:51, xin:70,
      imglist:[
        {name:"周通",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhoutong/zt1.png"},
        
      ],
      sceneList:[
        {name:"桃花山",desc:"小霸王，桃花山二寨主，强娶刘太公女儿。"},
        {name:"刘太公庄院",desc:"娶亲被鲁智深痛打一顿。"},
        {name:"独松关",desc:"独松关战死。"}
      ]
    },
    { name:"汤隆", nick:"金钱豹子", star:"地孤星", ren:48, yi:74, li:51, zhi:79, xin:66,
      imglist:[
        {name:"汤隆",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tanglong/tl1.png"},
        
      ],
      sceneList:[
        {name:"铁匠铺",desc:"金钱豹子，铁匠，打造兵器甲胄。"},
        {name:"徐宁家中",desc:"献计，让时迁盗取徐宁宝甲赚徐宁上山。"},
        {name:"清溪县",desc:"征方腊清溪重伤，不治身亡。"}
      ]
    },
    { name:"杜兴", nick:"鬼脸儿", star:"地全星", ren:70, yi:83, li:76, zhi:81, xin:86,
      imglist:[
        {name:"杜兴",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duxing/dx1.png"},
        
      ],
      sceneList:[
        {name:"独龙冈李家庄",desc:"鬼脸儿，李应管家，口齿伶俐。"},
        {name:"祝家庄交涉",desc:"替李应和祝家庄交涉，引发冲突。"},
        {name:"李家庄",desc:"征方腊后跟随李应回乡，善终。"}
      ]
    },
    { name:"邹渊", nick:"出林龙", star:"地短星", ren:60, yi:79, li:56, zhi:62, xin:80,
      imglist:[
        {name:"邹渊",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zouyuan/zy1.png"},
        
      ],
      sceneList:[
        {name:"登云州登云山",desc:"出林龙，邹润叔父，登云山好汉。"},
        {name:"登州牢狱",desc:"参与登州劫牢，救出解珍解宝。"},
        {name:"清溪县",desc:"征方腊清溪战死。"}
      ]
    },
    { name:"邹润", nick:"独角龙", star:"地角星", ren:61, yi:78, li:54, zhi:60, xin:79,
      imglist:[
        {name:"邹润",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zourun/zr1.png"},
        
      ],
      sceneList:[
        {name:"登云山",desc:"独角龙，邹渊侄子，头上生肉瘤，擅长撞人。"},
        {name:"登州劫牢",desc:"跟随孙立一伙反出登州投奔梁山。"},
        {name:"登云山",desc:"平定方腊，返回登云山隐居。"}
      ]
    },
    { name:"朱贵", nick:"旱地忽律", star:"地囚星", ren:63, yi:80, li:58, zhi:82, xin:84,
      imglist:[
        {name:"朱贵",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhugui/zg1.png"},
        
      ],
      sceneList:[
        {name:"梁山酒店",desc:"旱地忽律，梁山最早的情报酒店店主。"},
        {name:"水泊岸边酒店",desc:"酒店为据点，打探江湖消息，接引好汉。"},
        {name:"杭州",desc:"征方腊杭州，感染瘟疫病故。"}
      ]
    },
    { name:"朱富", nick:"笑面虎", star:"地藏星", ren:66, yi:81, li:62, zhi:76, xin:82,
      imglist:[
        {name:"朱富",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhufu/zf1.png"},
        
      ],
      sceneList:[
        {name:"沂水县",desc:"笑面虎，朱贵弟弟，沂水酒肆老板。"},
        {name:"沂水县大牢",desc:"用药麻翻押送官差，救出李逵。"},
        {name:"杭州",desc:"杭州瘟疫病死。"}
      ]
    },
    { name:"蔡福", nick:"铁臂膊", star:"地平星", ren:59, yi:76, li:64, zhi:72, xin:75,
      imglist:[
        {name:"蔡福",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caifu/cf1.png"},
        
      ],
      sceneList:[
        {name:"大名府死牢",desc:"铁臂膊，大名府两院押牢刽子手。"},
        {name:"大名府刑场",desc:"看管卢俊义，收受钱财保全卢俊义性命。"},
        {name:"清溪县",desc:"征方腊清溪重伤而死。"}
      ]
    },
    { name:"蔡庆", nick:"一枝花", star:"地损星", ren:60, yi:75, li:63, zhi:70, xin:76,
      imglist:[
        {name:"蔡庆",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caiqing/cq1.png"},
        
      ],
      sceneList:[
        {name:"大名府牢狱",desc:"一枝花，蔡福弟弟，大名府刽子手。"},
        {name:"大名府大牢",desc:"和兄长蔡福一同管理囚犯。"},
        {name:"清溪县",desc:"清溪战场重伤身亡。"}
      ]
    },
    { name:"李立", nick:"催命判官", star:"地奴星", ren:46, yi:74, li:50, zhi:68, xin:72,
      imglist:[
        {name:"李立",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lili/ll1.png"},
        
      ],
      sceneList:[
        {name:"揭阳岭酒店",desc:"催命判官，揭阳岭黑店店主，杀人劫财。"},
        {name:"揭阳岭客栈",desc:"下药迷倒客商，险些药死宋江。"},
        {name:"清溪县",desc:"征方腊清溪战死。"}
      ]
    },
    { name:"李云", nick:"青眼虎", star:"地察星", ren:71, yi:77, li:69, zhi:63, xin:81,
      imglist:[
        {name:"李云",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liyun/ly1.png"},
        
      ],
      sceneList:[
        {name:"沂水县",desc:"青眼虎，沂水县都头，擅长捕盗，教朱富武艺。"},
        {name:"沂水城外",desc:"押送李逵，被朱富下药放倒。"},
        {name:"歙州",desc:"征方腊歙州，被马踏死。"}
      ]
    },
    { name:"焦挺", nick:"没面目", star:"地恶星", ren:58, yi:76, li:52, zhi:55, xin:78,
      imglist:[
        {name:"焦挺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jiaoting/jt1.png"},
        
      ],
      sceneList:[
        {name:"路边客栈",desc:"没面目，相扑高手，到处投奔好汉无人接纳。"},
        {name:"枯树山前",desc:"路遇李逵，轻松摔倒李逵，随李逵投奔鲍旭。"},
        {name:"润州",desc:"征方腊润州，乱军阵亡。"}
      ]
    },
    { name:"石勇", nick:"石将军", star:"地丑星", ren:55, yi:78, li:53, zhi:54, xin:79,
      imglist:[
        {name:"石勇",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shiyong/sy1.png"},
        
      ],
      sceneList:[
        {name:"乡村客店",desc:"石将军，赌场出身，杀人后逃亡江湖。"},
        {name:"酒店内",desc:"酒店遇见宋江，传递宋清家书。"},
        {name:"歙州",desc:"征方腊歙州战死。"}
      ]
    },
    { name:"孙新", nick:"小尉迟", star:"地数星", ren:64, yi:82, li:65, zhi:73, xin:83,
      imglist:[
        {name:"孙新",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunxin/sx1.png"},
        
      ],
      sceneList:[
        {name:"登州城",desc:"小尉迟，孙立弟弟，顾大嫂丈夫。"},
        {name:"登州牢狱",desc:"夫妻策划登州大劫牢。"},
        {name:"登州故里",desc:"征方腊平安归来，回登州经商。"}
      ]
    },
    { name:"顾大嫂", nick:"母大虫", star:"地阴星", ren:65, yi:84, li:48, zhi:74, xin:85,
      imglist:[
        {name:"顾大嫂",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gudasao/gds1.png"},
        
      ],
      sceneList:[
        {name:"登州酒店",desc:"母大虫，孙新妻子，性格泼辣勇猛。"},
        {name:"登州劫牢",desc:"带头杀入大牢，救出解珍解宝。"},
        {name:"登州",desc:"征方腊生还，回乡开店，善终。"}
      ]
    },
    { name:"张青", nick:"菜园子", star:"地刑星", ren:52, yi:77, li:55, zhi:66, xin:76,
      imglist:[
        {name:"张青",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangqing/zq1.png"},
        
      ],
      sceneList:[
        {name:"孟州十字坡",desc:"菜园子，十字坡黑店店主。"},
        {name:"十字坡客栈",desc:"夫妻开店，卖人肉包子，结识武松。"},
        {name:"歙州",desc:"征方腊歙州战死。"}
      ]
    },
    { name:"孙二娘", nick:"母夜叉", star:"地壮星", ren:45, yi:78, li:44, zhi:71, xin:77,
      imglist:[
        {name:"孙二娘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunerniang/sen1.png"},
        
      ],
      sceneList:[
        {name:"十字坡酒店",desc:"母夜叉，张青妻子，凶悍泼辣。"},
        {name:"十字坡客房",desc:"下药放倒武松，反被武松制服。"},
        {name:"清溪县",desc:"征方腊清溪，被杜微飞刀杀死。"}
      ]
    },
    { name:"王定六", nick:"活闪婆", star:"地劣星", ren:67, yi:79, li:61, zhi:65, xin:80,
      imglist:[
        {name:"王定六",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wangdingliu/wdl1.png"},
        
      ],
      sceneList:[
        {name:"扬子江边",desc:"活闪婆，扬子江边小伙，仰慕梁山好汉。"},
        {name:"江边渡口",desc:"协助张顺去建康府请安道全。"},
        {name:"宣州",desc:"征方腊宣州，被箭射死。"}
      ]
    },
    { name:"郁保四", nick:"险道神", star:"地健星", ren:56, yi:73, li:57, zhi:61, xin:70,
      imglist:[
        {name:"郁保四",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yubaosi/ybs1.png"},
        
      ],
      sceneList:[
        {name:"曾头市",desc:"险道神，身材高大，曾头市抢马的头领。"},
        {name:"梁山帐下",desc:"执掌梁山杏黄大旗。"},
        {name:"清溪县",desc:"征方腊清溪，被飞刀斩杀。"}
      ]
    },
    { name:"白胜", nick:"白日鼠", star:"地耗星", ren:54, yi:70, li:51, zhi:64, xin:62,
      imglist:[
        {name:"白胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/baisheng/bs1.png"},
        
      ],
      sceneList:[
        {name:"黄泥冈",desc:"白日鼠，黄泥冈扮作卖酒汉子，配合智取生辰纲。"},
        {name:"济州大牢",desc:"事发被捕，熬不住拷打招供。"},
        {name:"杭州",desc:"征方腊杭州，瘟疫病死。"}
      ]
    },
    { name:"时迁", nick:"鼓上蚤", star:"地贼星", ren:53, yi:76, li:42, zhi:85, xin:78,
      imglist:[
        {name:"时迁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shiqian/sq1.png"},
        
      ],
      sceneList:[
        {name:"蓟州坟地",desc:"鼓上蚤，轻功盗贼，善潜入偷盗。"},
        {name:"徐宁宅院",desc:"盗取徐宁雁翎甲，赚取徐宁上梁山。"},
        {name:"杭州",desc:"征方腊得胜，归途染病身故。"}
      ]
    },
    { name:"段景住", nick:"金毛犬", star:"地狗星", ren:51, yi:68, li:47, zhi:58, xin:65,
      imglist:[
        {name:"段景住",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duanjingzhu/djz1.png"},
        
      ],
      sceneList:[
        {name:"塞外草原",desc:"金毛犬，北方胡人，善于相马。"},
        {name:"曾头市",desc:"夺得千里照夜玉狮子马，被曾头市夺走。"},
        {name:"钱塘江",desc:"征方腊乘船，落水淹死。"}
      ]
    },
    { name:"丁得孙", nick:"中箭虎", star:"地速星", ren:70, yi:77, li:60, zhi:58, xin:65,
      imglist:[
        {name:"丁得孙",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dingdesun/dds1.png"},
        
      ],
      sceneList:[
        {name:"东昌府城下",desc:"东昌府之战"},
        {name:"梁山大寨",desc:"归降梁山"},
        {name:"钱塘江歙州山路",desc:"被毒蛇所咬"}
      ]
    },
    { name:"龚旺", nick:"花项虎", star:"地捷星", ren:71, yi:60, li:60, zhi:65, xin:65,
      imglist:[
        {name:"龚旺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gongwang/gw1.png"},
        
      ],
      sceneList:[
        {name:"东昌府城下",desc:"东昌府之战"},
        {name:"梁山大寨",desc:"归降梁山"},
        {name:"德清县溪涧",desc:"战死"}
      ]
    }
    ],
    heroSceneUnlock: {}
  },
  onLaunch() {
    console.log("app.js onLaunch 执行了")

    const cache = wx.getStorageSync("heroSceneUnlockStorage")

    if (cache) {
      this.globalData.heroSceneUnlock = cache
      console.log("从缓存读取解锁进度", cache)
    } else {
      console.log("没有缓存，使用空对象")
    }
  }
})