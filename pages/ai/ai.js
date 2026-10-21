Page({
  data: {
    inputText: "",
    messages: [] // 聊天列表
  },

  onLoad() {
    // 打开页面加载本地历史记录
    const history = wx.getStorageSync("chat_history")
    if (history) {
      this.setData({ messages: history })
    }
  },

  inputChange(e) {
    this.setData({ inputText: e.detail.value })
  },

  async send() {
    const content = this.data.inputText.trim()
    if (!content) return

    // 构造用户消息
    const userMsg = { role: "user", content }
    const newMsgList = [...this.data.messages, userMsg]

    this.setData({
      messages: newMsgList,
      inputText: ""
    })
    wx.showLoading({ title: "思考中" })

    try {
      const res = await wx.cloud.callFunction({
        name: "node",
        data: {
          messages: newMsgList
        }
      })
      wx.hideLoading()
      if (res.result.success) {
        const aiMsg = { role: "assistant", content: res.result.content }
        const finalList = [...newMsgList, aiMsg]
        this.setData({ messages: finalList })
        // 保存到本地缓存
        wx.setStorageSync("chat_history", finalList)
      } else {
        wx.showToast({ title: res.result.msg, icon: "none" })
      }
    } catch (e) {
      wx.hideLoading()
      wx.showToast({ title: "调用失败", icon: "none" })
      console.error(e)
    }
  },

  // 清空对话按钮
  clearChat() {
    wx.clearStorageSync("chat_history")
    this.setData({ messages: [] })
  }
})