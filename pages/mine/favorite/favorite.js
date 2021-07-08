// pages/mine/favorite/favorite.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading: false,
    // 
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
  navigateToCommodityDetail(e) {
    let {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/commodity-detail/commodity-detail?id=${id}`,
    })
  },
  scrollMytrip() {
    console.log("scrollMytrip");
    const nextPageNo = this.data.pageNo + 1;
    if (nextPageNo <= this.data.totalPage) {
      this.setData({
        showLoading: true,
        pageNo: nextPageNo
      });
      this.getMyCollect();
    }
  },
  getMyCollect() {
    let url = app.serverUrl + "/api/collect/myCollect";
    let userId = app.globalData.userId;
    const {
      pageNo,
      pageSize
    } = this.data;
    wx.showLoading();
    wx.request({
      url: url,
      method: "POST",
      data: {
        userId,
        pageNo,
        pageSize
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
            rows: this.data.rows.concat(rows),
          });
        } else {
          wx.showToast({
            icon: "none",
            title: resdata.data.msg || '',
            duration: 1000
          });
        }
      },
      fail: (resdata) => {
        console.error(resdata);
      },
      complete: (resdata) => {
        this.setData({
          showLoading: false
        });
        wx.hideLoading();
      },
    });
  },

  delCollect(e) {
    let url = app.serverUrl + "/api/collect/delCollect";
    let userId = app.globalData.userId;
    const {
      id
    } = e.currentTarget.dataset;
    wx.showLoading();
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
          this.setData({
            pageNo: "",
            current_page: "",
            pageSize: "",
            per_page: "",
            total: "",
            totalPage: "",
            last_page: "",
            lastVisitTime: "",
            rows: [],
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
      fail: (resdata) => {},
      complete: (resdata) => {
        wx.hideLoading();
      }
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