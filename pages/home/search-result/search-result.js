// pages/home/search-result/search-result.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
    categoryId: '',
    brandId: '',
    specsId: '',
    qualityId: '',
    stateId: '',
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
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getCategoryList(this);
    app.getBrandList(this);
    app.getQualityList(this);
    app.getStateList(this);
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