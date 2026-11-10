/**
 * AI 军师问答云函数
 * ------------------------------------------------------------------
 * 前端只通过 services/aiService.js 传 { messages: [{role, content}] }，
 * 这里调用 OpenAI 兼容的 Chat Completions 接口，密钥只从环境变量读取，
 * 不写进代码库，也不返回给小程序端。
 *
 * 环境变量（云开发控制台 → 云函数 ai → 版本配置）：
 *   AI_API_KEY   必填，大模型 API Key
 *   AI_BASE_URL  必填，OpenAI 兼容根地址
 *   AI_MODEL     建议必填；未填时按地址推断（deepseek-chat / glm-4-flash / hunyuan-turbo）
 *
 * 兼容多家：
 *   DeepSeek  https://api.deepseek.com/v1
 *   智谱 GLM  https://open.bigmodel.cn/api/paas/v4  （注意是 paas，不是 pass）
 *   混元      https://api.hunyuan.cloud.tencent.com/v1
 * 智谱的 id.secret 形式密钥会自动转成 JWT；也可直接传新版 API Key。
 * 另支持 action='diagnose' 做连接自检，返回配置与连通情况（不含密钥）。
 * 建议把云函数超时时间调到 30 秒（见 README）。
 */
const cloud = require('wx-server-sdk')
const https = require('https')
const crypto = require('crypto')
const { URL } = require('url')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const SYSTEM_PROMPT = [
  '你是「水浒风云录」小程序里的 AI 军师「智多星」，专答《水浒传》与宋代文化相关问题。',
  '用简体中文，语气亲切但考据谨慎；优先依据通行百回本原著，注意区分小说情节与史实。',
  '不确定时明说「原著未详」，不要编造回目、原文、人物或数据；答案控制在 300 字以内，可分点。',
  '与《水浒传》、宋代文化无关，或涉及人身攻击、违法内容的提问，礼貌拒答并引导回水浒话题。'
].join('')

const MAX_INPUT = 500
const MAX_ROUNDS = 10
const TIMEOUT_MS = 25000
const RATE_WINDOW = 60 * 1000
const RATE_LIMIT = 20

// 单实例内的轻量限流；生产环境如需严格配额，改用数据库计数
const hits = new Map()

function allow(openid) {
  const key = openid || 'anon'
  const now = Date.now()
  const list = (hits.get(key) || []).filter(ts => now - ts < RATE_WINDOW)
  if (list.length >= RATE_LIMIT) return false
  list.push(now)
  hits.set(key, list)
  if (hits.size > 500) hits.clear()
  return true
}

function cleanMessages(list) {
  if (!Array.isArray(list)) return []
  return list
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_ROUNDS)
    .map(m => ({ role: m.role, content: m.content.trim().slice(0, MAX_INPUT) }))
    .filter(m => m.content)
}

function fail(code) {
  const err = new Error(code)
  err.code = code
  return err
}

/** 智谱地址常被误写成 /api/pass/v4，这里自动纠正为官方 /api/paas/v4 */
function normalizeBaseURL(baseURL) {
  let url = String(baseURL || '').trim().replace(/\/+$/, '')
  const corrected = /\/api\/pass\/v4/i.test(url)
  if (corrected) url = url.replace(/\/api\/pass\/v4/i, '/api/paas/v4')
  return { url, corrected }
}

/** 允许直接填完整 /chat/completions 地址，不重复拼接 */
function endpointOf(baseURL) {
  const fixed = normalizeBaseURL(baseURL)
  const full = /\/chat\/completions$/.test(fixed.url)
    ? fixed.url
    : fixed.url + '/chat/completions'
  try {
    return new URL(full)
  } catch (e) {
    throw fail('AI_BAD_BASEURL')
  }
}

function base64url(value) {
  const raw = Buffer.isBuffer(value) ? value : Buffer.from(JSON.stringify(value))
  return raw.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** 智谱老式 API Key（id.secret）需要 HS256 签出 JWT */
function zhipuToken(apiKey) {
  const dot = apiKey.indexOf('.')
  const id = apiKey.slice(0, dot)
  const secret = apiKey.slice(dot + 1)
  const now = Date.now()
  const unsigned = base64url({ alg: 'HS256', sign_type: 'SIGN' }) + '.' +
    base64url({ api_key: id, exp: now + 3600000, timestamp: now })
  const signature = crypto.createHmac('sha256', secret).update(unsigned).digest('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  return unsigned + '.' + signature
}

function isZhipu(baseURL) {
  return /bigmodel|zhipu/i.test(baseURL || '')
}

function authModeOf(apiKey, baseURL) {
  return isZhipu(baseURL) && String(apiKey || '').includes('.')
    ? 'JWT（id.secret 签名）'
    : 'API Key'
}

function authHeader(apiKey, baseURL) {
  if (authModeOf(apiKey, baseURL).startsWith('JWT')) {
    return 'Bearer ' + zhipuToken(apiKey)
  }
  return 'Bearer ' + apiKey
}

/** 兼容不同厂商：地址是 DeepSeek / 智谱就不能再用混元的模型名 */
function resolveModel(baseURL) {
  if (process.env.AI_MODEL) return process.env.AI_MODEL
  const url = String(baseURL || '')
  if (/deepseek/i.test(url)) return 'deepseek-chat'
  if (isZhipu(url)) return 'glm-4-flash'
  if (/hunyuan|tencent/i.test(url)) return 'hunyuan-turbo'
  return ''
}

function configSnapshot() {
  const baseURL = process.env.AI_BASE_URL || ''
  const apiKey = process.env.AI_API_KEY || ''
  let endpoint = ''
  let host = ''
  let corrected = false
  try {
    const url = endpointOf(baseURL)
    host = url.host
    endpoint = url.pathname + url.search
    corrected = normalizeBaseURL(baseURL).corrected
  } catch (e) {
    endpoint = '(地址不合法)'
    host = String(baseURL).slice(0, 60)
  }
  return {
    hasKey: !!apiKey,
    baseURL: host,
    endpoint,
    corrected,
    authMode: authModeOf(apiKey, baseURL),
    model: resolveModel(baseURL)
  }
}

/** 把机器错误码翻成用户能照着改的中文提示 */
function describeError(err) {
  const code = (err && err.code) || 'AI_UNKNOWN_ERROR'
  const detail = err && err.upstream ? '（' + err.upstream + '）' : ''
  if (code === 'AI_NOT_CONFIGURED') return '云函数未读到 AI_API_KEY / AI_BASE_URL：请确认版本环境变量已保存并发布'
  if (code === 'AI_BAD_BASEURL') return 'AI_BASE_URL 不是合法地址：请填完整 https:// 开头的地址'
  if (code === 'AI_MODEL_MISSING') return '未配置 AI_MODEL，且地址无法推断模型'
  if (code === 'AI_TIMEOUT') return '模型响应超时：请把云函数执行超时调到 30 秒'
  if (code === 'AI_NETWORK_ERROR') return '云函数访问模型服务失败：检查 AI_BASE_URL 与网络'
  if (code === 'AI_BAD_RESPONSE') return '模型服务返回内容无法解析'
  if (code === 'AI_UPSTREAM_ERROR') {
    if (err.status === 401 || err.status === 403) return 'API Key 无效或鉴权方式不对' + detail
    if (err.status === 400) return '请求被拒：模型名或参数有误' + detail
    if (err.status === 404) return '接口路径不存在：智谱应填 /api/paas/v4（是 paas 不是 pass）' + detail
    if (err.status === 402 || err.status === 429) return '账户额度不足或调用过于频繁' + detail
    if (err.status >= 500) return '模型服务返回 HTTP ' + err.status + '：多为地址路径不对或上游异常' + detail
    return '模型服务返回 HTTP ' + (err.status || '未知') + detail
  }
  return 'AI 服务暂时不可用（' + code + '）'
}

function callModel(messages, maxTokens) {
  const apiKey = process.env.AI_API_KEY
  const baseURL = process.env.AI_BASE_URL
  const model = resolveModel(baseURL)
  if (!apiKey || !baseURL) throw fail('AI_NOT_CONFIGURED')
  // 先校验地址，避免「地址不合法」被误报成「缺模型」
  const url = endpointOf(baseURL)
  if (!model) throw fail('AI_MODEL_MISSING')
  const payload = JSON.stringify({
    model,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }].concat(messages),
    temperature: 0.7,
    max_tokens: maxTokens || 700,
    stream: false
  })
  const options = {
    hostname: url.hostname,
    port: url.port || 443,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      Authorization: authHeader(apiKey, baseURL)
    },
    timeout: TIMEOUT_MS
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let raw = ''
      res.setEncoding('utf8')
      res.on('data', chunk => {
        raw += chunk
        if (raw.length > 2000000) req.destroy(fail('AI_RESPONSE_TOO_LARGE'))
      })
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          const err = fail('AI_UPSTREAM_ERROR')
          err.status = res.statusCode
          try {
            const parsed = JSON.parse(raw)
            err.upstream = String((parsed && parsed.error && parsed.error.message) || '').slice(0, 160)
          } catch (e) {
            err.upstream = String(raw || '').replace(/<[^>]*>/g, ' ').trim().slice(0, 120)
          }
          return reject(err)
        }
        try {
          const data = JSON.parse(raw)
          const text = data && data.choices && data.choices[0] &&
            data.choices[0].message && data.choices[0].message.content
          if (!text) throw new Error('empty content')
          resolve({ text: String(text).trim().slice(0, 2000), model })
        } catch (e) {
          reject(fail('AI_BAD_RESPONSE'))
        }
      })
    })
    req.on('timeout', () => req.destroy(fail('AI_TIMEOUT')))
    req.on('error', err => {
      if (!err.code) err.code = 'AI_NETWORK_ERROR'
      reject(err)
    })
    req.write(payload)
    req.end()
  })
}

/** 自检：确认云函数读到的配置、接口路径、鉴权方式与上游连通情况 */
async function diagnose() {
  const snapshot = configSnapshot()
  const base = { configured: false, reachable: false, ...snapshot }
  const correctedTip = snapshot.corrected ? '；已自动把 /api/pass/v4 纠正为 /api/paas/v4' : ''
  if (!snapshot.hasKey || !snapshot.baseURL) {
    return { ok: true, data: { ...base, message: '云函数未读到完整配置：确认环境变量已保存并发布到当前版本' } }
  }
  if (!snapshot.model) {
    return { ok: true, data: { ...base, message: '缺少 AI_MODEL：智谱可填 glm-4-flash' } }
  }
  try {
    await callModel([{ role: 'user', content: '请只回复：正常' }], 16)
    return {
      ok: true,
      data: { ...base, configured: true, reachable: true, message: '连接正常，可以开始提问' + correctedTip }
    }
  } catch (err) {
    return {
      ok: true,
      data: {
        ...base,
        configured: true,
        status: (err && err.status) || 0,
        message: describeError(err) + correctedTip
      }
    }
  }
}

exports.main = async (event) => {
  if (event && event.action === 'diagnose') {
    try {
      return await diagnose()
    } catch (err) {
      return { ok: false, error: 'AI_DIAGNOSE_FAILED', message: describeError(err) }
    }
  }

  const messages = cleanMessages(event && event.messages)
  if (!messages.length) return { ok: false, error: 'AI_BAD_REQUEST', message: '没有有效提问' }

  let openid = ''
  try {
    openid = cloud.getWXContext().OPENID || ''
  } catch (e) {
    openid = ''
  }
  if (!allow(openid)) {
    return { ok: false, error: 'AI_RATE_LIMIT', message: '提问太频繁，请稍后再试' }
  }

  try {
    const data = await callModel(messages)
    return { ok: true, data }
  } catch (err) {
    // 只记录错误码，不打印用户提问内容
    console.error('[ai] 调用失败', err && err.code, err && err.status)
    return {
      ok: false,
      error: (err && err.code) || 'AI_UNKNOWN_ERROR',
      status: (err && err.status) || 0,
      message: describeError(err)
    }
  }
}
