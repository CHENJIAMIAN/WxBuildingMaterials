// pages/setting/apply-join-company/apply-join-company.js
let app = getApp();

Page({
  id: 'apply-join-company',

  /**
   * 页面的初始数据
   */
  data: {
    // 
    companyId: '',
    companyIndex: 0,
    companyArray: [],
    companyName: '',
    showAddCompany: false,
    // 
    beforeAddCompanyClose: function (action) {
      return new Promise((resolve) => {
        if (action === 'confirm') {
          const thisPage = getCurrentPages().find(i => i.id === 'apply-join-company');
          thisPage.addCompany(resolve);
        } else if (action === 'cancel') {
          resolve(true);
        }
      })
    },
  },
  joinCompany() {
    let url = app.serverUrl + "/api/utils/joinCompany";
    let userId = app.globalData.userId;
    const {
      companyId
    } = this.data;
    if (!userId) {
      wx.showToast({
        icon: "none",
        title: `用户id为${userId}`,
      });
      return;
    }
    if (!companyId) {
      wx.showToast({
        icon: "none",
        title: `公司id为${companyId}`,
      });
      return;
    }
    wx.showLoading();
    wx.request({
      url: url,
      method: "POST",
      data: {
        userId,
        companyId,
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
      fail: (resdata) => {},
      complete: (resdata) => {
        wx.hideLoading();
      }
    });
  },
  addCompany(resolve) {
    let url = app.serverUrl + "/api/utils/addCompany";
    const {
      companyName,
    } = this.data;
    if (!companyName) {
      wx.showToast({
        icon: "none",
        title: `请输入公司名称`,
      });
      resolve(false);
      return;
    }
    wx.showLoading();
    wx.request({
      url: url,
      method: "POST",
      data: {
        name: companyName,
      },
      success: (resdata) => {
        console.log(url, resdata.data);
        if (resdata.data.code == 0) {
          wx.showToast({
            icon: "success",
            title: "提交成功",
            duration: 1000
          });
          app.getCompanyList(this);
          resolve(true);
        } else {
          wx.showToast({
            icon: "none",
            title: resdata.data.msg || '',
            duration: 1000
          });
          resolve(false);
        }
      },
      fail: (resdata) => {
        resolve(false);
      },
      complete: (resdata) => {
        wx.hideLoading();
      }
    });
  },
  tapAddCompany() {
    this.setData({
      showAddCompany: true
    })
  },
  bindCompanyPickerChange: function (e) {
    console.log('bindCompanyPickerChange发送选择改变，携带值为', e.detail.value)
    this.setData({
      companyIndex: e.detail.value,
      companyId: this.data.companyArray[e.detail.value].id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getCompanyList(this);
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