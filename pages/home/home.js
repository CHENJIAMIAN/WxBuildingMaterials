// pages/home/home.js
let app = getApp();
Component({
  data: {
    showLoading: false,
    // 
    serverUrl: app.serverUrl,
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
  methods: {
    getPhoneNumber(e) {
      app.getPhoneNumber(e, this);
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
  },
  attached() {
    this.loadGoodsListByPage();
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})