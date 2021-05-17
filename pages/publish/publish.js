import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [{
        text: '区域',
        value: 0
      },
      {
        text: '区域1',
        value: 1
      },
      {
        text: '区域2',
        value: 2
      },
    ],
    option2: [{
        text: '分类',
        value: 'a'
      },
      {
        text: '分类1',
        value: 'b'
      },
      {
        text: '分类2',
        value: 'c'
      },
    ],
    value1: 0,
    value2: 'a',
    fileList: [],
    show: false,
  },
  onPrice() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  afterRead(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        // 上传完成需要更新 fileList
        const {
          fileList = []
        } = this.data;
        fileList.push({
          ...file,
          url: res.data
        });
        this.setData({
          fileList
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.showModal({
      title: '提示',
      content: '是否保存修改信息？',
      success: function (res) {
        if (res.confirm) {
          var pages = getCurrentPages(); //当前页面栈
          if (pages.length > 0) {
            var beforePage = pages[pages.length - 1]; //获取上一个页面实例对象                      
            // beforePage.reloadData(); //触发父页面中的方法                        
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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