const axios = require('axios')

const API_KEY = "f1aea3e8b75e4ab48eb1406c14b9859e.Wt8cpza6DeWORTBA"
const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"

exports.main = async (event, context) => {
  const { messages } = event
  try {
    const res = await axios.post(
      API_URL,
      {
        model: "glm-4-flash",
        messages: messages,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 18000
      }
    )
    return {
      success: true,
      content: res.data.choices[0].message.content
    }
  } catch (err) {
    console.log("err", err?.response?.data || err.message)
    return {
      success: false,
      msg: err?.response?.data?.error?.message || "请求出错"
    }
  }
}