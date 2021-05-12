// pages/loading.js
var app = getApp();
var intervalProcess;
var isJoin = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '欢迎使用乐跑，正在登陆...',
    goBtnFlag: false,
    loginBtnFlag: false,
    time: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    false &&
      wx.navigateTo({
        // url: "/packageB/pages/finish-certificate/finish-certificate"
        // url: "/packageA/pages/sign-up-stastic/sign-up-stastic"
        // url: "/packageA/pages/sign-up-group-add/sign-up-group-add"
        // url: "/packageA/pages/sign-up-individual/sign-up-individual"
        // url: "/packageA/pages/sign-up-group/sign-up-group"
        // url: "/packageA/pages/sign-up-commit/sign-up-commit"
        // url: "/pages/index/index"
        // url: "/packageA/pages/sign-up-answer/sign-up-answer"
        // url: "/packageB/pages/sign-in-success/sign-in-success"      
        // url: "/packageB/pages/sign-up-success/sign-up-success"      
      });
    setTimeout(() => {
      wx.switchTab({
        // url: "/pages/home/home"
        url: "/pages/mine/mine"
      });
    }, 1 * 1000);

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
    isJoin = "";
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
    var that = this;
    wx.login({
      success: res => {
        if (res.code) {
          // console.log(app.serverUrl + '/login/' + res.authCode);
          // 调用自己的服务端接口，让服务端进行后端的授权认证
          console.log('=====code:' + res.code);
          var url = app.serverUrl + "/api/wxUser/check";
          wx.request({
            url: url,
            method: "POST",
            data: {
              authCode: res.code
            },
            success: function (resdata) {
              console.log('wxUser/check', resdata.data.data);
              if (resdata.data.data) {
                console.log('resdata.data.code:', resdata.data.code);
                if (resdata.data.code != 0) {
                  that.setData({
                    loginBtnFlag: true,
                    title: '登陆失败, 请重试！'
                  });
                } else {
                  app.rootImgPath = resdata.data.data.imgRoot;
                  if (resdata.data.data.openId) {
                    app.globalData.openId = resdata.data.data.openId;
                  }
                  if (resdata.data.data.sessionKey) {
                    app.globalData.sessionKey = resdata.data.data.sessionKey;
                  }

                  isJoin = resdata.data.data.isJoin;
                  app.globalData.userId = resdata.data.data.usrerId;

                  that.setData({
                    goBtnFlag: true,
                    title: '登陆成功, ' + that.data.time + '秒后进入'
                  });
                  that.setTime();
                }
              } else {
                that.setData({
                  loginBtnFlag: true,
                  title: '登陆失败, 请重试！'
                });
              }

            },
            fail: function (resdata) {
              that.setData({
                loginBtnFlag: true,
                title: '登陆失败, 请重试！'
              });
            }
          });
        }
      }
    });

  },

  setTime() {
    var that = this;
    intervalProcess = setInterval(() => {
      var t = that.data.time;
      if (t > 0) {
        t--;
        this.setData({
          time: t,
          title: '登陆成功, ' + t + '秒后进入'
        });
      } else {
        if (isJoin == 'yes' && app.globalData.userId != '') {
          that.goIndex(); //已经报过名，直接去到主页
        } else {
          that.goToJoin(); //没有报过名，去到报名流程页面
        }
      }
    }, 1000);
  },

  //马上进入
  goIn() {
    var that = this;
    if (isJoin == 'yes' && app.globalData.userId != '') {
      that.goIndex(); //已经报过名，直接去到主页
    } else {
      that.goToJoin(); //没有报过名，去到报名流程页面
    }
  },

  //已经报过名，直接去到主页
  goIndex() {
    wx.redirectTo({
      url: "/packageA/pages/sign-up-stastic/sign-up-stastic"
    });
  },

  //去到报名流程页面
  goToJoin() {
    wx.redirectTo({
      url: "/pages/index/index"
    });
  },

  relogin() {
    this.setData({
      title: '欢迎使用乐跑，正在登陆...',
      loginBtnFlag: false
    });

    this.login();
  },



})