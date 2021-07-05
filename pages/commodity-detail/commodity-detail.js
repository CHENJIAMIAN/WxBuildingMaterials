// pages/commodity-detail/commodity-detail.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: app.serverUrl,
    showUserInfoPopup: false,
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
    showSend: false,
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
  loadMore() {
    let {
      pageNo,
      last_page
    } = this.data;
    if (pageNo < last_page) {
      this.setData({
        pageNo: pageNo + 1
      });
      this.getMsgByGoodsIdList();
    }
  },
  addMsg() {
    let url = app.serverUrl + "/api/message/addMsg";
    let userId = app.globalData.userId;
    const {
      id: goodsId,
      msg,
    } = this.data;
    if (!userId) {
      wx.showToast({
        icon: "none",
        title: `用户id为${userId}`,
      });
      return;
    }
    if (!goodsId) {
      wx.showToast({
        icon: "none",
        title: `商品id为${goodsId}`,
      });
      return;
    }
    if (!msg) {
      wx.showToast({
        icon: "none",
        title: `请输入留言`,
      });
      return;
    }
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
          this.setData({
            msg: ''
          })
          this.getMsgByGoodsIdList();

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
    console.log('===========' + this.data.showSend);
    if (this.data.showSend){
      this.setData({
        showSend: false
      })
    }else{
      this.setData({
        showSend: true
      })
    }
    
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
    if (!userId) {
      wx.showToast({
        icon: "none",
        title: `用户id为${userId}`,
      });
      return;
    }
    if (!goodsId) {
      wx.showToast({
        icon: "none",
        title: `商品id为${goodsId}`,
      });
      return;
    }
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
    if (!userId) {
      wx.showToast({
        icon: "none",
        title: `用户id为${userId}`,
      });
      return;
    }
    if (!goodsId) {
      wx.showToast({
        icon: "none",
        title: `商品id为${goodsId}`,
      });
      return;
    }
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
            icon: "none",
            title: "收藏成功"
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
      id: goodsId,
      pageNo,
      pageSize,
    } = this.data;
    wx.request({
      url: url,
      method: "POST",
      data: {
        goodsId,
        pageNo,
        pageSize
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
  onClickIWantButton() {
    this.setData({
      showUserInfoPopup: true
    });
    if (!app.globalData.phone)
      this.setData({
        showGetPhoneNumberDialog: true
      });
  },
  onUserInfoPopupConfirm() {
    this.addWant();
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
    if (!userId) {
      wx.showToast({
        icon: "none",
        title: `用户id为${userId}`,
      });
      return;
    }
    if (!goodsId) {
      wx.showToast({
        icon: "none",
        title: `商品id为${goodsId}`,
      });
      return;
    }
    if (!phone) {
      wx.showToast({
        icon: "none",
        title: `请输入电话`,
      });
      return;
    }
    if (!wechat) {
      wx.showToast({
        icon: "none",
        title: `请输入微信`,
      });
      return;
    }
    if (!qq) {
      wx.showToast({
        icon: "none",
        title: `请输入QQ`,
      });
      return;
    }
    if (!email) {
      wx.showToast({
        icon: "none",
        title: `请输入邮箱`,
      });
      return;
    }
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
          this.setData({
            showUserInfoPopup: false
          });
          wx.navigateBack({
            delta: -1,
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
  onUserInfoPopupClose() {
    this.setData({
      showUserInfoPopup: false
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