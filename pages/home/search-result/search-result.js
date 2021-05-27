// pages/home/search-result/search-result.js
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 
    showLoading: false,
    // option1: [{
    //     text: '区域',
    //     value: 0
    //   },
    //   {
    //     text: '区域1',
    //     value: 1
    //   },
    //   {
    //     text: '区域2',
    //     value: 2
    //   },
    // ],
    categoryOption: [],
    brandOption: [],
    specsOption: [],
    qualityOption: [],
    stateOption: [],
    // value1: '',
    // 
    searchName: '',
    categoryId: '',
    specesId: '',
    brandId: '',
    qualityId: '',
    statusId: '',
    areaCode: '',
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
  onOptionChange({
    currentTarget: {
      dataset
    },
    detail
  }) {
    const {
      name
    } = dataset;
    this.setData({
      [name]: detail
    });
    console.log('onOptionChange', name, this.data[name])
    if (name == 'categoryId')
      app.getSpecsList(this);
    this.loadGoodsListByPage();
  },
  scrollMytrip() {
    console.log("scrollMytrip");
    const nextPageNo = this.data.pageNo + 1;
    if (nextPageNo <= this.data.totalPage) {
      this.setData({
        showLoading: true,
        pageNo: nextPageNo
      });
      this.loadGoodsListByPage();
    }
  },
  loadGoodsListByPage() {
    let url = app.serverUrl + "/api/goods/loadGoodsListByPage";
    const {
      searchName,
      categoryId,
      specesId,
      brandId,
      qualityId,
      statusId,
      areaCode,
      pageNo,
      pageSize,
    } = this.data;
    const reqParams = {
      searchName,
      categoryId,
      specesId,
      brandId,
      qualityId,
      statusId,
      areaCode,
      pageNo,
      pageSize,
    }
    wx.request({
      url: url,
      method: "POST",
      data: reqParams,
      success: (resdata) => {
        console.log(url, resdata.data.data)
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
      fail: (resdata) => {
        this.setData({
          showLoading: false
        });
        console.log(resdata);
      }
    });

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      searchName
    } = options;
    this.setData({
      searchName
    });

    app.getCategoryList(this);
    app.getBrandList(this);
    app.getQualityList(this);
    app.getStateList(this);
    this.loadGoodsListByPage();
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