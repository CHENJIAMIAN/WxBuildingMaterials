// pages/mine/favorite/favorite.js
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
  getMyCollect() {
    let url = app.serverUrl + "/api/collect/myCollect";
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

  delCollect(e) {
    let url = app.serverUrl + "/api/collect/delCollect";
    let userId = app.globalData.userId;
    const {
      id
    } = e.currentTarget.dataset;
    wx.request({
      url: url,
      method: "POST",
      data: {
        userId,
        goodsId: id
      },
      success: (resdata) => {
        console.log(url, resdata.data);
        if (resdata.data.code == 0) {
          wx.showToast({
            icon: "success",
            title: "提交成功",
            duration: 1000
          });
          this.getMyCollect();
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
    this.getMyCollect();
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