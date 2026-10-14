App({
  globalData: {
    // 本次测试匹配出来的好汉对象
    heroResult: null,
    // 全部好汉静态档案，全局共享
    heroList: [
      { name:"宋江", nick:"呼保义", star:"天魁星", ren:78, yi:85, li:82, zhi:76, xin:72,
        imglist:[
          {name:"宋江",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songjiang/sj1.png"},
          {name:"宋江",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songjiang/sj2.png"},
          {name:"宋江",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songjiang/sj3.png"}
        ]
      },
      { name:"卢俊义", nick:"玉麒麟", star:"天罡星", ren:70, yi:80, li:88, zhi:58, xin:85,
        imglist:[
          {name:"卢俊义",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lujunyi/ljy1.png"},
          {name:"卢俊义",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lujunyi/ljy2.png"},
          {name:"卢俊义",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lujunyi/ljy3.png"}
        ]
      },
      { name:"吴用", nick:"智多星", star:"天机星", ren:55, yi:75, li:88, zhi:92, xin:68,
        imglist:[
          {name:"吴用",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wuyong/wy1.png"},
          {name:"吴用",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wuyong/wy2.png"},
          {name:"吴用",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wuyong/wy3.png"}
        ]
      },
      { name:"公孙胜", nick:"入云龙", star:"天闲星", ren:85, yi:84, li:85, zhi:90, xin:88,
        imglist:[
          {name:"公孙胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gongsunsheng/gss1.png"},
          {name:"公孙胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gongsunsheng/gss2.png"},
          {name:"公孙胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gongsunsheng/gss3.png"}
        ]
      },
      { name:"关胜", nick:"大刀", star:"天勇星", ren:72, yi:83, li:90, zhi:65, xin:86,
        imglist:[
          {name:"关胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/guansheng/gs1.png"},
          {name:"关胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/guansheng/gs2.png"},
          {name:"关胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/guansheng/gs3.png"}
        ]
      },
      { name:"林冲", nick:"豹子头", star:"天雄星", ren:76, yi:81, li:84, zhi:70, xin:83,
        imglist:[
          {name:"林冲",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/linchong/lc1.png"},
          {name:"林冲",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/linchong/lc2.png"},
          {name:"林冲",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/linchong/lc3.png"}
        ]
      },
      { name:"秦明", nick:"霹雳火", star:"天猛星", ren:62, yi:86, li:70, zhi:52, xin:88,
        imglist:[
          {name:"秦明",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/qinming/qm1.png"},
          {name:"秦明",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/qinming/qm2.png"},
          {name:"秦明",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/qinming/qm3.png"}
        ]
      },
      { name:"呼延灼", nick:"双鞭", star:"天威星", ren:68, yi:78, li:86, zhi:66, xin:82,
        imglist:[
          {name:"呼延灼",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huyanzhuo/hyz1.png"},
          {name:"呼延灼",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huyanzhuo/hyz2.png"},
          {name:"呼延灼",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huyanzhuo/hyz3.png"}
        ]
      },
      { name:"花荣", nick:"小李广", star:"天英星", ren:74, yi:90, li:80, zhi:75, xin:92,
        imglist:[
          {name:"花荣",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huarong/hr1.png"},
          {name:"花荣",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huarong/hr2.png"},
          {name:"花荣",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huarong/hr3.png"}
        ]
      },
      { name:"柴进", nick:"小旋风", star:"天贵星", ren:80, yi:84, li:88, zhi:72, xin:78,
        imglist:[
          {name:"柴进",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/chaijin/cj1.png"},
          {name:"柴进",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/chaijin/cj2.png"},
          {name:"柴进",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/chaijin/cj3.png"}
        ]
      },
      { name:"李应", nick:"扑天雕", star:"天富星", ren:71, yi:76, li:82, zhi:74, xin:80,
        imglist:[
          {name:"李应",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liying/ly1.png"},
          {name:"李应",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liying/ly2.png"},
          {name:"李应",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liying/ly3.png"}
        ]
      },
      { name:"朱仝", nick:"美髯公", star:"天满星", ren:86, yi:88, li:85, zhi:68, xin:90,
        imglist:[
          {name:"朱仝",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhutong/zt1.png"},
          {name:"朱仝",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhutong/zt2.png"},
          {name:"朱仝",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhutong/zt3.png"}
        ]
      },
      { name:"鲁智深", nick:"花和尚", star:"天孤星", ren:92, yi:94, li:65, zhi:80, xin:91,
        imglist:[
          {name:"鲁智深",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/luzhishen/lzs1.png"},
          {name:"鲁智深",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/luzhishen/lzs2.png"},
          {name:"鲁智深",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/luzhishen/lzs3.png"}
        ]
      },
      { name:"武松", nick:"行者", star:"天伤星", ren:65, yi:87, li:62, zhi:78, xin:84,
        imglist:[
          {name:"武松",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wusong/ws1.png"},
          {name:"武松",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wusong/ws2.png"},
          {name:"武松",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wusong/ws3.png"}
        ]
      },
      { name:"董平", nick:"双枪将", star:"天立星", ren:40, yi:65, li:42, zhi:60, xin:58,
        imglist:[
          {name:"董平",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dongping/dp1.png"},
          {name:"董平",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dongping/dp2.png"},
          {name:"董平",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dongping/dp3.png"}
        ]
      },
      { name:"张清", nick:"没羽箭", star:"天捷星", ren:60, yi:72, li:66, zhi:63, xin:76,
        imglist:[
          {name:"张清",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangqing/zq1.png"},
          {name:"张清",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangqing/zq2.png"},
          {name:"张清",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangqing/zq3.png"}
        ]
      },
      { name:"杨志", nick:"青面兽", star:"天暗星", ren:70, yi:79, li:83, zhi:64, xin:81,
        imglist:[
          {name:"杨志",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangzhi/yz1.png"},
          {name:"杨志",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangzhi/yz2.png"},
          {name:"杨志",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangzhi/yz3.png"}
        ]
      },
      { name:"徐宁", nick:"金枪手", star:"天佑星", ren:73, yi:77, li:81, zhi:61, xin:80,
        imglist:[
          {name:"徐宁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xuning/xn1.png"},
          {name:"徐宁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xuning/xn2.png"},
          {name:"徐宁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xuning/xn3.png"}
        ]
      },
      { name:"索超", nick:"急先锋", star:"天空星", ren:63, yi:82, li:71, zhi:55, xin:83,
        imglist:[
          {name:"索超",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/suochao/sc1.png"},
          {name:"索超",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/suochao/sc2.png"},
          {name:"索超",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/suochao/sc3.png"}
        ]
      },
      { name:"戴宗", nick:"神行太保", star:"天速星", ren:75, yi:83, li:74, zhi:71, xin:86,
        imglist:[
          {name:"戴宗",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/daizong/dz1.png"},
          {name:"戴宗",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/daizong/dz2.png"},
          {name:"戴宗",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/daizong/dz3.png"}
        ]
      },
      { name:"刘唐", nick:"赤发鬼", star:"天异星", ren:58, yi:84, li:50, zhi:62, xin:82,
        imglist:[
          {name:"刘唐",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liutang/lt1.png"},
          {name:"刘唐",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liutang/lt2.png"},
          {name:"刘唐",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liutang/lt3.png"}
        ]
      },
      { name:"李逵", nick:"黑旋风", star:"天杀星", ren:35, yi:88, li:30, zhi:28, xin:85,
        imglist:[
          {name:"李逵",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/likui/lk1.png"},
          {name:"李逵",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/likui/lk2.png"},
          {name:"李逵",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/likui/lk3.png"}
        ]
      },
      { name:"史进", nick:"九纹龙", star:"天微星", ren:72, yi:85, li:73, zhi:60, xin:84,
        imglist:[
          {name:"史进",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shijin/sj1.png"},
          {name:"史进",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shijin/sj2.png"},
          {name:"史进",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shijin/sj3.png"}
        ]
      },
      { name:"穆弘", nick:"没遮拦", star:"天究星", ren:61, yi:78, li:65, zhi:64, xin:79,
        imglist:[
          {name:"穆弘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/muhong/mh1.png"},
          {name:"穆弘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/muhong/mh2.png"},
          {name:"穆弘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/muhong/mh3.png"}
        ]
      },
      { name:"雷横", nick:"插翅虎", star:"天退星", ren:74, yi:82, li:72, zhi:59, xin:81,
        imglist:[
          {name:"雷横",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/leiheng/lh1.png"},
          {name:"雷横",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/leiheng/lh2.png"},
          {name:"雷横",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/leiheng/lh3.png"}
        ]
      },
      { name:"李俊", nick:"混江龙", star:"天寿星", ren:76, yi:81, li:75, zhi:88, xin:84,
        imglist:[
          {name:"李俊",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lijun/lj1.png"},
          {name:"李俊",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lijun/lj2.png"},
          {name:"李俊",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lijun/lj3.png"}
        ]
      },
      { name:"阮小二", nick:"立地太岁", star:"天剑星", ren:64, yi:83, li:58, zhi:67, xin:83,
        imglist:[
          {name:"阮小二",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaoer/rxe1.png"},
          {name:"阮小二",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaoer/rxe2.png"},
          {name:"阮小二",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaoer/rxe3.png"}
        ]
      },
      { name:"张横", nick:"船火儿", star:"天平星", ren:57, yi:79, li:55, zhi:66, xin:77,
        imglist:[
          {name:"张横",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangheng/zh1.png"},
          {name:"张横",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangheng/zh2.png"},
          {name:"张横",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangheng/zh3.png"}
        ]
      },
      { name:"阮小五", nick:"短命二郎", star:"天罪星", ren:60, yi:81, li:54, zhi:65, xin:80,
        imglist:[
          {name:"阮小五",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaowu/rxw1.png"},
          {name:"阮小五",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaowu/rxw2.png"},
          {name:"阮小五",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaowu/rxw3.png"}
        ]
      },
      { name:"张顺", nick:"浪里白条", star:"天损星", ren:70, yi:84, li:63, zhi:74, xin:85,
        imglist:[
          {name:"张顺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangshun/zs1.png"},
          {name:"张顺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangshun/zs2.png"},
          {name:"张顺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangshun/zs3.png"}
        ]
      },
      { name:"阮小七", nick:"活阎罗", star:"天败星", ren:62, yi:82, li:52, zhi:69, xin:81,
        imglist:[
          {name:"阮小七",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaoqi/rxq1.png"},
          {name:"阮小七",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaoqi/rxq2.png"},
          {name:"阮小七",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ruanxiaoqi/rxq3.png"}
        ]
      },
      { name:"杨雄", nick:"病关索", star:"天牢星", ren:66, yi:76, li:68, zhi:56, xin:75,
        imglist:[
          {name:"杨雄",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangxiong/yx1.png"},
          {name:"杨雄",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangxiong/yx2.png"},
          {name:"杨雄",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangxiong/yx3.png"}
        ]
      },
      { name:"石秀", nick:"拼命三郎", star:"天慧星", ren:68, yi:86, li:64, zhi:82, xin:87,
        imglist:[
          {name:"石秀",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shixiu/sx1.png"},
          {name:"石秀",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shixiu/sx2.png"},
          {name:"石秀",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shixiu/sx3.png"}
        ]
      },
      { name:"解珍", nick:"两头蛇", star:"天暴星", ren:69, yi:80, li:61, zhi:57, xin:82,
        imglist:[
          {name:"解珍",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiezhen/xz1.png"},
          {name:"解珍",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiezhen/xz2.png"},
          {name:"解珍",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiezhen/xz3.png"}
        ]
      },
      { name:"解宝", nick:"双尾蝎", star:"天哭星", ren:68, yi:81, li:60, zhi:59, xin:83,
        imglist:[
          {name:"解宝",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiebao/xb1.png"},
          {name:"解宝",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiebao/xb2.png"},
          {name:"解宝",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiebao/xb3.png"}
        ]
      },
      { name:"燕青", nick:"浪子", star:"天巧星", ren:84, yi:89, li:91, zhi:93, xin:90,
        imglist:[
          {name:"燕青",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanqing/yq1.png"},
          {name:"燕青",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanqing/yq2.png"},
          {name:"燕青",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanqing/yq3.png"}
        ]
      },
      { name:"朱武", nick:"神机军师", star:"地魁星", ren:85, yi:75, li:80, zhi:77, xin:83,
        imglist:[
          {name:"朱武",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhuwu/zw1.png"},
          {name:"朱武",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhuwu/zw2.png"},
          {name:"朱武",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhuwu/zw3.png"}
        ]
      },
      { name:"黄信", nick:"镇三山", star:"地煞星", ren:64, yi:73, li:76, zhi:58, xin:75,
        imglist:[
          {name:"黄信",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huangxin/hx1.png"},
          {name:"黄信",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huangxin/hx2.png"},
          {name:"黄信",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huangxin/hx3.png"}
        ]
      },
      { name:"孙立", nick:"病尉迟", star:"地勇星", ren:67, yi:77, li:80, zhi:84, xin:76,
        imglist:[
          {name:"孙立",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunli/sl1.png"},
          {name:"孙立",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunli/sl2.png"},
          {name:"孙立",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunli/sl3.png"}
        ]
      },
      { name:"宣赞", nick:"丑郡马", star:"地杰星", ren:66, yi:74, li:77, zhi:57, xin:78,
        imglist:[
          {name:"宣赞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xuanzan/xz1.png"},
          {name:"宣赞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xuanzan/xz2.png"},
          {name:"宣赞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xuanzan/xz3.png"}
        ]
      },
      { name:"郝思文", nick:"井木犴", star:"地雄星", ren:65, yi:75, li:75, zhi:56, xin:77,
        imglist:[
          {name:"郝思文",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/haosiwen/hsw1.png"},
          {name:"郝思文",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/haosiwen/hsw2.png"},
          {name:"郝思文",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/haosiwen/hsw3.png"}
        ]
      },
      { name:"韩滔", nick:"百胜将", star:"地威星", ren:63, yi:74, li:74, zhi:55, xin:76,
        imglist:[
          {name:"韩滔",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/hantao/ht1.png"},
          {name:"韩滔",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/hantao/ht2.png"},
          {name:"韩滔",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/hantao/ht3.png"}
        ]
      },
      { name:"彭玘", nick:"天目将", star:"地英星", ren:64, yi:73, li:75, zhi:54, xin:76,
        imglist:[
          {name:"彭玘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/pengqi/pq1.png"},
          {name:"彭玘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/pengqi/pq2.png"},
          {name:"彭玘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/pengqi/pq3.png"}
        ]
      },
      { name:"单廷圭", nick:"圣水将", star:"地奇星", ren:62, yi:72, li:74, zhi:53, xin:75,
        imglist:[
          {name:"单廷圭",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shanyangui/syg1.png"},
          {name:"单廷圭",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shanyangui/syg2.png"},
          {name:"单廷圭",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shanyangui/syg3.png"}
        ]
      },
      { name:"魏定国", nick:"神火将", star:"地猛星", ren:61, yi:72, li:73, zhi:52, xin:74,
        imglist:[
          {name:"魏定国",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/weidingguo/wdg1.png"},
          {name:"魏定国",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/weidingguo/wdg2.png"},
          {name:"魏定国",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/weidingguo/wdg3.png"}
        ]
      },
      { name:"萧让", nick:"圣手书生", star:"地文星", ren:72, yi:74, li:80, zhi:76, xin:81,
        imglist:[
          {name:"萧让",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiaorang/xr1.png"},
          {name:"萧让",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiaorang/xr2.png"},
          {name:"萧让",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiaorang/xr3.png"}
        ]
      },
      { name:"裴宣", nick:"铁面孔目", star:"地正星", ren:86, yi:82, li:90, zhi:88, xin:92,
        imglist:[
          {name:"裴宣",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/peixuan/px1.png"},
          {name:"裴宣",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/peixuan/px2.png"},
          {name:"裴宣",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/peixuan/px3.png"}
        ]
      },
      { name:"欧鹏", nick:"摩云金翅", star:"地阔星", ren:70, yi:79, li:77, zhi:75, xin:84,
        imglist:[
          {name:"欧鹏",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/oupeng/op1.png"},
          {name:"欧鹏",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/oupeng/op2.png"},
          {name:"欧鹏",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/oupeng/op3.png"}
        ]
      },
      { name:"邓飞", nick:"火眼狻猊", star:"地阖星", ren:63, yi:81, li:62, zhi:66, xin:82,
        imglist:[
          {name:"邓飞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dengfei/df1.png"},
          {name:"邓飞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dengfei/df2.png"},
          {name:"邓飞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/dengfei/df3.png"}
        ]
      },
      { name:"燕顺", nick:"锦毛虎", star:"地强星", ren:60, yi:82, li:55, zhi:61, xin:83,
        imglist:[
          {name:"燕顺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanshun/ys1.png"},
          {name:"燕顺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanshun/ys2.png"},
          {name:"燕顺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanshun/ys3.png"}
        ]
      },
      { name:"杨林", nick:"锦豹子", star:"地暗星", ren:65, yi:78, li:63, zhi:79, xin:80,
        imglist:[
          {name:"杨林",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanglin/yl1.png"},
          {name:"杨林",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanglin/yl2.png"},
          {name:"杨林",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yanglin/yl3.png"}
        ]
      },
      { name:"凌振", nick:"轰天雷", star:"地轴星", ren:67, yi:74, li:71, zhi:78, xin:79,
        imglist:[
          {name:"凌振",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lingzhen/lz1.png"},
          {name:"凌振",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lingzhen/lz2.png"},
          {name:"凌振",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lingzhen/lz3.png"}
        ]
      },
      { name:"蒋敬", nick:"神算子", star:"地会星", ren:69, yi:76, li:70, zhi:84, xin:83,
        imglist:[
          {name:"蒋敬",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jiangjing/jj1.png"},
          {name:"蒋敬",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jiangjing/jj2.png"},
          {name:"蒋敬",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jiangjing/jj3.png"}
        ]
      },
      { name:"吕方", nick:"小温侯", star:"地佐星", ren:63, yi:77, li:68, zhi:61, xin:78,
        imglist:[
          {name:"吕方",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lvfang/lf1.png"},
          {name:"吕方",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lvfang/lf2.png"},
          {name:"吕方",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lvfang/lf3.png"}
        ]
      },
      { name:"郭盛", nick:"赛仁贵", star:"地佑星", ren:64, yi:77, li:67, zhi:60, xin:78,
        imglist:[
          {name:"郭盛",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/guosheng/gs1.png"},
          {name:"郭盛",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/guosheng/gs2.png"},
          {name:"郭盛",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/guosheng/gs3.png"}
        ]
      },
      { name:"安道全", nick:"神医", star:"地灵星", ren:85, yi:76, li:81, zhi:79, xin:82,
        imglist:[
          {name:"安道全",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/andaoquan/adq1.png"},
          {name:"安道全",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/andaoquan/adq2.png"},
          {name:"安道全",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/andaoquan/adq3.png"}
        ]
      },
      { name:"皇甫端", nick:"紫髯伯", star:"地兽星", ren:82, yi:75, li:80, zhi:77, xin:83,
        imglist:[
          {name:"皇甫端",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huangfuduan/hfd1.png"},
          {name:"皇甫端",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huangfuduan/hfd2.png"},
          {name:"皇甫端",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/huangfuduan/hfd3.png"}
        ]
      },
      { name:"王英", nick:"矮脚虎", star:"地微星", ren:42, yi:74, li:38, zhi:53, xin:67,
        imglist:[
          {name:"王英",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wangying/wy1.png"},
          {name:"王英",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wangying/wy2.png"},
          {name:"王英",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wangying/wy3.png"}
        ]
      },
      { name:"扈三娘", nick:"一丈青", star:"地慧星", ren:67, yi:75, li:78, zhi:62, xin:80,
        imglist:[
          {name:"扈三娘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/husanniang/hsn1.png"},
          {name:"扈三娘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/husanniang/hsn2.png"},
          {name:"扈三娘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/husanniang/hsn3.png"}
        ]
      },
      { name:"鲍旭", nick:"丧门神", star:"地暴星", ren:44, yi:73, li:46, zhi:54, xin:74,
        imglist:[
          {name:"鲍旭",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/baoxu/bx1.png"},
          {name:"鲍旭",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/baoxu/bx2.png"},
          {name:"鲍旭",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/baoxu/bx3.png"}
        ]
      },
      { name:"樊瑞", nick:"混世魔王", star:"地然星", ren:65, yi:76, li:60, zhi:78, xin:77,
        imglist:[
          {name:"樊瑞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/fanrui/fr1.png"},
          {name:"樊瑞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/fanrui/fr2.png"},
          {name:"樊瑞",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/fanrui/fr3.png"}
        ]
      },
      { name:"孔明", nick:"毛头星", star:"地猖星", ren:62, yi:77, li:56, zhi:57, xin:78,
        imglist:[
          {name:"孔明",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/kongming/km1.png"},
          {name:"孔明",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/kongming/km2.png"},
          {name:"孔明",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/kongming/km3.png"}
        ]
      },
      { name:"孔亮", nick:"独火星", star:"地狂星", ren:61, yi:76, li:55, zhi:56, xin:77,
        imglist:[
          {name:"孔亮",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/kongliang/kl1.png"},
          {name:"孔亮",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/kongliang/kl2.png"},
          {name:"孔亮",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/kongliang/kl3.png"}
        ]
      },
      { name:"项充", nick:"八臂哪吒", star:"地飞星", ren:51, yi:76, li:50, zhi:63, xin:77,
        imglist:[
          {name:"项充",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiangchong/xc1.png"},
          {name:"项充",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiangchong/xc2.png"},
          {name:"项充",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xiangchong/xc3.png"}
        ]
      },
      { name:"李衮", nick:"飞天大圣", star:"地走星", ren:50, yi:76, li:49, zhi:62, xin:77,
        imglist:[
          {name:"李衮",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ligun/lg1.png"},
          {name:"李衮",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ligun/lg2.png"},
          {name:"李衮",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/ligun/lg3.png"}
        ]
      },
      { name:"金大坚", nick:"玉臂匠", star:"地巧星", ren:74, yi:73, li:79, zhi:75, xin:82,
        imglist:[
          {name:"金大坚",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jindajian/jdj1.png"},
          {name:"金大坚",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jindajian/jdj2.png"},
          {name:"金大坚",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jindajian/jdj3.png"}
        ]
      },
      { name:"马麟", nick:"铁笛仙", star:"地明星", ren:64, yi:77, li:60, zhi:67, xin:78,
        imglist:[
          {name:"马麟",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/malin/ml1.png"},
          {name:"马麟",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/malin/ml2.png"},
          {name:"马麟",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/malin/ml3.png"}
        ]
      },
      { name:"童威", nick:"出洞蛟", star:"地进星", ren:64, yi:83, li:53, zhi:65, xin:84,
        imglist:[
          {name:"童威",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tongwei/tw1.png"},
          {name:"童威",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tongwei/tw2.png"},
          {name:"童威",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tongwei/tw3.png"}
        ]
      },
      { name:"童猛", nick:"翻江蜃", star:"地退星", ren:65, yi:84, li:54, zhi:66, xin:85,
        imglist:[
          {name:"童猛",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tongmeng/tm1.png"},
          {name:"童猛",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tongmeng/tm2.png"},
          {name:"童猛",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tongmeng/tm3.png"}
        ]
      },
      { name:"孟康", nick:"玉幡竿", star:"地满星", ren:60, yi:75, li:58, zhi:70, xin:76,
        imglist:[
          {name:"孟康",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/mengkang/mk1.png"},
          {name:"孟康",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/mengkang/mk2.png"},
          {name:"孟康",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/mengkang/mk3.png"}
        ]
      },
      { name:"侯健", nick:"通臂猿", star:"地遂星", ren:63, yi:74, li:57, zhi:73, xin:75,
        imglist:[
          {name:"侯健",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/houjian/hj1.png"},
          {name:"侯健",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/houjian/hj2.png"},
          {name:"侯健",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/houjian/hj3.png"}
        ]
      },
      { name:"陈达", nick:"跳涧虎", star:"地周星", ren:62, yi:78, li:59, zhi:58, xin:79,
        imglist:[
          {name:"陈达",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/chenda/cd1.png"},
          {name:"陈达",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/chenda/cd2.png"},
          {name:"陈达",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/chenda/cd3.png"}
        ]
      },
    { name:"杨春", nick:"白花蛇", star:"地隐星", ren:61, yi:77, li:58, zhi:57, xin:78,
      imglist:[
        {name:"杨春",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangchun/yc1.png"},
        {name:"杨春",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangchun/yc2.png"},
        {name:"杨春",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yangchun/yc3.png"}
      ]},
    { name:"郑天寿", nick:"白面郎君", star:"地异星", ren:62, yi:76, li:57, zhi:56, xin:77,
      imglist:[
        {name:"郑天寿",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhengtianshou/zts1.png"},
        {name:"郑天寿",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhengtianshou/zts2.png"},
        {name:"郑天寿",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhengtianshou/zts3.png"}
      ]},
    { name:"陶宗旺", nick:"九尾龟", star:"地理星", ren:68, yi:78, li:63, zhi:64, xin:81,
      imglist:[
        {name:"陶宗旺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/taozongwang/tzw1.png"},
        {name:"陶宗旺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/taozongwang/tzw2.png"},
        {name:"陶宗旺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/taozongwang/tzw3.png"}
      ]},
    { name:"宋清", nick:"铁扇子", star:"地俊星", ren:66, yi:75, li:72, zhi:60, xin:76,
      imglist:[
        {name:"宋清",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songqing/sq1.png"},
        {name:"宋清",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songqing/sq2.png"},
        {name:"宋清",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songqing/sq3.png"}
      ]},
    { name:"乐和", nick:"铁叫子", star:"地乐星", ren:71, yi:83, li:75, zhi:85, xin:84,
      imglist:[
        {name:"乐和",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yuehe/yh1.png"},
        {name:"乐和",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yuehe/yh2.png"},
        {name:"乐和",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yuehe/yh3.png"}
      ]},
    { name:"穆春", nick:"小遮拦", star:"地镇星", ren:59, yi:75, li:56, zhi:58, xin:76,
      imglist:[
        {name:"穆春",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/muchun/mc1.png"},
        {name:"穆春",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/muchun/mc2.png"},
        {name:"穆春",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/muchun/mc3.png"}
      ]},
    { name:"曹正", nick:"操刀鬼", star:"地羁星", ren:64, yi:79, li:61, zhi:74, xin:81,
      imglist:[
        {name:"曹正",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caozheng/cz1.png"},
        {name:"曹正",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caozheng/cz2.png"},
        {name:"曹正",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caozheng/cz3.png"}
      ]},
    { name:"宋万", nick:"云里金刚", star:"地魔星", ren:62, yi:76, li:54, zhi:55, xin:77,
      imglist:[
        {name:"宋万",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songwan/sw1.png"},
        {name:"宋万",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songwan/sw2.png"},
        {name:"宋万",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/songwan/sw3.png"}
      ]},
    { name:"杜迁", nick:"摸着天", star:"地妖星", ren:61, yi:75, li:53, zhi:54, xin:76,
      imglist:[
        {name:"杜迁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duqian/dq1.png"},
        {name:"杜迁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duqian/dq2.png"},
        {name:"杜迁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duqian/dq3.png"}
      ]},
    { name:"薛永", nick:"病大虫", star:"地幽星", ren:65, yi:80, li:60, zhi:63, xin:79,
      imglist:[
        {name:"薛永",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xueyong/xy1.png"},
        {name:"薛永",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xueyong/xy2.png"},
        {name:"薛永",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/xueyong/xy3.png"}
      ]},
    { name:"施恩", nick:"金眼彪", star:"地伏星", ren:63, yi:81, li:58, zhi:67, xin:82,
      imglist:[
        {name:"施恩",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shien/se1.png"},
        {name:"施恩",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shien/se2.png"},
        {name:"施恩",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shien/se3.png"}
      ]},
    { name:"李忠", nick:"打虎将", star:"地僻星", ren:59, yi:76, li:55, zhi:52, xin:74,
      imglist:[
        {name:"李忠",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lizhong/lz1.png"},
        {name:"李忠",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lizhong/lz2.png"},
        {name:"李忠",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lizhong/lz3.png"}
      ]},
    { name:"周通", nick:"小霸王", star:"地空星", ren:54, yi:72, li:47, zhi:51, xin:70,
      imglist:[
        {name:"周通",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhoutong/zt1.png"},
        {name:"周通",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhoutong/zt2.png"},
        {name:"周通",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhoutong/zt3.png"}
      ]},
    { name:"汤隆", nick:"金钱豹子", star:"地孤星", ren:48, yi:74, li:51, zhi:79, xin:66,
      imglist:[
        {name:"汤隆",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tanglong/tl1.png"},
        {name:"汤隆",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tanglong/tl2.png"},
        {name:"汤隆",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/tanglong/tl3.png"}
      ]},
    { name:"杜兴", nick:"鬼脸儿", star:"地全星", ren:70, yi:83, li:76, zhi:81, xin:86,
      imglist:[
        {name:"杜兴",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duxing/dx1.png"},
        {name:"杜兴",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duxing/dx2.png"},
        {name:"杜兴",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duxing/dx3.png"}
      ]},
    { name:"邹渊", nick:"出林龙", star:"地短星", ren:60, yi:79, li:56, zhi:62, xin:80,
      imglist:[
        {name:"邹渊",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zouyuan/zy1.png"},
        {name:"邹渊",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zouyuan/zy2.png"},
        {name:"邹渊",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zouyuan/zy3.png"}
      ]},
    { name:"邹润", nick:"独角龙", star:"地角星", ren:61, yi:78, li:54, zhi:60, xin:79,
      imglist:[
        {name:"邹润",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zourun/zr1.png"},
        {name:"邹润",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zourun/zr2.png"},
        {name:"邹润",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zourun/zr3.png"}
      ]},
    { name:"朱贵", nick:"旱地忽律", star:"地囚星", ren:63, yi:80, li:58, zhi:82, xin:84,
      imglist:[
        {name:"朱贵",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhugui/zg1.png"},
        {name:"朱贵",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhugui/zg2.png"},
        {name:"朱贵",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhugui/zg3.png"}
      ]},
    { name:"朱富", nick:"笑面虎", star:"地藏星", ren:66, yi:81, li:62, zhi:76, xin:82,
      imglist:[
        {name:"朱富",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhufu/zf1.png"},
        {name:"朱富",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhufu/zf2.png"},
        {name:"朱富",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhufu/zf3.png"}
      ]},
    { name:"蔡福", nick:"铁臂膊", star:"地平星", ren:59, yi:76, li:64, zhi:72, xin:75,
      imglist:[
        {name:"蔡福",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caifu/cf1.png"},
        {name:"蔡福",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caifu/cf2.png"},
        {name:"蔡福",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caifu/cf3.png"}
      ]},
    { name:"蔡庆", nick:"一枝花", star:"地损星", ren:60, yi:75, li:63, zhi:70, xin:76,
      imglist:[
        {name:"蔡庆",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caiqing/cq1.png"},
        {name:"蔡庆",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caiqing/cq2.png"},
        {name:"蔡庆",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/caiqing/cq3.png"}
      ]},
    { name:"李立", nick:"催命判官", star:"地奴星", ren:46, yi:74, li:50, zhi:68, xin:72,
      imglist:[
        {name:"李立",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lili/ll1.png"},
        {name:"李立",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lili/ll2.png"},
        {name:"李立",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/lili/ll3.png"}
      ]},
    { name:"李云", nick:"青眼虎", star:"地察星", ren:71, yi:77, li:69, zhi:63, xin:81,
      imglist:[
        {name:"李云",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liyun/ly1.png"},
        {name:"李云",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liyun/ly2.png"},
        {name:"李云",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/liyun/ly3.png"}
      ]},
    { name:"焦挺", nick:"没面目", star:"地恶星", ren:58, yi:76, li:52, zhi:55, xin:78,
      imglist:[
        {name:"焦挺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jiaoting/jt1.png"},
        {name:"焦挺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jiaoting/jt2.png"},
        {name:"焦挺",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/jiaoting/jt3.png"}
      ]},
    { name:"石勇", nick:"石将军", star:"地丑星", ren:55, yi:78, li:53, zhi:54, xin:79,
      imglist:[
        {name:"石勇",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shiyong/sy1.png"},
        {name:"石勇",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shiyong/sy2.png"},
        {name:"石勇",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shiyong/sy3.png"}
      ]},
    { name:"孙新", nick:"小尉迟", star:"地数星", ren:64, yi:82, li:65, zhi:73, xin:83,
      imglist:[
        {name:"孙新",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunxin/sx1.png"},
        {name:"孙新",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunxin/sx2.png"},
        {name:"孙新",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunxin/sx3.png"}
      ]},
    { name:"顾大嫂", nick:"母大虫", star:"地阴星", ren:65, yi:84, li:48, zhi:74, xin:85,
      imglist:[
        {name:"顾大嫂",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gudasao/gds1.png"},
        {name:"顾大嫂",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gudasao/gds2.png"},
        {name:"顾大嫂",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/gudasao/gds3.png"}
      ]},
    { name:"张青", nick:"菜园子", star:"地刑星", ren:52, yi:77, li:55, zhi:66, xin:76,
      imglist:[
        {name:"张青",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangqing/zq1.png"},
        {name:"张青",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangqing/zq2.png"},
        {name:"张青",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/zhangqing/zq3.png"}
      ]},
    { name:"孙二娘", nick:"母夜叉", star:"地壮星", ren:45, yi:78, li:44, zhi:71, xin:77,
      imglist:[
        {name:"孙二娘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunerniang/sen1.png"},
        {name:"孙二娘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunerniang/sen2.png"},
        {name:"孙二娘",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/sunerniang/sen3.png"}
      ]},
    { name:"王定六", nick:"活闪婆", star:"地劣星", ren:67, yi:79, li:61, zhi:65, xin:80,
      imglist:[
        {name:"王定六",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wangdingliu/wdl1.png"},
        {name:"王定六",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wangdingliu/wdl2.png"},
        {name:"王定六",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/wangdingliu/wdl3.png"}
      ]},
    { name:"郁保四", nick:"险道神", star:"地健星", ren:56, yi:73, li:57, zhi:61, xin:70,
      imglist:[
        {name:"郁保四",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yubaosi/ybs1.png"},
        {name:"郁保四",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yubaosi/ybs2.png"},
        {name:"郁保四",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/yubaosi/ybs3.png"}
      ]},
    { name:"白胜", nick:"白日鼠", star:"地耗星", ren:54, yi:70, li:51, zhi:64, xin:62,
      imglist:[
        {name:"白胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/baisheng/bs1.png"},
        {name:"白胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/baisheng/bs2.png"},
        {name:"白胜",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/baisheng/bs3.png"}
      ]},
    { name:"时迁", nick:"鼓上蚤", star:"地贼星", ren:53, yi:76, li:42, zhi:85, xin:78,
      imglist:[
        {name:"时迁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shiqian/sq1.png"},
        {name:"时迁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shiqian/sq2.png"},
        {name:"时迁",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/shiqian/sq3.png"}
      ]},
    { name:"段景住", nick:"金毛犬", star:"地狗星", ren:51, yi:68, li:47, zhi:58, xin:65,
      imglist:[
        {name:"段景住",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duanjingzhu/djz1.png"},
        {name:"段景住",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duanjingzhu/djz2.png"},
        {name:"段景住",img:"https://shuihu2026.oss-cn-guangzhou.aliyuncs.com/img/duanjingzhu/djz3.png"}
      ]}
    ]
  }
})