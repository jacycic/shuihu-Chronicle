/**
 * 北宋示意舆图（纯数据层）
 * ------------------------------------------------------------------
 * x / y 是示意图上的百分比位置，只表达「相对方位」，不是实测经纬度。
 * 北宋州府与水浒地望并不完全重合，本表按小说叙事习惯归并，供剧情定位用。
 * major：地图上常显地名；其余仅在为当前场景时显示名称。
 * rules：场景名 → 州府，按顺序匹配，具体地名要排在泛称之前。
 */
const places = [
  { key: 'bianliang', name: '东京汴梁', x: 45, y: 43, major: true, brief: '北宋都城，殿帅府、蔡京府与御营所在' },
  { key: 'liangshan', name: '梁山泊', x: 61, y: 37, major: true, brief: '郓州水泊，一百八将排座次、聚义之地' },
  { key: 'jiangzhou', name: '江州', x: 55, y: 68, major: true, brief: '浔阳江畔，宋江题反诗、梁山劫法场处' },
  { key: 'hangzhou', name: '杭州', x: 77, y: 73, major: true, brief: '征方腊终点，六和寺、涌金门所在' },
  { key: 'daming', name: '大名府', x: 46, y: 23, major: false, brief: '河北重镇，卢俊义故里与梁中书治所' },
  { key: 'yuncheng', name: '郓城', x: 57, y: 40, major: false, brief: '宋江故里，郓城县衙、东溪村所在' },
  { key: 'qingzhou', name: '青州', x: 71, y: 32, major: false, brief: '京东东路，清风山、二龙山、桃花山所在' },
  { key: 'cangzhou', name: '沧州', x: 59, y: 19, major: false, brief: '林冲发配之地，柴进庄院所在' },
  { key: 'jizhou', name: '蓟州', x: 62, y: 10, major: false, brief: '燕北州郡，石秀、时迁、公孙胜活动之地' },
  { key: 'dengzhou', name: '登州', x: 84, y: 28, major: false, brief: '胶东登州，解珍解宝与顾大嫂故里' },
  { key: 'taian', name: '泰安州', x: 66, y: 33, major: false, brief: '泰山脚下，燕青打擂之处' },
  { key: 'dongping', name: '东平府', x: 63, y: 36, major: false, brief: '董平镇守之地，祝家庄、扈家庄一带' },
  { key: 'dongchang', name: '东昌府', x: 60, y: 29, major: false, brief: '张清没羽箭飞石打将之处' },
  { key: 'gaotang', name: '高唐州', x: 54, y: 27, major: false, brief: '柴进陷狱、李逵下井救人之地' },
  { key: 'weizhou', name: '渭州', x: 17, y: 39, major: false, brief: '鲁达拳打镇关西之地' },
  { key: 'wutai', name: '五台山', x: 37, y: 17, major: false, brief: '鲁智深剃度的文殊院所在' },
  { key: 'mengzhou', name: '孟州', x: 39, y: 45, major: false, brief: '武松醉打蒋门神、十字坡所在' },
  { key: 'yanggu', name: '阳谷景阳冈', x: 49, y: 40, major: false, brief: '武松打虎、狮子楼所在' },
  { key: 'yizhou', name: '沂州', x: 68, y: 41, major: false, brief: '李逵背母、沂岭杀虎之地' },
  { key: 'sizhou', name: '泗州', x: 62, y: 56, major: false, brief: '淮水重镇，卢俊义结局之地' },
  { key: 'runzhou', name: '润州', x: 70, y: 62, major: false, brief: '长江下游，征方腊渡江首战之地' },
  { key: 'suzhou', name: '苏州', x: 79, y: 65, major: false, brief: '江南重镇，水军征战、太仓港口所在' },
  { key: 'muzhou', name: '睦州清溪', x: 74, y: 79, major: false, brief: '方腊老巢，乌龙岭、昱岭关所在' },
  { key: 'shaohua', name: '少华山', x: 30, y: 37, major: false, brief: '史进、朱武聚义的华州山寨' }
]

// 具体地名优先；「梁山」类泛称放前，避免被后面的州府关键词抢走
const rules = [
  { keys: ['梁山', '水泊', '聚义厅', '金沙滩', '断金亭', '石碣村', '蓼儿洼', '水寨', '山寨'], place: 'liangshan' },
  { keys: ['郓城', '宋家庄', '东溪村', '黄泥', '七星聚义'], place: 'yuncheng' },
  { keys: ['浔阳', '江州', '无为军', '琵琶亭', '揭阳', '江面', '江边渡口'], place: 'jiangzhou' },
  { keys: ['杭州', '钱塘', '六和寺', '涌金门', '西湖', '候潮门', '北关'], place: 'hangzhou' },
  { keys: ['睦州', '清溪', '乌龙岭', '昱岭关', '歙州', '方腊皇宫', '德清', '独松关'], place: 'muzhou' },
  { keys: ['苏州', '太湖', '太仓', '昆山', '常熟'], place: 'suzhou' },
  { keys: ['润州', '丹徒', '扬子江', '建康', '宣州', '常州', '镇江', '征方腊'], place: 'runzhou' },
  { keys: ['大名', '卢府', '死牢', '刑场', '校场', '牢狱', '大牢'], place: 'daming' },
  { keys: ['沧州', '柴府'], place: 'cangzhou' },
  { keys: ['青州', '清风', '二龙山', '桃花山', '白虎山', '孔家庄', '对影山', '芒砀山', '白虎山前'], place: 'qingzhou' },
  { keys: ['蓟州', '翠屏山', '饮马川', '玉田', '塞外'], place: 'jizhou' },
  { keys: ['登州', '登云'], place: 'dengzhou' },
  { keys: ['泰安', '擂台'], place: 'taian' },
  { keys: ['东平', '独龙冈', '祝家庄', '扈家庄', '李家庄', '曾头市'], place: 'dongping' },
  { keys: ['东昌', '凌州', '济州'], place: 'dongchang' },
  { keys: ['高唐', '二仙山'], place: 'gaotang' },
  { keys: ['渭州', '潘家酒楼', '铁匠铺'], place: 'weizhou' },
  { keys: ['五台山', '文殊院', '出家学道', '二仙山道观'], place: 'wutai' },
  { keys: ['孟州', '快活林', '十字坡', '飞云浦', '安平寨', '乡村客店', '路边客栈'], place: 'mengzhou' },
  { keys: ['景阳冈', '阳谷', '狮子楼'], place: 'yanggu' },
  { keys: ['沂'], place: 'yizhou' },
  { keys: ['泗州', '淮河'], place: 'sizhou' },
  { keys: ['少华', '史家庄', '华阴', '蒲东', '关胜军中'], place: 'shaohua' },
  { keys: ['汴梁', '东京', '开封', '蔡京', '皇宫', '御营', '御马监', '徐府', '王都尉', '火药局', '朝廷内府', '白虎堂', '殿帅府', '勾栏坊', '徐宁宅院', '徐宁家中', '御马'], place: 'bianliang' },
  { keys: ['陈州', '颍州', '潭州', '潭州城', '汝宁', '保定'], place: 'runzhou' },
  { keys: ['帐', '阵前', '军营', '战场', '对阵', '公堂', '库房', '马场', '船厂', '基建', '步军', '中军', '营中', '帐下', '关胜军中', '阵前突击', '酒店内'], place: 'liangshan' }
]

/**
 * 地名小窗资料（按 key 索引，与 places 解耦，便于单独校订）
 * ------------------------------------------------------------------
 * type：地名性质；modern：对应今天的地方；intro：地理 / 建置简介；
 * note：小说地望与历史沿革的差异提示（可选）。
 * 今地依通行地理沿革整理，水浒地望与北宋实际建置并不完全对应，
 * 供科普阅读，不作考据依据。
 */
const placeInfo = {
  bianliang: { type: '北宋都城', modern: '河南省开封市', intro: '北宋东京开封府，又称汴京，是当时的政治与商业中心，殿帅府、大相国寺皆在城中。', note: '今开封城下叠压着宋都遗址，州桥、开封府等景点为后世复建。' },
  liangshan: { type: '水泊山寨', modern: '山东省济宁市梁山县，水泊遗存主要在东平湖一带', intro: '黄河决溢汇成的大片泽国，小说中一百八将聚义、排座次之地。', note: '宋以后水泊逐渐淤积，今天已无小说里「八百里水泊」的规模。' },
  jiangzhou: { type: '州府城', modern: '江西省九江市', intro: '长江南岸的州城，宋江在此醉酒题反诗，梁山好汉大闹江州劫法场。', note: '浔阳楼今在九江长江边，为后世重建。' },
  hangzhou: { type: '州府城', modern: '浙江省杭州市', intro: '北宋两浙路重镇，征方腊的终点，六和寺、涌金门皆在城中。', note: '南宋时升为临安府，成为行在所在。' },
  daming: { type: '府城（北宋北京）', modern: '河北省邯郸市大名县', intro: '北宋四京之一的北京大名府，河北重镇，卢俊义故里与梁中书治所。', note: '宋大名府城遗址在今大名县东北，与明清城址不在一处。' },
  yuncheng: { type: '县邑', modern: '山东省菏泽市郓城县', intro: '宋江、晁盖故里，郓城县衙、东溪村、黄泥冈的故事都在这片地面展开。' },
  qingzhou: { type: '州府城', modern: '山东省潍坊市青州市', intro: '京东东路重镇，清风山、二龙山、桃花山三山聚义之地。' },
  cangzhou: { type: '州郡', modern: '河北省沧州市', intro: '林冲发配之地，草料场、山神庙与柴进庄院故事的发生地。' },
  jizhou: { type: '州郡', modern: '天津市蓟州区', intro: '燕山南麓州城，石秀、杨雄、时迁与公孙胜等人的活动范围。', note: '小说中的蓟州地望与今天区划略有出入。' },
  dengzhou: { type: '沿海州郡', modern: '山东省烟台市蓬莱区一带', intro: '胶东沿海州城，解珍解宝猎虎、孙立孙新大劫牢的所在。' },
  taian: { type: '州郡 · 山岳', modern: '山东省泰安市', intro: '泰山脚下的州城，东岳庙香火最盛，燕青在此打擂。' },
  dongping: { type: '府城', modern: '山东省泰安市东平县', intro: '董平镇守的州城，邻近梁山泊与祝家庄、扈家庄。' },
  dongchang: { type: '府城', modern: '山东省聊城市', intro: '张清以没羽箭飞石连打梁山十五员好汉之地。', note: '「东昌府」为小说称谓，明清才成为正式府名。' },
  gaotang: { type: '州郡', modern: '山东省聊城市高唐县', intro: '柴进陷狱、李逵下井救人、公孙胜斗法破高廉之地。' },
  weizhou: { type: '西北边州', modern: '甘肃省平凉市', intro: '西北边地州城，鲁达任提辖、拳打镇关西之地。', note: '小说把渭州写成经略府所在，与北宋实际边防建置略有出入。' },
  wutai: { type: '山岳 · 寺院', modern: '山西省忻州市五台县', intro: '文殊院所在，鲁智深剃度出家、醉打山门之地。' },
  mengzhou: { type: '州郡', modern: '河南省焦作市孟州市', intro: '武松发配之地，十字坡、快活林、醉打蒋门神皆在其境。' },
  yanggu: { type: '县邑 · 山冈', modern: '山东省聊城市阳谷县', intro: '武松打虎的景阳冈与狮子楼所在，武大郎卖炊饼的县城。' },
  yizhou: { type: '州郡', modern: '山东省临沂市', intro: '沂岭山区，李逵背母、沂岭杀虎之地。' },
  sizhou: { type: '淮上州郡', modern: '江苏省淮安市盱眙县、安徽省宿州市泗县一带', intro: '淮水与汴河交汇的重镇，卢俊义结局、征方腊回师经行之地。', note: '古泗州城清康熙年间沉入洪泽湖，今已不在地面。' },
  runzhou: { type: '沿江州府', modern: '江苏省镇江市', intro: '长江下游渡口，征方腊渡江首战之地。' },
  suzhou: { type: '江南州府', modern: '江苏省苏州市', intro: '江南重镇，水军征战、太仓港口所在。' },
  muzhou: { type: '州县 · 关隘', modern: '浙江省杭州市淳安县（千岛湖一带）', intro: '方腊故里与最后据点，乌龙岭、昱岭关鏖战之地。', note: '北宋睦州后改严州，清溪旧县治今已没入千岛湖。' },
  shaohua: { type: '山岳 · 山寨', modern: '陕西省渭南市华州区', intro: '史进、朱武、陈达、杨春聚义的华州山寨。', note: '少华山紧邻西岳华山，与小说所写方位略有出入。' }
}

module.exports = { places, rules, placeInfo }
