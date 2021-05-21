// pages/commodity-detail/commodity-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: app.serverUrl,
    show: false,
    isStar: false,
    goodsId: '',
    // 
    id: '',
    userId: '',
    name: '',
    describes: '',
    categoryId: '',
    specesId: '',
    brandId: '',
    qualityId: '',
    statusId: '',
    areaCode: '',
    areaName: '',
    priceOut: '',
    priceIn: '',
    pricePost: '',
    isFreePost: '',
    state: '',
    collectCount: '',
    browserCount: '',
    wantCount: '',
    createTime: '',
    categoryName: '',
    specesName: '',
    brandName: '',
    qualityName: '',
    statusName: '',
    listImg: [
      // type:''	
      // imgUrl:''	
    ],
  },
  addBrowser() {
    var url = app.serverUrl + "/api/browser/addBrowser";
    var userId = app.globalData.userId;
    const {
      id
    } = this.data;
    wx.request({
      url: url,
      method: "POST",
      data: {
        userId,
        goodsId: id
      },
      success: (resdata) => {
        console.log(url, resdata.data);
        if (resdata.data.code == 0) {} else {
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
  addCollect() {
    var url = app.serverUrl + "/api/collect/addCollect";
    var userId = app.globalData.userId;
    const {
      id
    } = this.data;
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
            isStar: true
          })
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
  getGoods() {
    var url = app.serverUrl + "/api/goods/getGoods";
    const {
      id
    } = this.data;
    wx.request({
      url: url,
      method: "POST",
      data: {
        id
      },
      success: (resdata) => {
        console.log(url, resdata.data);
        if (resdata.data.code == 0) {
          const {
            id,
            userId,
            name,
            describes,
            categoryId,
            specesId,
            brandId,
            qualityId,
            statusId,
            areaCode,
            areaName,
            priceOut,
            priceIn,
            pricePost,
            isFreePost,
            state,
            collectCount,
            browserCount,
            wantCount,
            createTime,
            categoryName,
            specesName,
            brandName,
            qualityName,
            statusName,
            listImg,
          } = resdata.data;
          this.setData(Object.assign(this.data, resdata.data.data))
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
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onClickButton() {
    this.setData({
      show: true
    });
  },
  onComfirm() {
    this.setData({
      show: false
    });
    wx.navigateBack({
      delta: -1,
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      id
    } = options;
    this.setData({
      id
    });
    this.getGoods();
    this.addBrowser();
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