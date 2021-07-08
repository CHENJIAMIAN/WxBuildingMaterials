// pages/mine/publish/publish.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    showAction: false,
    actions: [{
        id: 1,
        option: 'done',
        name: '成交',
      },
      {
        id: 2,
        option: 'takeOff',
        name: '下架',
      },
      {
        id: 3,
        option: 'delete',
        name: '删除',
      },
    ],
    // 
    showLoading: false,
    // 
    serverUrl: app.serverUrl,
    state: 2, //发布状态，1是未发布，2已发布(审核通过) 3是成交,4是下架,5审核不通过
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
      this.loadGoodsListByPageForUser();
    }
  },
  tabsChange(e) {
    const {
      index,
      name,
      title,
    } = e.detail;
    switch (index) {
      case 0:
        this.setData({
          state: 2, //发布状态，1是未发布，2已发布(审核通过) 3是成交,4是下架,5审核不通过
          actions: [{
              id: 1,
              option: 'done',
              name: '成交',
            },
            {
              id: 2,
              option: 'takeOff',
              name: '下架',
            },
            {
              id: 3,
              option: 'delete',
              name: '删除',
            },
          ],
        })
        break;
      case 1:
        this.setData({
          state: 4,
          rows: [],
          pageNo: '',
          actions: [{
              id: 1,
              option: 'done',
              name: '成交',
            },
            {
              id: 2,
              option: 'takeOn',
              name: '上架',
            },
            {
              id: 3,
              option: 'delete',
              name: '删除',
            },
          ],
        })
        break;
    }
    this.loadGoodsListByPageForUser();
  },
  loadGoodsListByPageForUser() {
    let url = app.serverUrl + "/api/goods/loadGoodsListByPageForUser";
    const {
      state,
      pageNo,
      pageSize,
    } = this.data;
    let userId = app.globalData.userId;
    const reqParams = {
      userId,
      state,
      pageNo,
      pageSize,
    }
    console.log(url, 'reqParams', reqParams)
    wx.showLoading();
    wx.request({
      url: url,
      method: "POST",
      data: reqParams,
      success: (resdata) => {
        console.log(url, resdata.data.data)
        let {
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

        if (resdata.data.code == 0) {
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
  moreAction(e) {
    const {
      id
    } = e.currentTarget.dataset;
    this.setData({
      showAction: true,
      id
    });
  },
  onClose() {
    this.setData({
      showAction: false
    });
  },

  callGoodsApiByOption(option) {
    let url = app.serverUrl + `/api/goods/${option}`;
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
          this.loadGoodsListByPageForUser();
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

  onSelect(e) {
    console.log('onSelect', e.detail);
    const {
      id,
      option,
      name
    } = e.detail
    // 删除
    wx.showModal({
      title: '提示',
      content: `确定要${name}吗？`,
      success: (sm) => {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          this.callGoodsApiByOption(option);
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGoodsListByPageForUser();
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