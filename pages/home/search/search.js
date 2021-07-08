// pages/home/search/search.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchName: '',
    searchRecord: [],
    showSearchResult: false,
    // 
    serverUrl: app.serverUrl,
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
    // 
    categoryOptionKeyIdValueName: {},
    specsOptionKeyIdValueName: {},
    brandOptionKeyIdValueName: {},
    qualityOptionKeyIdValueName: {},
    stateOptionKeyIdValueName: {},
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
    if (name == 'categoryId') {
      app.getSpecsList(this);
      app.getBrandList(this);
    }
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
    wx.showLoading();
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
            rows: this.data.rows.concat(rows),
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
    })
    app.getCategoryList(this);
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

  },
  onChange(e) {
    if (!e.detail) {
      this.setData({
        showSearchResult: false,
        pageNo: '',
        current_page: '',
        pageSize: '',
        per_page: '',
        total: '',
        totalPage: '',
        last_page: '',
        lastVisitTime: '',
        rows: [],
      });
    }

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

      this.setData({
        showSearchResult: true,
        searchName
      })
      this.setData({
        pageNo: '',
        current_page: '',
        pageSize: '',
        per_page: '',
        total: '',
        totalPage: '',
        last_page: '',
        lastVisitTime: '',
        rows: [],
      });
      this.loadGoodsListByPage();
      // wx.redirectTo({
      //   url: `/pages/home/search-result/search-result?searchName=${searchName}`,
      // })

    }
  },
  gotToSearchResult(e) {
    let {
      searchname: searchName
    } = e.currentTarget.dataset;
    this.setData({
      showSearchResult: true,
      searchName
    })
    this.loadGoodsListByPage();
  },
  historyDelFn: function () {
    wx.clearStorageSync('searhRecord')
    this.setData({
      searchRecord: []
    })
  },
})