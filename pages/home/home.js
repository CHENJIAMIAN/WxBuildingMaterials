// pages/home/home.js
let app = getApp();
let QQMapWX = require('./../../qqmap/qqmap-wx-jssdk.js');
let qqmapsdk;
Component({
  data: {
    phone: app.globalData.phone,
    // 
    showLoading: false,
    // 
    serverUrl: app.serverUrl,
    // 
    searchName: '',
    categoryId: '',
    specesId: '',
    brandId: '',
    qualityId: '',
    statusId: '',
    areaCode: '', //只用于请求参数,可设'',可设为areaCodeReal
    areaCodeReal: '', //真实的地区码
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
    categoryOption: [],
    // 
    city: '',
    district: '',
  },
  methods: {
    tapCategory(e) {
      const {
        value: categoryId
      } = e.currentTarget.dataset;
      this.setData({
        categoryId
      })
      this.loadGoodsListByPage();
    },
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
    tabsChange(e) {
      const {
        index,
        name,
        title,
      } = e.detail;
      switch (index) {
        case 0:
          this.setData({
            areaCode: '',
          })
          break;
        case 1:
          this.setData({
            areaCode: this.data.areaCodeReal,
          })
          break;
      }
      this.loadGoodsListByPage();
    }
  },
  attached() {
    this.loadGoodsListByPage();
    app.getCategoryList(this);
    qqmapsdk = new QQMapWX({
      key: 'MUQBZ-FHWKR-V5UW2-W6S2S-YKUXF-GQFVR' //这里自己的key秘钥进行填充
    });
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const {
          latitude,
          longitude
        } = res;
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: (locRes) => {
            console.log('reverseGeocoder', locRes);
            // let province = locRes.result.ad_info.province;
            let {
              city,
              district,
              adcode
            } = locRes.result.ad_info;
            // adcode: "440305"
            // city: "深圳市"
            // city_code: "156440300"
            // district: "南山区"
            // location: {
            //   lat: 22.25,
            //   lng: 113.83773
            // }
            // name: "中国,广东省,深圳市,南山区"
            // nation: "中国"
            // nation_code: "156"
            // province: "广东省"

            app.globalData.longitude = longitude;
            app.globalData.latitude = latitude;
            app.globalData.cityName = city;
            app.globalData.district = district;
            this.setData({
              city,
              district,
              areaCodeReal: adcode,
            });
          },
          fail: (locRes) => {
            console.log("reverseGeocoder fail:", locRes);
          },
          complete: (locRes) => {}
        });

      },
      complete: function (e) {
        wx.hideLoading();
      }
    })
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