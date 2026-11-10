/**
 * AI 军师问答服务 —— 前端与云函数的唯一边界
 * ------------------------------------------------------------------
 * 页面不直接调用 wx.cloud，也不接触 API Key。
 * 优先走 cloudfunction/ai 的真实大模型；云开发未启用、云函数未部署、
 * 未配置密钥或网络失败时，自动回退到本地水浒知识库，并带回失败原因。
 */
const config = require('../config/index.js')
const heroService = require('./heroService.js')
const heroQuotes = require('../data/heroQuotes.js')
const quizFacts = require('../data/quizFacts.js')

const MAX_INPUT = config.AI.maxInput
const MAX_HISTORY = config.AI.maxHistory
const CLOUD_RETRY_MS = 5 * 60 * 1000

let cloudFailedAt = 0

function isCloudReady() {
  // 云端刚失败过就直接走本地，避免每次提问都等一次云函数超时
  if (cloudFailedAt && Date.now() - cloudFailedAt < CLOUD_RETRY_MS) return false
  return !!(config.AI.enabled && config.CLOUD.enabled && config.CLOUD.env && wx.cloud)
}

/** 重新部署云函数后，点「清空」或「自检」即可立即重试在线 AI */
function retryCloud() {
  cloudFailedAt = 0
}

function normalizeMessages(messages) {
  const list = Array.isArray(messages) ? messages : []
  return list
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_HISTORY)
    .map(m => ({ role: m.role, content: String(m.content).trim().slice(0, MAX_INPUT) }))
    .filter(m => m.content)
}

/** 本地兜底：按人物、常识、知识卡依次匹配，不联网也可用 */
function localAnswer(question) {
  const q = String(question || '').trim()
  if (!q) return '请先输入想问的问题。'

  const hero = heroService.getAll().find(h => q.includes(h.name) || q.includes(h.nick))
  if (hero) {
    const quote = heroQuotes[hero.name] || {}
    const trail = (hero.sceneList || []).map(s => s.name).join(' → ')
    return [
      `${hero.nick}${hero.name}，${hero.star}，图鉴第 ${heroService.getSeatIndex(hero.name)} 位。`,
      quote.summary || '本传资料整理中。',
      `本传行迹：${trail || '暂无'}。`,
      '（本地资料作答；部署 AI 云函数后可继续追问细节。）'
    ].join('\n')
  }

  if (/座次|排座|排名|第几|天罡|地煞|一百零八|108/.test(q)) {
    return '梁山排座次见《水浒传》第七十一回「忠义堂石碣受天文」：天罡三十六员、地煞七十二员，合计一百八将。宋江居天魁星首位，卢俊义次之，吴用、公孙胜分列第三、第四。石碣名次是小说中的天文排定，并非按战功或武艺高低排序。（本地资料作答）'
  }

  if (/作者|成书|施耐庵|罗贯中|谁写|版本|朝代/.test(q)) {
    return '《水浒传》通行本题署「施耐庵、罗贯中」，一般认为由施耐庵集撰、罗贯中编次，成书于元末明初，此前的水浒故事已在宋元话本、杂剧与瓦舍说书中长期流传。常见版本有百回本、百二十回本与金圣叹删定的七十回本。（本地资料作答）'
  }

  if (/北宋|宋代|宋朝|地图|地名|在哪|今地/.test(q)) {
    return '剧情页的「北宋舆图」按小说地望归并了 24 处州府，点任意地名可看简介与今地对照，例如东京汴梁在今河南开封、江州在今江西九江、渭州在今甘肃平凉。示意图用相对方位，不是实测经纬度。（本地资料作答）'
  }

  const keys = q.replace(/[^\u4e00-\u9fa5A-Za-z0-9]/g, '')
  const fact = quizFacts.find(item => {
    const title = String(item.title || '').replace(/[^\u4e00-\u9fa5A-Za-z0-9]/g, '')
    return keys.length >= 2 && (keys.includes(title.slice(0, 2)) || title.includes(keys.slice(0, 2)))
  })
  if (fact) {
    return `${fact.title}：${fact.text}\n冷知识：${fact.fact}\n出处：${fact.source}（本地资料作答）`
  }

  return [
    '本地资料暂未收录这个问题。可以试试这些问法：',
    '· 某位好汉的名字或绰号，如「宋江是个什么样的人」',
    '· 「梁山座次怎么排」「水浒是谁写的」',
    '· 宋代小知识，如「瓦舍勾栏」「交子」「夜市」',
    '部署 AI 云函数并配置密钥后，即可开放自由问答。'
  ].join('\n')
}

/** 云端失败原因：优先用云函数给的可读提示，旧版云函数则按错误码兜底 */
function reasonOf(err) {
  if (err && err.aiMessage) return err.aiMessage
  const code = String((err && err.aiCode) || (err && err.message) || '')
  if (code.includes('AI_NOT_CONFIGURED')) return '云函数未读到配置：确认环境变量已保存并发布到当前版本'
  if (code.includes('AI_MODEL_MISSING')) return '未配置 AI_MODEL：DeepSeek 请填 deepseek-chat'
  if (code.includes('AI_UPSTREAM_ERROR')) return '模型服务返回错误：多为 API Key 或模型名不对'
  if (code.includes('AI_TIMEOUT') || /timeout/i.test(code)) return '模型响应超时：把云函数执行超时调到 30 秒'
  if (/FUNCTION_NOT_FOUND|cloud\.callFunction|-50100|not found/i.test(code)) {
    return 'ai 云函数未部署，或部署环境与 CLOUD.env 不一致'
  }
  return '在线 AI 暂不可用' + (code ? '（' + code.slice(0, 40) + '）' : '')
}

/**
 * @param {Array<{role: string, content: string}>} messages 含最新一条用户提问的对话历史
 * @returns {Promise<{text: string, source: 'ai'|'local', degraded: boolean, reason: string}>}
 */
function ask(messages) {
  const history = normalizeMessages(messages)
  const question = history.length ? history[history.length - 1].content : ''
  const fallback = (degraded, reason) => Promise.resolve({
    text: localAnswer(question),
    source: 'local',
    degraded,
    reason: reason || ''
  })

  if (!question) return Promise.resolve({ text: '请先输入想问的问题。', source: 'local', degraded: false, reason: '' })
  if (!isCloudReady()) return fallback(false)

  return wx.cloud.callFunction({
    name: config.AI.functionName,
    data: { messages: history }
  }).then(res => {
    const body = res && res.result
    if (!body || !body.ok || !body.data || !body.data.text) {
      const err = new Error((body && body.error) || 'AI_EMPTY')
      err.aiCode = (body && body.error) || 'AI_EMPTY'
      err.aiMessage = body && body.message
      throw err
    }
    return { text: String(body.data.text).trim(), source: 'ai', degraded: false, reason: '' }
  }).catch(err => {
    cloudFailedAt = Date.now()
    return fallback(true, reasonOf(err))
  })
}

/** 连接自检：确认云函数读到的配置、模型名与上游连通情况（不含密钥） */
function diagnose() {
  if (!config.CLOUD.enabled || !config.CLOUD.env || !wx.cloud) {
    return Promise.resolve({
      configured: false,
      reachable: false,
      message: '云开发未启用：请把 CLOUD.enabled 设为 true 并填环境 ID'
    })
  }
  return wx.cloud.callFunction({
    name: config.AI.functionName,
    data: { action: 'diagnose' }
  }).then(res => {
    const body = res && res.result
    if (body && body.ok && body.data) return body.data
    return {
      configured: false,
      reachable: false,
      message: (body && body.message) || ('云函数返回异常：' + ((body && body.error) || '无内容'))
    }
  }).catch(err => ({
    configured: false,
    reachable: false,
    message: '无法调用 ai 云函数：' +
      String((err && (err.errMsg || err.message)) || '请确认已部署到当前环境').slice(0, 90)
  }))
}

module.exports = {
  isCloudReady,
  retryCloud,
  normalizeMessages,
  localAnswer,
  ask,
  diagnose,
  MAX_INPUT
}
