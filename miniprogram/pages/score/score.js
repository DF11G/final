// miniprogram/pages/score/score.js
const axios = require('axios').default

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xueqi: [
      { name: '2020-2021-1', value: '2020-2021-1' },
      { name: '2020-2021-2', value: '2020-2021-2', checked: 'true' },
      { name: '2020-2021-3', value: '2020-2021-3' },
      { name: '2019-2020-1', value: '2019-2020-1' },
      { name: '2019-2020-2', value: '2019-2020-2' },
      { name: '2019-2020-3', value: '2019-2020-3' },
      { name: '2018-2019-1', value: '2018-2019-1' },
      { name: '2018-2019-2', value: '2018-2019-2' },
      { name: '2018-2019-3', value: '2018-2019-3' },
      { name: '2017-2018-1', value: '2017-2018-1' },
      { name: '2017-2018-2', value: '2017-2018-2' },
      { name: '2017-2018-3', value: '2017-2018-3' }
    ],

    xueQiList: ['2020-2021-1', '2020-2021-2', '2020-2021-3', '2019-2020-1', '2019-2020-2', '2019-2020-3', '2018-2019-1', '2018-2019-2', '2018-2019-3', '2017-2018-1', '2017-2018-2', '2017-2018-3',],
    xueQiIndex: 4,

    // 储存返回的成绩信息
    scoreList: [],

    // 请求需要的参数
    mytoken: '',
    xueHao: '',
    password: '123'

  },

  // 修改学期
  bindXueQiChange: function (e) {
    console.log('picker xueQi 发生选择改变，携带值为', e.detail.value);
    this.setData({
      xueQiIndex: e.detail.value
    })
  },

  // 输入学号
  xueHaoInputChange: function (e) {
    this.setData({
      xueHao: e.detail.value
    })
  },

  // 输入密码
  passwordInputChange: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 查询成绩
  submitForm: async function () {
    wx.cloud.callFunction({
      name: "getScore",
      data: {
        xueHao: this.data.xueHao,
        password: this.data.password,
        xnxqid: this.data.xueQiList[this.data.xueQiIndex]
      }
    }).then((res) => {
      let scoreData = res.result
      console.log(scoreData)
      this.setData({
        scoreList: [...scoreData]
      })
      console.log(this.data.scoreList)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPlayList
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})