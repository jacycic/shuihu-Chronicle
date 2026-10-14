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
        "scene": {
          "main": "郓城衙署",
          "list": ["宋家庄", "浔阳楼", "柴府", "梁山忠义堂"]
        }
      },
      { name:"卢俊义", nick:"玉麒麟", star:"天罡星", ren:70, yi:80, li:88, zhi:58, xin:85,
        imglist:[
          {name:"卢俊义",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lujunyi/ljy1.png"},
          
        ],
        "scene": {
          "main": "大名府卢府",
          "list": ["梁山忠义堂", "东昌府", "西岳华山"]
        }
      },
      { name:"吴用", nick:"智多星", star:"天机星", ren:55, yi:75, li:88, zhi:92, xin:68,
        imglist:[
          {name:"吴用",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wuyong/wy1.png"},
          
        ],
        "scene": {
          "main": "东溪村学馆",
          "list": ["黄泥岗", "梁山忠义堂", "大名府"]
        }
      },
      { name:"公孙胜", nick:"入云龙", star:"天闲星", ren:85, yi:84, li:85, zhi:90, xin:88,
        imglist:[
          {name:"公孙胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gongsunsheng/gss1.png"},
          
        ],
        "scene": {
          "main": "二仙庄",
          "list": ["黄泥岗", "高唐州", "梁山忠义堂"]
        }
      },
      { name:"关胜", nick:"大刀", star:"天勇星", ren:72, yi:83, li:90, zhi:65, xin:86,
        imglist:[
          {name:"关胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/guansheng/gs1.png"},
          
        ],
        "scene": {
          "main": "蒲东巡检司",
          "list": ["大名府", "梁山忠义堂", "北京城外"]
        }
      },
      { name:"林冲", nick:"豹子头", star:"天雄星", ren:76, yi:81, li:84, zhi:70, xin:83,
        imglist:[
          {name:"林冲",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/linchong/lc1.png"},
          
        ],
        "scene": {
          "main": "东京八十万禁军教头府",
          "list": ["白虎堂", "野猪林", "草料场", "梁山忠义堂"]
        }
      },
      { name:"秦明", nick:"霹雳火", star:"天猛星", ren:62, yi:86, li:70, zhi:52, xin:88,
        imglist:[
          {name:"秦明",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/qinming/qm1.png"},
          
        ],
        "scene": {
          "main": "青州指挥司",
          "list": ["清风山", "青州城", "梁山忠义堂"]
        }
      },
      { name:"呼延灼", nick:"双鞭", star:"天威星", ren:68, yi:78, li:86, zhi:66, xin:82,
        imglist:[
          {name:"呼延灼",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huyanzhuo/hyz1.png"},
          
        ],
        "scene": {
          "main": "汝宁都统府",
          "list": ["青州", "连环马大营", "梁山忠义堂"]
        }
      },
      { name:"花荣", nick:"小李广", star:"天英星", ren:74, yi:90, li:80, zhi:75, xin:92,
        imglist:[
          {name:"花荣",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huarong/hr1.png"},
          
        ],
        "scene": {
          "main": "清风寨",
          "list": ["清风山", "对影山", "梁山忠义堂"]
        }
      },
      { name:"柴进", nick:"小旋风", star:"天贵星", ren:80, yi:84, li:88, zhi:72, xin:78,
        imglist:[
          {name:"柴进",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/chaijin/cj1.png"},
          
        ],
        "scene": {
          "main": "沧州柴府",
          "list": ["高唐州", "牢城营", "梁山忠义堂"]
        }
      },
      { name:"李应", nick:"扑天雕", star:"天富星", ren:71, yi:76, li:82, zhi:74, xin:80,
        imglist:[
          {name:"李应",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liying/ly1.png"},
          
        ],
        "scene": {
          "main": "独龙冈李家庄",
          "list": ["祝家庄", "梁山忠义堂"]
        }
      },
      { name:"朱仝", nick:"美髯公", star:"天满星", ren:86, yi:88, li:85, zhi:68, xin:90,
        imglist:[
          {name:"朱仝",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhutong/zt1.png"},
          
        ],
        "scene": {
          "main": "郓城县衙",
          "list": ["柴府", "沧州小衙内处", "梁山忠义堂"]
        }
      },
      { name:"鲁智深", nick:"花和尚", star:"天孤星", ren:92, yi:94, li:65, zhi:80, xin:91,
        imglist:[
          {name:"鲁智深",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/luzhishen/lzs1.png"},
          
        ],
        "scene": {
          "main": "五台山文殊院",
          "list": ["渭州城", "桃花山", "野猪林", "二龙山", "梁山忠义堂"]
        }
      },
      { name:"武松", nick:"行者", star:"天伤星", ren:65, yi:87, li:62, zhi:78, xin:84,
        imglist:[
          {name:"武松",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wusong/ws1.png"},
          
        ],
        "scene": {
          "main": "阳谷县",
          "list": ["景阳冈", "狮子楼", "飞云浦", "鸳鸯楼", "二龙山", "梁山忠义堂"]
        }
      },
      { name:"董平", nick:"双枪将", star:"天立星", ren:40, yi:65, li:42, zhi:60, xin:58,
        imglist:[
          {name:"董平",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dongping/dp1.png"},
          
        ],
        "scene": {
          "main": "东平府",
          "list": ["东平城门", "梁山忠义堂"]
        }
      },
      { name:"张清", nick:"没羽箭", star:"天捷星", ren:60, yi:72, li:66, zhi:63, xin:76,
        imglist:[
          {name:"张清",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangqing/zq1.png"},
          
        ],
        "scene": {
          "main": "东昌府",
          "list": ["东昌城头", "梁山忠义堂"]
        }
      },
      { name:"杨志", nick:"青面兽", star:"天暗星", ren:70, yi:79, li:83, zhi:64, xin:81,
        imglist:[
          {name:"杨志",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangzhi/yz1.png"},
          
        ],
        "scene": {
          "main": "东京汴梁",
          "list": ["黄泥岗", "大名府", "二龙山", "梁山忠义堂"]
        }
      },
      { name:"徐宁", nick:"金枪手", star:"天佑星", ren:73, yi:77, li:81, zhi:61, xin:80,
        imglist:[
          {name:"徐宁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xuning/xn1.png"},
          
        ],
        "scene": {
          "main": "东京徐府",
          "list": ["汤隆家", "钩镰枪大营", "梁山忠义堂"]
        }
      },
      { name:"索超", nick:"急先锋", star:"天空星", ren:63, yi:82, li:71, zhi:55, xin:83,
        imglist:[
          {name:"索超",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/suochao/sc1.png"},
          
        ],
        "scene": {
          "main": "大名府留守司",
          "list": ["大名校场", "梁山忠义堂"]
        }
      },
      { name:"戴宗", nick:"神行太保", star:"天速星", ren:75, yi:83, li:74, zhi:71, xin:86,
        imglist:[
          {name:"戴宗",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/daizong/dz1.png"},
          
        ],
        "scene": {
          "main": "江州两院押牢节级府",
          "list": ["江州牢城", "梁山泊", "蓟州"]
        }
      },
      { name:"刘唐", nick:"赤发鬼", star:"天异星", ren:58, yi:84, li:50, zhi:62, xin:82,
        imglist:[
          {name:"刘唐",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liutang/lt1.png"},
          
        ],
        "scene": {
          "main": "东溪村",
          "list": ["黄泥岗", "梁山忠义堂"]
        }
      },
      { name:"李逵", nick:"黑旋风", star:"天杀星", ren:35, yi:88, li:30, zhi:28, xin:85,
        imglist:[
          {name:"李逵",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/likui/lk1.png"},
          
        ],
        "scene": {
          "main": "江州牢城",
          "list": ["沂水县", "沂岭", "梁山忠义堂"]
        }
      },
      { name:"史进", nick:"九纹龙", star:"天微星", ren:72, yi:85, li:73, zhi:60, xin:84,
        imglist:[
          {name:"史进",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shijin/sj1.png"},
          
        ],
        "scene": {
          "main": "华阴县史家庄",
          "list": ["少华山", "渭州", "梁山忠义堂"]
        }
      },
      { name:"穆弘", nick:"没遮拦", star:"天究星", ren:61, yi:78, li:65, zhi:64, xin:79,
        imglist:[
          {name:"穆弘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/muhong/mh1.png"},
          
        ],
        "scene": {
          "main": "揭阳镇穆家庄",
          "list": ["浔阳江", "江州", "梁山忠义堂"]
        }
      },
      { name:"雷横", nick:"插翅虎", star:"天退星", ren:74, yi:82, li:72, zhi:59, xin:81,
        imglist:[
          {name:"雷横",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/leiheng/lh1.png"},
          
        ],
        "scene": {
          "main": "郓城县衙",
          "list": ["白秀英戏楼", "朱仝府邸", "梁山忠义堂"]
        }
      },
      { name:"李俊", nick:"混江龙", star:"天寿星", ren:76, yi:81, li:75, zhi:88, xin:84,
        imglist:[
          {name:"李俊",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lijun/lj1.png"},
          
        ],
        "scene": {
          "main": "揭阳岭",
          "list": ["浔阳江", "江州", "梁山忠义堂"]
        }
      },
      { name:"阮小二", nick:"立地太岁", star:"天剑星", ren:64, yi:83, li:58, zhi:67, xin:83,
        imglist:[
          {name:"阮小二",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaoer/rxe1.png"},
          
        ],
        "scene": {
          "main": "石碣村",
          "list": ["黄泥岗", "梁山泊水寨", "梁山忠义堂"]
        }
      },
      { name:"张横", nick:"船火儿", star:"天平星", ren:57, yi:79, li:55, zhi:66, xin:77,
        imglist:[
          {name:"张横",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangheng/zh1.png"},
          
        ],
        "scene": {
          "main": "浔阳江",
          "list": ["揭阳镇", "江州", "梁山水寨"]
        }
      },
      { name:"阮小五", nick:"短命二郎", star:"天罪星", ren:60, yi:81, li:54, zhi:65, xin:80,
        imglist:[
          {name:"阮小五",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaowu/rxw1.png"},
          
        ],
        "scene": {
          "main": "石碣村",
          "list": ["黄泥岗", "梁山泊水寨", "梁山忠义堂"]
        }
      },
      { name:"张顺", nick:"浪里白条", star:"天损星", ren:70, yi:84, li:63, zhi:74, xin:85,
        imglist:[
          {name:"张顺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangshun/zs1.png"},
          
        ],
        "scene": {
          "main": "浔阳江",
          "list": ["涌金门", "江州", "梁山水寨"]
        }
      },
      { name:"阮小七", nick:"活阎罗", star:"天败星", ren:62, yi:82, li:52, zhi:69, xin:81,
        imglist:[
          {name:"阮小七",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaoqi/rxq1.png"},
          
        ],
        "scene": {
          "main": "石碣村",
          "list": ["黄泥岗", "梁山泊水寨", "梁山忠义堂"]
        }
      },
      { name:"杨雄", nick:"病关索", star:"天牢星", ren:66, yi:76, li:68, zhi:56, xin:75,
        imglist:[
          {name:"杨雄",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangxiong/yx1.png"},
          
        ],
        "scene": {
          "main": "蓟州府衙",
          "list": ["翠屏山", "祝家庄", "梁山忠义堂"]
        }
      },
      { name:"石秀", nick:"拼命三郎", star:"天慧星", ren:68, yi:86, li:64, zhi:82, xin:87,
        imglist:[
          {name:"石秀",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shixiu/sx1.png"},
          
        ],
        "scene": {
          "main": "蓟州",
          "list": ["翠屏山", "祝家庄", "梁山忠义堂"]
        }
      },
      { name:"解珍", nick:"两头蛇", star:"天暴星", ren:69, yi:80, li:61, zhi:57, xin:82,
        imglist:[
          {name:"解珍",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiezhen/xz1.png"},
          
        ],
        "scene": {
          "main": "登州猎户家",
          "list": ["登州牢狱", "毛太公庄", "梁山忠义堂"]
        }
      },
      { name:"解宝", nick:"双尾蝎", star:"天哭星", ren:68, yi:81, li:60, zhi:59, xin:83,
        imglist:[
          {name:"解宝",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiebao/xb1.png"},
          
        ],
        "scene": {
          "main": "登州猎户家",
          "list": ["登州牢狱", "毛太公庄", "梁山忠义堂"]
        }
      },
      { name:"燕青", nick:"浪子", star:"天巧星", ren:84, yi:89, li:91, zhi:93, xin:90,
        imglist:[
          {name:"燕青",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanqing/yq1.png"},
          
        ],
        "scene": {
          "main": "大名府卢府",
          "list": ["泰安州", "李师师宅院", "梁山忠义堂"]
        }
      },
      { name:"朱武", nick:"神机军师", star:"地魁星", ren:85, yi:75, li:80, zhi:77, xin:83,
        imglist:[
          {name:"朱武",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhuwu/zw1.png"},
          
        ],
        "scene": {
          "main": "少华山寨",
          "list": ["史家庄", "华州", "梁山忠义堂"]
        }
      },
      { name:"黄信", nick:"镇三山", star:"地煞星", ren:64, yi:73, li:76, zhi:58, xin:75,
        imglist:[
          {name:"黄信",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huangxin/hx1.png"},
          
        ],
        "scene": {
          "main": "青州府",
          "list": ["清风山", "青州城", "梁山忠义堂"]
        }
      },
      { name:"孙立", nick:"病尉迟", star:"地勇星", ren:67, yi:77, li:80, zhi:84, xin:76,
        imglist:[
          {name:"孙立",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunli/sl1.png"},
          
        ],
        "scene": {
          "main": "登州兵马提辖府",
          "list": ["登州牢狱", "祝家庄", "梁山忠义堂"]
        }
      },
      { name:"宣赞", nick:"丑郡马", star:"地杰星", ren:66, yi:74, li:77, zhi:57, xin:78,
        imglist:[
          {name:"宣赞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xuanzan/xz1.png"},
          
        ],
        "scene": {
          "main": "东京兵马司",
          "list": ["大名府", "梁山忠义堂"]
        }
      },
      { name:"郝思文", nick:"井木犴", star:"地雄星", ren:65, yi:75, li:75, zhi:56, xin:77,
        imglist:[
          {name:"郝思文",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/haosiwen/hsw1.png"},
         
        ],
        "scene": {
          "main": "东京",
          "list": ["大名府", "梁山忠义堂"]
        }
      },
      { name:"韩滔", nick:"百胜将", star:"地威星", ren:63, yi:74, li:74, zhi:55, xin:76,
        imglist:[
          {name:"韩滔",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/hantao/ht1.png"},
          
        ],
        "scene": {
          "main": "陈州团练府",
          "list": ["呼延灼大营", "梁山忠义堂"]
        }
      },
      { name:"彭玘", nick:"天目将", star:"地英星", ren:64, yi:73, li:75, zhi:54, xin:76,
        imglist:[
          {name:"彭玘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/pengqi/pq1.png"},
          
        ],
        "scene": {
          "main": "颍州团练府",
          "list": ["呼延灼大营", "梁山忠义堂"]
        }
      },
      { name:"单廷圭", nick:"圣水将", star:"地奇星", ren:62, yi:72, li:74, zhi:53, xin:75,
        imglist:[
          {name:"单廷圭",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shanyangui/syg1.png"},
         
        ],
        "scene": {
          "main": "凌州团练府",
          "list": ["凌州城", "梁山忠义堂"]
        }
      },
      { name:"魏定国", nick:"神火将", star:"地猛星", ren:61, yi:72, li:73, zhi:52, xin:74,
        imglist:[
          {name:"魏定国",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/weidingguo/wdg1.png"},
          
        ],
        "scene": {
          "main": "凌州团练府",
          "list": ["凌州城", "梁山忠义堂"]
        }
      },
      { name:"萧让", nick:"圣手书生", star:"地文星", ren:72, yi:74, li:80, zhi:76, xin:81,
        imglist:[
          {name:"萧让",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiaorang/xr1.png"},
          
        ],
        "scene": {
          "main": "济州书斋",
          "list": ["金大坚家", "梁山忠义堂"]
        }
      },
      { name:"裴宣", nick:"铁面孔目", star:"地正星", ren:86, yi:82, li:90, zhi:88, xin:92,
        imglist:[
          {name:"裴宣",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/peixuan/px1.png"},
          
        ],
        "scene": {
          "main": "饮马川",
          "list": ["蓟州府", "梁山忠义堂"]
        }
      },
      { name:"欧鹏", nick:"摩云金翅", star:"地阔星", ren:70, yi:79, li:77, zhi:75, xin:84,
        imglist:[
          {name:"欧鹏",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/oupeng/op1.png"},
          
        ],
        "scene": {
          "main": "黄门山",
          "list": ["黄州", "梁山忠义堂"]
        }
      },
      { name:"邓飞", nick:"火眼狻猊", star:"地阖星", ren:63, yi:81, li:62, zhi:66, xin:82,
        imglist:[
          {name:"邓飞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dengfei/df1.png"},
          
        ],
        "scene": {
          "main": "饮马川",
          "list": ["蓟州", "祝家庄", "梁山忠义堂"]
        }
      },
      { name:"燕顺", nick:"锦毛虎", star:"地强星", ren:60, yi:82, li:55, zhi:61, xin:83,
        imglist:[
          {name:"燕顺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanshun/ys1.png"},
          
        ],
        "scene": {
          "main": "清风山",
          "list": ["清风寨", "梁山忠义堂"]
        }
      },
      { name:"杨林", nick:"锦豹子", star:"地暗星", ren:65, yi:78, li:63, zhi:79, xin:80,
        imglist:[
          {name:"杨林",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanglin/yl1.png"},
          
        ],
        "scene": {
          "main": "绿林江湖",
          "list": ["饮马川", "祝家庄", "梁山忠义堂"]
        }
      },
      { name:"凌振", nick:"轰天雷", star:"地轴星", ren:67, yi:74, li:71, zhi:78, xin:79,
        imglist:[
          {name:"凌振",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lingzhen/lz1.png"},
          
        ],
        "scene": {
          "main": "东京火药局",
          "list": ["呼延灼大营", "梁山忠义堂"]
        }
      },
      { name:"蒋敬", nick:"神算子", star:"地会星", ren:69, yi:76, li:70, zhi:84, xin:83,
        imglist:[
          {name:"蒋敬",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jiangjing/jj1.png"},
          
        ],
        "scene": {
          "main": "黄门山",
          "list": ["潭州", "梁山忠义堂"]
        }
      },
      { name:"吕方", nick:"小温侯", star:"地佐星", ren:63, yi:77, li:68, zhi:61, xin:78,
        imglist:[
          {name:"吕方",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lvfang/lf1.png"},
          
        ],
        "scene": {
          "main": "对影山",
          "list": ["梁山忠义堂"]
        }
      },
      { name:"郭盛", nick:"赛仁贵", star:"地佑星", ren:64, yi:77, li:67, zhi:60, xin:78,
        imglist:[
          {name:"郭盛",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/guosheng/gs1.png"},
          
        ],
        "scene": {
          "main": "对影山",
          "list": ["梁山忠义堂"]
        }
      },
      { name:"安道全", nick:"神医", star:"地灵星", ren:85, yi:76, li:81, zhi:79, xin:82,
        imglist:[
          {name:"安道全",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/andaoquan/adq1.png"},
          
        ],
        "scene": {
          "main": "建康府药铺",
          "list": ["秦淮河边", "梁山忠义堂"]
        }
      },
      { name:"皇甫端", nick:"紫髯伯", star:"地兽星", ren:82, yi:75, li:80, zhi:77, xin:83,
        imglist:[
          {name:"皇甫端",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huangfuduan/hfd1.png"},
          
        ],
        "scene": {
          "main": "东昌府兽药房",
          "list": ["张清大营", "梁山忠义堂"]
        }
      },
      { name:"王英", nick:"矮脚虎", star:"地微星", ren:42, yi:74, li:38, zhi:53, xin:67,
        imglist:[
          {name:"王英",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wangying/wy1.png"},
          
        ],
        "scene": {
          "main": "清风山",
          "list": ["清风寨", "祝家庄", "梁山忠义堂"]
        }
      },
      { name:"扈三娘", nick:"一丈青", star:"地慧星", ren:67, yi:75, li:78, zhi:62, xin:80,
        imglist:[
          {name:"扈三娘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/husanniang/hsn1.png"},
          
        ],
        "scene": {
          "main": "独龙冈扈家庄",
          "list": ["祝家庄", "梁山忠义堂"]
        }
      },
      { name:"鲍旭", nick:"丧门神", star:"地暴星", ren:44, yi:73, li:46, zhi:54, xin:74,
        imglist:[
          {name:"鲍旭",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/baoxu/bx1.png"},
         
        ],
        "scene": {
          "main": "枯树山",
          "list": ["凌州", "梁山忠义堂"]
        }
      },
      { name:"樊瑞", nick:"混世魔王", star:"地然星", ren:65, yi:76, li:60, zhi:78, xin:77,
        imglist:[
          {name:"樊瑞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/fanrui/fr1.png"},
          
        ],
        "scene": {
          "main": "芒砀山",
          "list": ["沛县", "梁山忠义堂"]
        }
      },
      { name:"孔明", nick:"毛头星", star:"地猖星", ren:62, yi:77, li:56, zhi:57, xin:78,
        imglist:[
          {name:"孔明",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/kongming/km1.png"},
          
        ],
        "scene": {
          "main": "白虎山",
          "list": ["青州", "孔家庄", "梁山忠义堂"]
        }
      },
      { name:"孔亮", nick:"独火星", star:"地狂星", ren:61, yi:76, li:55, zhi:56, xin:77,
        imglist:[
          {name:"孔亮",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/kongliang/kl1.png"},
          
        ],
        "scene": {
          "main": "白虎山",
          "list": ["青州", "孔家庄", "梁山忠义堂"]
        }
      },
      { name:"项充", nick:"八臂哪吒", star:"地飞星", ren:51, yi:76, li:50, zhi:63, xin:77,
        imglist:[
          {name:"项充",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiangchong/xc1.png"},
          
        ],
        "scene": {
          "main": "芒砀山",
          "list": ["沛县", "梁山忠义堂"]
        }
      },
      { name:"李衮", nick:"飞天大圣", star:"地走星", ren:50, yi:76, li:49, zhi:62, xin:77,
        imglist:[
          {name:"李衮",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ligun/lg1.png"},
          
        ],
        "scene": {
          "main": "芒砀山",
          "list": ["沛县", "梁山忠义堂"]
        }
      },
      { name:"金大坚", nick:"玉臂匠", star:"地巧星", ren:74, yi:73, li:79, zhi:75, xin:82,
        imglist:[
          {name:"金大坚",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jindajian/jdj1.png"},
          
        ],
        "scene": {
          "main": "济州刻章坊",
          "list": ["萧让家", "梁山忠义堂"]
        }
    
      },
      { name:"马麟", nick:"铁笛仙", star:"地明星", ren:64, yi:77, li:60, zhi:67, xin:78,
        imglist:[
          {name:"马麟",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/malin/ml1.png"},
          
        ],
        "scene": {
          "main": "黄门山",
          "list": ["江州", "祝家庄", "梁山忠义堂"]
        }
      },
      { name:"童威", nick:"出洞蛟", star:"地进星", ren:64, yi:83, li:53, zhi:65, xin:84,
        imglist:[
          {name:"童威",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tongwei/tw1.png"},
          
        ],
        "scene": {
          "main": "浔阳江",
          "list": ["揭阳岭", "梁山水寨"]
        }
      },
      { name:"童猛", nick:"翻江蜃", star:"地退星", ren:65, yi:84, li:54, zhi:66, xin:85,
        imglist:[
          {name:"童猛",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tongmeng/tm1.png"},
          
        ],
        "scene": {
          "main": "浔阳江",
          "list": ["揭阳岭", "梁山水寨"]
        }
      },
      { name:"孟康", nick:"玉幡竿", star:"地满星", ren:60, yi:75, li:58, zhi:70, xin:76,
        imglist:[
          {name:"孟康",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/mengkang/mk1.png"},
          
        ],
        "scene": {
          "main": "饮马川",
          "list": ["造船作坊", "梁山水寨"]
        }
      },
      { name:"侯健", nick:"通臂猿", star:"地遂星", ren:63, yi:74, li:57, zhi:73, xin:75,
        imglist:[
          {name:"侯健",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/houjian/hj1.png"},
          
        ],
        "scene": {
          "main": "江州裁缝铺",
          "list": ["无为军", "梁山忠义堂"]
        }
      },
      { name:"陈达", nick:"跳涧虎", star:"地周星", ren:62, yi:78, li:59, zhi:58, xin:79,
        imglist:[
          {name:"陈达",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/chenda/cd1.png"},
          
        ],
        "scene": {
          "main": "少华山寨",
          "list": ["史家庄", "华州", "梁山忠义堂"]
        }
      },
    { name:"杨春", nick:"白花蛇", star:"地隐星", ren:61, yi:77, li:58, zhi:57, xin:78,
      imglist:[
        {name:"杨春",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangchun/yc1.png"},
       
      ],
      "scene": {
        "main": "少华山寨",
        "list": ["史家庄", "华州", "梁山忠义堂"]
      }
    },
    { name:"郑天寿", nick:"白面郎君", star:"地异星", ren:62, yi:76, li:57, zhi:56, xin:77,
      imglist:[
        {name:"郑天寿",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhengtianshou/zts1.png"},
        
      ],
      "scene": {
        "main": "清风山",
        "list": ["清风寨", "梁山忠义堂"]
      }
    },
    { name:"陶宗旺", nick:"九尾龟", star:"地理星", ren:68, yi:78, li:63, zhi:64, xin:81,
      imglist:[
        {name:"陶宗旺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/taozongwang/tzw1.png"},
        
      ],
      "scene": {
        "main": "黄门山",
        "list": ["梁山筑寨工地", "梁山忠义堂"]
      }
    },
    { name:"宋清", nick:"铁扇子", star:"地俊星", ren:66, yi:75, li:72, zhi:60, xin:76,
      imglist:[
        {name:"宋清",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songqing/sq1.png"},
        
      ],
      "scene": {
        "main": "宋家庄",
        "list": ["郓城", "梁山忠义堂"]
      }
    },
    { name:"乐和", nick:"铁叫子", star:"地乐星", ren:71, yi:83, li:75, zhi:85, xin:84,
      imglist:[
        {name:"乐和",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yuehe/yh1.png"},
        
      ],
      "scene": {
        "main": "登州牢城",
        "list": ["毛太公庄", "祝家庄", "梁山忠义堂"]
      }
    },
    { name:"穆春", nick:"小遮拦", star:"地镇星", ren:59, yi:75, li:56, zhi:58, xin:76,
      imglist:[
        {name:"穆春",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/muchun/mc1.png"},
        
      ],
      "scene": {
        "main": "揭阳镇穆家庄",
        "list": ["浔阳江", "江州", "梁山忠义堂"]
      }
    },
    { name:"曹正", nick:"操刀鬼", star:"地羁星", ren:64, yi:79, li:61, zhi:74, xin:81,
      imglist:[
        {name:"曹正",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caozheng/cz1.png"},
        
      ],
      "scene": {
        "main": "二龙山酒馆",
        "list": ["黄泥岗", "二龙山", "梁山忠义堂"]
      }
    },
    { name:"宋万", nick:"云里金刚", star:"地魔星", ren:62, yi:76, li:54, zhi:55, xin:77,
      imglist:[
        {name:"宋万",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songwan/sw1.png"},
        
      ],
      "scene": {
        "main": "梁山旧寨",
        "list": ["水泊梁山", "梁山忠义堂"]
      }
    },
    { name:"杜迁", nick:"摸着天", star:"地妖星", ren:61, yi:75, li:53, zhi:54, xin:76,
      imglist:[
        {name:"杜迁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duqian/dq1.png"},
        
      ],
      "scene": {
        "main": "梁山旧寨",
        "list": ["水泊梁山", "梁山忠义堂"]
      }
    },
    { name:"薛永", nick:"病大虫", star:"地幽星", ren:65, yi:80, li:60, zhi:63, xin:79,
      imglist:[
        {name:"薛永",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xueyong/xy1.png"},
        
      ],
      "scene": {
        "main": "江湖卖艺场",
        "list": ["揭阳镇", "江州", "梁山忠义堂"]
      }
    },
    { name:"施恩", nick:"金眼彪", star:"地伏星", ren:63, yi:81, li:58, zhi:67, xin:82,
      imglist:[
        {name:"施恩",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shien/se1.png"},
        
      ],
      "scene": {
        "main": "孟州牢城",
        "list": ["快活林", "鸳鸯楼", "二龙山", "梁山忠义堂"]
      }
    },
    { name:"李忠", nick:"打虎将", star:"地僻星", ren:59, yi:76, li:55, zhi:52, xin:74,
      imglist:[
        {name:"李忠",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lizhong/lz1.png"},
        
      ],
      "scene": {
        "main": "桃花山",
        "list": ["渭州", "青州", "梁山忠义堂"]
      }
    },
    { name:"周通", nick:"小霸王", star:"地空星", ren:54, yi:72, li:47, zhi:51, xin:70,
      imglist:[
        {name:"周通",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhoutong/zt1.png"},
        
      ],
      "scene": {
        "main": "桃花山",
        "list": ["桃花庄", "青州", "梁山忠义堂"]
      }
    },
    { name:"汤隆", nick:"金钱豹子", star:"地孤星", ren:48, yi:74, li:51, zhi:79, xin:66,
      imglist:[
        {name:"汤隆",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tanglong/tl1.png"},
        
      ],
      "scene": {
        "main": "铁匠作坊",
        "list": ["徐宁府邸", "梁山忠义堂"]
      }
    },
    { name:"杜兴", nick:"鬼脸儿", star:"地全星", ren:70, yi:83, li:76, zhi:81, xin:86,
      imglist:[
        {name:"杜兴",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duxing/dx1.png"},
        
      ],
      "scene": {
        "main": "独龙冈李家庄",
        "list": ["祝家庄", "梁山忠义堂"]
      }
    },
    { name:"邹渊", nick:"出林龙", star:"地短星", ren:60, yi:79, li:56, zhi:62, xin:80,
      imglist:[
        {name:"邹渊",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zouyuan/zy1.png"},
        
      ],
      "scene": {
        "main": "登云山庄",
        "list": ["登州牢狱", "祝家庄", "梁山忠义堂"]
      }
    },
    { name:"邹润", nick:"独角龙", star:"地角星", ren:61, yi:78, li:54, zhi:60, xin:79,
      imglist:[
        {name:"邹润",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zourun/zr1.png"},
        
      ],
      "scene": {
        "main": "登云山庄",
        "list": ["登州牢狱", "祝家庄", "梁山忠义堂"]
      }
    },
    { name:"朱贵", nick:"旱地忽律", star:"地囚星", ren:63, yi:80, li:58, zhi:82, xin:84,
      imglist:[
        {name:"朱贵",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhugui/zg1.png"},
        
      ],
      "scene": {
        "main": "梁山酒店",
        "list": ["旱地忽律客栈", "梁山忠义堂"]
      }
    },
    { name:"朱富", nick:"笑面虎", star:"地藏星", ren:66, yi:81, li:62, zhi:76, xin:82,
      imglist:[
        {name:"朱富",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhufu/zf1.png"},
        
      ],
      "scene": {
        "main": "沂水县酒肆",
        "list": ["沂岭", "梁山忠义堂"]
      }
    },
    { name:"蔡福", nick:"铁臂膊", star:"地平星", ren:59, yi:76, li:64, zhi:72, xin:75,
      imglist:[
        {name:"蔡福",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caifu/cf1.png"},
        
      ],
      "scene": {
        "main": "大名府牢城",
        "list": ["大名死囚牢", "梁山忠义堂"]
      }
    },
    { name:"蔡庆", nick:"一枝花", star:"地损星", ren:60, yi:75, li:63, zhi:70, xin:76,
      imglist:[
        {name:"蔡庆",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caiqing/cq1.png"},
        
      ],
      "scene": {
        "main": "大名府牢城",
        "list": ["大名死囚牢", "梁山忠义堂"]
      }
    },
    { name:"李立", nick:"催命判官", star:"地奴星", ren:46, yi:74, li:50, zhi:68, xin:72,
      imglist:[
        {name:"李立",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lili/ll1.png"},
        
      ],
      "scene": {
        "main": "揭阳岭黑店",
        "list": ["浔阳江", "梁山忠义堂"]
      }
    },
    { name:"李云", nick:"青眼虎", star:"地察星", ren:71, yi:77, li:69, zhi:63, xin:81,
      imglist:[
        {name:"李云",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liyun/ly1.png"},
        
      ],
      "scene": {
        "main": "沂水县衙",
        "list": ["沂水县", "朱富酒店", "梁山忠义堂"]
      }
    },
    { name:"焦挺", nick:"没面目", star:"地恶星", ren:58, yi:76, li:52, zhi:55, xin:78,
      imglist:[
        {name:"焦挺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jiaoting/jt1.png"},
        
      ],
      "scene": {
        "main": "江湖客栈",
        "list": ["枯树山", "梁山忠义堂"]
      }
    },
    { name:"石勇", nick:"石将军", star:"地丑星", ren:55, yi:78, li:53, zhi:54, xin:79,
      imglist:[
        {name:"石勇",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shiyong/sy1.png"},
        
      ],
      "scene": {
        "main": "大名府客栈",
        "list": ["宋家庄", "梁山忠义堂"]
      }
    },
    { name:"孙新", nick:"小尉迟", star:"地数星", ren:64, yi:82, li:65, zhi:73, xin:83,
      imglist:[
        {name:"孙新",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunxin/sx1.png"},
        
      ],
      "scene": {
        "main": "登州客栈",
        "list": ["登州牢狱", "祝家庄", "梁山忠义堂"]
      }
    },
    { name:"顾大嫂", nick:"母大虫", star:"地阴星", ren:65, yi:84, li:48, zhi:74, xin:85,
      imglist:[
        {name:"顾大嫂",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gudasao/gds1.png"},
        
      ],
      "scene": {
        "main": "登州酒店",
        "list": ["登州牢狱", "祝家庄", "梁山忠义堂"]
      }
    },
    { name:"张青", nick:"菜园子", star:"地刑星", ren:52, yi:77, li:55, zhi:66, xin:76,
      imglist:[
        {name:"张青",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangqing/zq1.png"},
        
      ],
      "scene": {
        "main": "十字坡客栈",
        "list": ["孟州道", "二龙山", "梁山忠义堂"]
      }
    },
    { name:"孙二娘", nick:"母夜叉", star:"地壮星", ren:45, yi:78, li:44, zhi:71, xin:77,
      imglist:[
        {name:"孙二娘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunerniang/sen1.png"},
        
      ],
      "scene": {
        "main": "十字坡客栈",
        "list": ["孟州道", "二龙山", "梁山忠义堂"]
      }
    },
    { name:"王定六", nick:"活闪婆", star:"地劣星", ren:67, yi:79, li:61, zhi:65, xin:80,
      imglist:[
        {name:"王定六",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wangdingliu/wdl1.png"},
        
      ],
      "scene": {
        "main": "扬子江边酒馆",
        "list": ["建康府", "梁山忠义堂"]
      }
    },
    { name:"郁保四", nick:"险道神", star:"地健星", ren:56, yi:73, li:57, zhi:61, xin:70,
      imglist:[
        {name:"郁保四",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yubaosi/ybs1.png"},
        
      ],
      "scene": {
        "main": "曾头市",
        "list": ["曾家寨", "梁山忠义堂"]
      }
    },
    { name:"白胜", nick:"白日鼠", star:"地耗星", ren:54, yi:70, li:51, zhi:64, xin:62,
      imglist:[
        {name:"白胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/baisheng/bs1.png"},
        
      ],
      "scene": {
        "main": "安乐村",
        "list": ["黄泥岗", "济州牢狱", "梁山忠义堂"]
      }
    },
    { name:"时迁", nick:"鼓上蚤", star:"地贼星", ren:53, yi:76, li:42, zhi:85, xin:78,
      imglist:[
        {name:"时迁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shiqian/sq1.png"},
        
      ],
      "scene": {
        "main": "蓟州城外",
        "list": ["祝家庄", "东京相国寺", "梁山忠义堂"]
      }
    },
    { name:"段景住", nick:"金毛犬", star:"地狗星", ren:51, yi:68, li:47, zhi:58, xin:65,
      imglist:[
        {name:"段景住",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duanjingzhu/djz1.png"},
        
      ],
      "scene": {
        "main": "北地草原",
        "list": ["曾头市", "梁山忠义堂"]
      }
    }
    ]
  }
})