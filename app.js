App({
  serverUrl: "http://www.lemengsc.com:9901/jc/",
  imgWebBase: "",
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
    let userId = app.globalData.userId;
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
        userId,
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

  getCategoryList(page) {
    var url = this.serverUrl + "/api/utils/getCategoryList";
    wx.request({
      url: url,
      method: "POST",
      data: {},
      success: (resdata) => {
        console.log(url, resdata.data)
        if (resdata.data.code == 0) {
          const categoryOption = [];
          for (let i of resdata.data.data)
            categoryOption.push({
              text: i.name,
              value: i.id
            })
          page.setData({
            categoryOption
          })
        } else {
          wx.showToast({
            icon: "fail",
            title: resdata.data.msg,
            duration: 1000
          });
        }
      },
      fail: (resdata) => {}
    });
  },

  getSpecsList(page) {
    var url = this.serverUrl + "/api/utils/getSpecsList";
    wx.request({
      url: url,
      method: "POST",
      data: {
        categoryId: page.data.categoryId
      },
      success: (resdata) => {
        console.log(url, resdata.data)
        if (resdata.data.code == 0) {
          const specsOption = [];
          for (let i of resdata.data.data)
            specsOption.push({
              text: i.name,
              value: i.id
            })
          page.setData({
            specsOption
          })
        } else {
          wx.showToast({
            icon: "fail",
            title: resdata.data.msg,
            duration: 1000
          });
        }
      },
      fail: (resdata) => {}
    });
  },

  getBrandList(page) {
    var url = this.serverUrl + "/api/utils/getBrandList";
    wx.request({
      url: url,
      method: "POST",
      data: {
        categoryId: page.data.categoryId
      },
      success: (resdata) => {
        console.log(url, resdata.data)
        if (resdata.data.code == 0) {
          const brandOption = [];
          for (let i of resdata.data.data)
            brandOption.push({
              text: i.name,
              value: i.id
            })
          page.setData({
            brandOption
          })
        } else {
          wx.showToast({
            icon: "fail",
            title: resdata.data.msg,
            duration: 1000
          });
        }
      },
      fail: (resdata) => {}
    });
  },

  getQualityList(page) {
    var url = this.serverUrl + "/api/utils/getQualityList";
    wx.request({
      url: url,
      method: "POST",
      data: {
        categoryId: page.data.categoryId
      },
      success: (resdata) => {
        console.log(url, resdata.data)
        if (resdata.data.code == 0) {
          const qualityOption = [];
          for (let i of resdata.data.data)
            qualityOption.push({
              text: i.name,
              value: i.id
            })
          page.setData({
            qualityOption
          })
        } else {
          wx.showToast({
            icon: "fail",
            title: resdata.data.msg,
            duration: 1000
          });
        }
      },
      fail: (resdata) => {}
    });
  },

  getStateList(page) {
    var url = this.serverUrl + "/api/utils/getStateList";
    wx.request({
      url: url,
      method: "POST",
      data: {
        categoryId: page.data.categoryId
      },
      success: (resdata) => {
        console.log(url, resdata.data)
        if (resdata.data.code == 0) {
          const stateOption = [];
          for (let i of resdata.data.data)
            stateOption.push({
              text: i.name,
              value: i.id
            })
          page.setData({
            stateOption
          })
        } else {
          wx.showToast({
            icon: "fail",
            title: resdata.data.msg,
            duration: 1000
          });
        }
      },
      fail: (resdata) => {}
    });
  },
})