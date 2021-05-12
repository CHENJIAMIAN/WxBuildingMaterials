App({
  serverUrl: "http://www.lemengsc.com:9901/jc/",
  rootImgPath: "",
  onLaunch() {

  },
  globalData: {
    userInfo: null,
    userId: "", //用户报名后的用户id
    openId: "",
    publicOpenId: "",
    sessionKey: "",
    phone: "", //手机号码
    avatar: "" //头像
  },
  // .js
  getPhoneNumber(e, pageInstance) {
    const app = this;
    let openId = app.globalData.openId;
    let sessionKey = app.globalData.sessionKey;
    console.log('===========openId:' + openId); // 获取手机号
    let encryptedData = e.detail.encryptedData;
    let iv = e.detail.iv;
    var url = app.serverUrl + "/api/wxUser/phoneNumber";

    if (!e.detail.iv) {
      wx.showModal({
        title: '提示',
        content: '拒绝授权，系统服务将无法使用，或页面不完整',
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: "/pages/index/index"
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
      return;
    }

    wx.showLoading({
      title: "授权中..."
    });

    wx.request({
      url: url,
      method: "POST",
      data: {
        encryptedData: encryptedData,
        iv: iv,
        openId: openId,
        sessionKey: sessionKey
      },
      success: (resdata) => {
        wx.hideLoading();
        if (resdata.data.code == 0) {
          app.globalData.phone = resdata.data.data.phone;
          console.log("phone:", app.globalData.phone);
          console.log("avatar:", app.globalData.avatar);
          pageInstance.setData({
            isGotPhone: !!this.globalData.phone
          });
          pageInstance.addUser();
        } else {
          wx.showToast({
            icon: "fail",
            title: resdata.data.msg,
            duration: 1000
          });
        }
      },
      fail: (resdata) => {
        wx.hideLoading();
      }
    });

  },
})