// pages/mine/history/history.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: app.serverUrl,
    // 
    pageNo: '',
    current_page: '',
    pageSize: '',
    per_page: '',
    total: '',
    totalPage: '',
    last_page: '',
    lastVisitTime: '',
    rows: [],
  },
  getMyBrowser() {
    let url = app.serverUrl + "/api/browser/myBrowser";
    let userId = app.globalData.userId;
    wx.request({
      url: url,
      method: "POST",
      data: {
        userId
      },
      success: (resdata) => {
        console.log(url, resdata.data.data)
        if (resdata.data.code == 0) {
          const {
            pageNo,
            current_page,
            pageSize,
            per_page,
            total,
            totalPage,
            last_page,
            lastVisitTime,
            rows,
          } = resdata.data.data;
          this.setData({
            pageNo,
            current_page,
            pageSize,
            per_page,
            total,
            totalPage,
            last_page,
            lastVisitTime,
            rows,
          });
        } else {
          wx.showToast({
            icon: "none",
            title: resdata.data.msg || '',
            duration: 1000
          });
        }
      },
      fail: (resdata) => {}
    });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyBrowser();
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