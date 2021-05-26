import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {
  areaList
} from '../../miniprogram_npm/@vant/area-data/index.js';
let app = getApp();
// pages/publish/publish.js

Page({
  data: {
    showAreaPopup: false,
    areaList,
    categoryOption: [],
    brandOption: [],
    specsOption: [],
    qualityOption: [],
    stateOption: [],
    show: false,
    radio: '1',
    name: '', //
    describes: '', //
    categoryId: '', //
    brandId: '', //
    specesId: '', //
    qualityId: '', //
    statusId: '', //
    areaCode: '', //
    areaName: '', //
    priceOut: '', //
    priceIn: '', //
    pricePost: '0', //
    isFreePost: '1', //
    imgList1: [
      //   {
      //   type,
      //   imgUrl,
      // }
    ],
    imgList2: [],
    // 
    brandName: '',
    showAddBrand: false,
  },
  addBrand() {
    let url = app.serverUrl + "/api/utils/addBrand";
    const {
      brandName
    } = this.data;
    wx.request({
      url: url,
      method: "POST",
      data: {
        name: brandName
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
      fail: (resdata) => {}
    });
  },
  onConfirm() {
    this.addBrand();
  },
  tapShowAreaPopup() {
    this.setData({
      showAreaPopup: true
    })
  },
  onAreaConfirm(event) {
    let areaName = ''
    for (let i of event.detail.values) {
      areaName += i.name;
    }

    this.setData({
      showAreaPopup: false,
      areaName,
      areaCode: event.detail.values[2].code
    })
  },
  onAreaCancel() {
    this.setData({
      showAreaPopup: false
    })
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
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onIsFreePostChange(event) {
    // event.detail 为当前输入的值
    console.log('onIsFreePostChange', event.detail);
    this.setData({
      radio: event.detail,
      isFreePost: +event.detail
    })
    if (this.data.radio == '1')
      this.setData({
        pricePost: '0'
      })
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

  delete(event) {
    const {
      index,
      name
    } = event.detail;
    const fileList = this.data[`fileList${name}`];
    fileList.splice(index, 1);
    this.setData({
      [`fileList${name}`]: fileList
    });
  },



  addGoods() {
    let url = app.serverUrl + "/api/goods/addGoods";
    let userId = app.globalData.userId;

    const {
      name,
      describes,
      categoryId,
      specesId,
      brandId,
      qualityId,
      statusId,
      areaCode,
      areaName,
      priceOut,
      priceIn,
      pricePost,
      isFreePost,
      imgList1,
      imgList2,
      // imgList1: [{
      //   type,
      //   imgUrl,
      // }],
      // imgList2: [{
      //   type,
      //   imgUrl,
      // }]
    } = this.data;
    const reqParams = {
      userId,
      name,
      describes,
      categoryId,
      specesId,
      brandId,
      qualityId,
      statusId,
      areaCode,
      areaName,
      priceOut,
      priceIn,
      pricePost,
      isFreePost,
      imgList1: imgList1.map(i => {
        return {
          ...i,
          type: 1
        }
      }),
      imgList2: imgList2.map(i => {
        return {
          ...i,
          type: 2
        }
      })
    };
    console.log('/api/goods/addGoods reqParams', reqParams);
    wx.request({
      url: url,
      method: "POST",
      data: reqParams,
      success: (resdata) => {
        console.log(url, resdata.data);
        if (resdata.data.code == 0) {
          wx.showToast({
            icon: "success",
            title: "提交成功",
            duration: 1000
          });
          wx.switchTab({
            url: "/pages/home/home"
          });
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


  afterRead1(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    let url = app.serverUrl + "/api/uploadFile/upload";
    wx.uploadFile({
      name: 'file',
      url,
      fileName: "image",
      filePath: file.url,
      fileType: "image",
      name: "image",
      formData: {},
      success: (res) => {
        let obj = JSON.parse(res.data);
        console.log(obj);
        if (obj.code == 0) {
          // 上传完成需要更新 fileList
          const {
            imgList1 = []
          } = this.data;
          imgList1.push({
            ...file,
            url: app.serverUrl + obj.data,
            imgUrl: obj.data, //用相对路径
          });
          this.setData({
            imgList1
          });

          wx.showToast({
            title: "上传成功!",
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: "上传失败!",
            icon: 'none'
          });
        }
      },
    });
  },
  afterRead2(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    let url = app.serverUrl + "/api/uploadFile/upload";
    wx.uploadFile({
      name: 'file',
      url: url,
      fileName: "image",
      filePath: file.url,
      fileType: "image",
      name: "image",
      formData: {},
      success: (res) => {
        let obj = JSON.parse(res.data);
        console.log(obj);
        if (obj.code == 0) {
          // 上传完成需要更新 fileList
          const {
            imgList2 = []
          } = this.data;
          imgList2.push({
            ...file,
            url: app.serverUrl + obj.data,
            imgUrl: obj.data, //用相对路径
          });
          this.setData({
            imgList2
          });

          wx.showToast({
            title: "上传成功!",
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: "上传失败!",
            icon: 'none'
          });
        }
      },
    });
  },

  tapTag(e) {
    const {
      type,
      value
    } = e.currentTarget.dataset;
    this.setData({
      [type]: value
    })
    console.log([type], value)
  },
  tapAddBrand() {
    this.setData({
      showAddBrand: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getCategoryList(this);
    app.getBrandList(this);
    app.getQualityList(this);
    app.getStateList(this);
    wx.getStorage({
      key: 'publish_data',
      success: (res) => {
        // console.log(res.data)
        this.setData(Object.assign(this.data, JSON.parse(res.data)));
      }
    })

    wx.enableAlertBeforeUnload({
      message: "是否保存更改?",
      success: function (res) {
        console.log("方法注册成功：", res);
      },
      fail: function (errMsg) {
        console.log("方法注册失败：", errMsg);
      },
    });
    // wx.disableAlertBeforeUnload({
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (e) {
    //     console.log(e)
    //   }
    // });
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
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // const {
    //   name,
    //   describes,
    //   categoryId,
    //   specesId,
    //   brandId,
    //   qualityId,
    //   statusId,
    //   areaCode,
    //   areaName,
    //   priceOut,
    //   priceIn,
    //   pricePost,
    //   isFreePost,
    //   imgList1,
    //   imgList2,
    // } = this.data;
    console.log('onUnload')
    wx.setStorage({
      key: "publish_data",
      data: JSON.stringify(this.data)
    })


    // wx.showModal({
    //   title: '提示',
    //   content: '是否保存修改信息？',
    //   success: function (res) {
    //     if (res.confirm) {
    //       let pages = getCurrentPages(); //当前页面栈
    //       if (pages.length > 0) {
    //         let beforePage = pages[pages.length - 1]; //获取上一个页面实例对象                      
    //         // beforePage.reloadData(); //触发父页面中的方法                        
    //       }
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
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