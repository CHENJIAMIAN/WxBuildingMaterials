// pages/loading.js
let app = getApp();
let intervalProcess;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '欢迎使用乐跑，正在登陆...',
    goBtnFlag: false,
    loginBtnFlag: false,
    time: 3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login();
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
    clearInterval(intervalProcess);
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

  },


  login() {
    // 页面加载
    wx.login({
      success: res => {
        if (res.code) {
          // console.log(app.serverUrl + '/login/' + res.authCode);
          // 调用自己的服务端接口，让服务端进行后端的授权认证
          console.log('=====code:' + res.code);
          let url = app.serverUrl + "/api/wxUser/check";
          wx.request({
            url: url,
            method: "POST",
            data: {
              authCode: res.code
            },
            success: (resdata) => {
              console.log('wxUser/check', resdata.data.data);
              if (resdata.data.data) {
                console.log('resdata.data.code:', resdata.data.code);
                if (resdata.data.code != 0) {
                  this.setData({
                    loginBtnFlag: true,
                    title: '登陆失败, 请重试！'
                  });
                } else {
                  app.imgWebBase = resdata.data.data.imgWebBase;
                  if (resdata.data.data.openId) {
                    app.globalData.openId = resdata.data.data.openId;
                  }
                  if (resdata.data.data.sessionKey) {
                    app.globalData.sessionKey = resdata.data.data.sessionKey;
                  }

                  app.globalData.userId = resdata.data.data.userId;

                  app.globalData.phone = resdata.data.data.phone;

                  this.setData({
                    goBtnFlag: true,
                    title: '登陆成功, ' + this.data.time + '秒后进入'
                  });

                  if (app.globalData.userId != '') {
                    this.goIndex(); //已注册
                  } else {
                    // 未注册

                  }
                }
              } else {
                this.setData({
                  loginBtnFlag: true,
                  title: '登陆失败, 请重试！'
                });
              }
            },
            fail: (resdata) => {
              wx.showToast({
                icon: "none",
                title: JSON.stringify(resdata),
                duration: 10000

              });
              this.setData({
                loginBtnFlag: true,
                title: '登陆失败, 请重试！'
              });
            },
            complete: (resdata) => {

            }
          });
        }
      }
    });

  },

  //已经报过名，直接去到主页
  goIndex() {
    const bool = true;
    bool &&
      wx.switchTab({
        // url: "/pages/mine/mine"
        url: "/pages/home/home"
      });
    !bool &&
      wx.navigateTo({
        url: "/pages/publish/publish"
        // url: "/pages/mine/publish/publish"
      })
  },


})