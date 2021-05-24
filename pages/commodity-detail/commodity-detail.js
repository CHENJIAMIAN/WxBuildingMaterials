// pages/commodity-detail/commodity-detail.js
let app = getApp();
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
    // 
    showGetPhoneNumberDialog: false,
    // 
    phone: '',
    wechat: '',
    qq: '',
    email: '',
    // 
    showAddMsg: false,
    msg: '',
    // 留言
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
  addMsg() {
    let url = app.serverUrl + "/api/message/addMsg";
    let userId = app.globalData.userId;
    const {
      id: goodsId,
      msg,
    } = this.data;
    wx.request({
      url: url,
      method: "POST",
      data: {
        userId,
        goodsId,
        msg,
      },
      success: (resdata) => {
        console.log(url, resdata.data);
        if (resdata.data.code == 0) {
          wx.showToast({
            icon: "success",
            title: "提交成功",
            duration: 1000
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
  tapAddMsg() {
    this.setData({
      showAddMsg: true
    })
  },
  getPhoneNumber(e) {
    app.getPhoneNumber(e, this);
  },
  addBrowser() {
    let url = app.serverUrl + "/api/browser/addBrowser";
    let userId = app.globalData.userId;
    const {
      id: goodsId,
    } = this.data;
    wx.request({
      url: url,
      method: "POST",
      data: {
        userId,
        goodsId
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
    let url = app.serverUrl + "/api/collect/addCollect";
    let userId = app.globalData.userId;
    const {
      id: goodsId,
    } = this.data;
    wx.request({
      url: url,
      method: "POST",
      data: {
        userId,
        goodsId
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
  getMsgByGoodsIdList() {
    let url = app.serverUrl + "/api/message/getMsgByGoodsIdList";
    const {
      id: goodsId
    } = this.data;
    wx.request({
      url: url,
      method: "POST",
      data: {
        goodsId
      },
      success: (resdata) => {
        console.log(url, resdata.data);
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
  getGoods() {
    let url = app.serverUrl + "/api/goods/getGoods";
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
    if (!app.globalData.phone)
      this.setData({
        showGetPhoneNumberDialog: true
      });
  },
  onConfirm() {
    this.setData({
      show: false
    });
    this.addWant();
    wx.navigateBack({
      delta: -1,
    });
  },
  addWant() {
    let url = app.serverUrl + "/api/want/addWant";
    let userId = app.globalData.userId;
    const {
      id: goodsId,
      phone,
      wechat,
      qq,
      email,
    } = this.data;
    wx.request({
      url: url,
      method: "POST",
      data: {
        userId,
        goodsId,
        phone,
        wechat,
        qq,
        email,
      },
      success: (resdata) => {
        console.log(url, resdata.data);
        if (resdata.data.code == 0) {
          wx.showToast({
            icon: "success",
            title: "提交成功",
            duration: 1000
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
      id,
      phone: app.globalData.phone
    });
    this.getGoods();
    this.getMsgByGoodsIdList();
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