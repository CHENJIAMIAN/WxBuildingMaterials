// pages/home/search/search.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchName: '',
    searchRecord: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
    })
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

  },
  onChange(e) {
    this.setData({
      searchName: e.detail,
    });
  },
  //点击搜索按钮提交表单跳转并储存历史记录
  searchSubmitFn: function (e) {
    let {
      searchName,
      searchRecord
    } = this.data;
    if (searchName == '') {
      app.showTip('请输入搜索关键词');
      //输入为空时的处理
    } else {
      if (!searchRecord.some(i => i.value == searchName)) {
        //将搜索值放入历史记录中,只能放前五条
        if (searchRecord.length < 5) {
          searchRecord.unshift({
            value: searchName,
            id: searchRecord.length
          })
        } else {
          searchRecord.pop() //删掉旧的时间最早的第一条
          searchRecord.unshift({
            value: searchName,
            id: searchRecord.length
          })
        }
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', searchRecord)

      wx.redirectTo({
        url: `/pages/home/search-result/search-result?searchName=${searchName}`,
      })
    }
  },
  historyDelFn: function () {
    wx.clearStorageSync('searhRecord')
    this.setData({
      searchRecord: []
    })
  },
})