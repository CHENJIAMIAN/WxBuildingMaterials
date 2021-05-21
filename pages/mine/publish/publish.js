// pages/mine/publish/publish.js
var app = getApp();
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
    state: 2,
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
  loadGoodsListByPageForUser() {
    var url = app.serverUrl + "/api/goods/loadGoodsListByPageForUser";
    const {
      state,
      pageNo,
      pageSize,
    } = this.data;
    var userId = app.globalData.userId;
    const reqParams = {
      userId,
      state,
      pageNo,
      pageSize,
    }
    console.log(url, 'reqParams', reqParams)
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
        rows = [{
            "pricePost": 2,
            "brandName": "卫龙",
            "img": {
              "imgUrl": "/upload/materials/file/20210513/1620889226196162088922619558.jpeg",
              "createTime": "2021-05-13T07:08:54.000+0000",
              "goodsId": 5,
              "id": 8,
              "type": 1
            },
            "collectCount": 1,
            "categoryName": "水龙头",
            "describes": "二手没有使用过的水龙头",
            "browserCount": 1,
            "areaCode": "525000",
            "isFreePost": 2,
            "statusId": 1,
            "areaName": "茂名",
            "createTime": "2021-05-13 15:08:54",
            "qualityName": "轻微使用痕迹",
            "priceIn": 10,
            "brandId": 7,
            "name": "工地水龙头",
            "statusName": "功能完好无维修",
            "wantCount": 0,
            "id": 5,
            "state": 2,
            "priceOut": 33.5,
            "categoryId": 3,
            "qualityId": 3
          },
          {
            "pricePost": 0,
            "brandName": "卫龙",
            "img": {
              "imgUrl": "/upload/materials/file/20210513/1620889226196162088922619558.jpeg",
              "createTime": "2021-05-13T07:07:25.000+0000",
              "goodsId": 3,
              "id": 4,
              "type": 1
            },
            "collectCount": 0,
            "categoryName": "水龙头",
            "describes": "二手没有使用过的水龙头",
            "browserCount": 1,
            "areaCode": "525000",
            "isFreePost": 1,
            "statusId": 1,
            "areaName": "茂名",
            "createTime": "2021-05-13 15:07:25",
            "qualityName": "轻微使用痕迹",
            "priceIn": 10,
            "brandId": 7,
            "name": "二手水龙头",
            "statusName": "功能完好无维修",
            "wantCount": 0,
            "id": 3,
            "state": 2,
            "priceOut": 33.5,
            "categoryId": 3,
            "qualityId": 3
          }
        ];

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
            rows,
          });
        }
      },
      fail: (resdata) => {
        this.setData({
          showLoading: false
        });
        console.log(resdata);
      }
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
    var url = app.serverUrl + `/api/goods/${option}`;
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