const util = require('../../utils/util.js')
const progressService = require('../../services/progressService.js')

Page({
  data: {
    logs: []
  },
  onLoad() {
    this.setData({
      logs: progressService.getLogs().map(log => ({
        date: util.formatTime(new Date(log)),
        timeStamp: log
      }))
    })
  }
})
