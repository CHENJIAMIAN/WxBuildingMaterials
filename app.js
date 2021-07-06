App({
  serverUrl: "https://www.lemengsc.com/jc/",
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
    avatar: "", //头像
    // 
    longitude: "",
    latitude: "",
    cityName: "",
    district: ""
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
    let url = app.serverUrl + "/api/wxUser/phoneNumber";

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
    let url = this.serverUrl + "/api/utils/getCategoryList";
    wx.request({
      url: url,
      method: "POST",
      data: {},
      success: (resdata) => {
        console.log(url, resdata.data)
        if (resdata.data.code == 0) {
          const categoryOption = [];
          const categoryOptionKeyIdValueName = {};
          for (let i of resdata.data.data) {
            categoryOption.push({
              text: i.name,
              value: i.id
            })
            categoryOptionKeyIdValueName[i.id] = i.name;
          }
          page.setData({
            categoryOption,
            categoryOptionKeyIdValueName
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
    let url = this.serverUrl + "/api/utils/getSpecsList";
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
          const specsOptionKeyIdValueName = {};
          for (let i of resdata.data.data) {
            specsOption.push({
              text: i.name,
              value: i.id
            })
            specsOptionKeyIdValueName[i.id] = i.name;
          }
          page.setData({
            specsOption,
            specsOptionKeyIdValueName
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
    let url = this.serverUrl + "/api/utils/getBrandList";
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
          const brandOptionKeyIdValueName = {};
          for (let i of resdata.data.data) {
            brandOption.push({
              text: i.name,
              value: i.id
            })
            brandOptionKeyIdValueName[i.id] = i.name;
          }
          page.setData({
            brandOption,
            brandOptionKeyIdValueName
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
    let url = this.serverUrl + "/api/utils/getQualityList";
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
          const qualityOptionKeyIdValueName = {};
          for (let i of resdata.data.data) {
            qualityOption.push({
              text: i.name,
              value: i.id
            })
            qualityOptionKeyIdValueName[i.id] = i.name;
          }
          page.setData({
            qualityOption,
            qualityOptionKeyIdValueName
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
    let url = this.serverUrl + "/api/utils/getStateList";
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
          const stateOptionKeyIdValueName = {};
          for (let i of resdata.data.data) {
            stateOption.push({
              text: i.name,
              value: i.id
            })
            stateOptionKeyIdValueName[i.id] = i.name;
          }
          page.setData({
            stateOption,
            stateOptionKeyIdValueName
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


  getUser(page) {
    let url = this.serverUrl + "/api/user/getUser";
    let userId = this.globalData.userId;
    wx.request({
      url: url,
      method: "POST",
      data: {
        id: userId
      },
      success: (resdata) => {
        console.log(url, resdata.data.data)
        const {
          id,
          openId,
          name,
          sex,
          addr,
          jobPosition,
          company,
          phone,
          wechat,
          qq,
          email,
          avatar,
        } = resdata.data.data;

        if (resdata.data.code == 0) {
          page.setData({
            id,
            openId,
            name,
            sex,
            addr,
            jobPosition,
            company,
            phone,
            wechat,
            qq,
            email,
            avatar,
          });
        }
      },
      fail: (resdata) => {
        console.log(resdata);
      }
    });

  },


  showTip(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000
    })
  }
})