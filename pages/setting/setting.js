// pages/setting/setting.js
import {
  areaList
} from '../../miniprogram_npm/@vant/area-data/index.js';
let app = getApp();

Page({
  id: 'setting',
  data: {
    // 
    showAreaPopup: false,
    // 
    userId: '',
    areaList,
    fileList1: [],
    avatar: '',
    show: false,
    isBaseInfo: true,
    name: '',
    sex: '',
    addr: '',
    jobPosition: '',
    // companyId: '',
    company:'',
    phone: '',
    wechat: '',
    qq: '',
    email: '',
    // 
    areaName: '',
    areaCode: '',
    // 
    companyIndex: 0,
    companyArray: [],
    companyName: '',
    // 
    showAddCompany: false,
    // 
    beforeAddCompanyClose: function (action) {
      return new Promise((resolve) => {
        if (action === 'confirm') {
          const thisPage = getCurrentPages().find(i => i.id === 'setting');
          thisPage.addCompany(resolve);
        } else if (action === 'cancel') {
          resolve(true);
        }
      })
    },
  },
  tapAddCompany() {
    this.setData({
      showAddCompany: true
    })
  },
  // addCompany(resolve) {
  //   let url = app.serverUrl + "/api/utils/addCompany";
  //   const {
  //     companyName,
  //   } = this.data;
  //   if (!companyName) {
  //     wx.showToast({
  //       icon: "none",
  //       title: `请输入公司名称`,
  //     });
  //     resolve(false);
  //     return;
  //   }
  //   wx.showLoading();
  //   wx.request({
  //     url: url,
  //     method: "POST",
  //     data: {
  //       name: companyName,
  //     },
  //     success: (resdata) => {
  //       console.log(url, resdata.data);
  //       if (resdata.data.code == 0) {
  //         wx.showToast({
  //           icon: "success",
  //           title: "提交成功",
  //           duration: 1000
  //         });
  //         app.getCompanyList(this);
  //         resolve(true);
  //       } else {
  //         wx.showToast({
  //           icon: "none",
  //           title: resdata.data.msg || '',
  //           duration: 1000
  //         });
  //         resolve(false);
  //       }
  //     },
  //     fail: (resdata) => {
  //       resolve(false);
  //     },
  //     complete: (resdata) => {
  //       wx.hideLoading();
  //     }
  //   });
  // },
  // bindCompanyPickerChange: function (e) {
  //   console.log('bindCompanyPickerChange发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     companyIndex: e.detail.value,
  //     companyId: this.data.companyArray[e.detail.value].id
  //   })
  // },
  showPopup(e) {
    const {
      name
    } = e.currentTarget.dataset;
    switch (name) {
      case '1':
        this.setData({
          isBaseInfo: true
        })
        break;
      case '2':
        this.setData({
          isBaseInfo: false
        })
        break;
    }
    this.setData({
      show: true
    });
  },
  onChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onConfirm() {
    this.setData({
      show: false
    });
    this.addUserInfo();
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
      addr: areaName,
      areaCode: event.detail.values[1].code
    })
  },
  onAreaCancel() {
    this.setData({
      showAreaPopup: false
    })
  },

  addUserInfo() {
    let url = app.serverUrl + "/api/user/addUserInfo";
    let id = app.globalData.userId;
    const {
      name,
      sex,
      areaName: addr,
      jobPosition,
      // companyId,
      phone,
      wechat,
      qq,
      email
    } = this.data;
    if (!id) {
      wx.showToast({
        icon: "none",
        title: `用户id为${id}`,
      });
      return;
    }
    if (!name) {
      wx.showToast({
        icon: "none",
        title: `请输入昵称`,
      });
      return;
    }
    if (!sex) {
      wx.showToast({
        icon: "none",
        title: `请选择性别`,
      });
      return;
    }
    // if (!addr) {
    //   wx.showToast({
    //     icon: "none",
    //     title: `请输入地址`,
    //   });
    //   return;
    // }
    if (!jobPosition) {
      wx.showToast({
        icon: "none",
        title: `请输入职位`,
      });
      return;
    }
    // if (!companyId) {
    //   wx.showToast({
    //     icon: "none",
    //     title: `请输入公司`,
    //   });
    //   return;
    // }
    if (!phone) {
      wx.showToast({
        icon: "none",
        title: `请输入电话`,
      });
      return;
    }
    if (!wechat) {
      wx.showToast({
        icon: "none",
        title: `请输入微信`,
      });
      return;
    }
    if (!qq) {
      wx.showToast({
        icon: "none",
        title: `请输入QQ`,
      });
      return;
    }
    if (!email) {
      wx.showToast({
        icon: "none",
        title: `请输入邮箱`,
      });
      return;
    }
    wx.showLoading();
    wx.request({
      url: url,
      method: "POST",
      data: {
        id,
        name,
        sex,
        addr,
        jobPosition,
        // companyId,
        phone,
        wechat,
        qq,
        email
      },
      success: (resdata) => {
        console.log(url, resdata.data);
        if (resdata.data.code == 0) {
          wx.showToast({
            icon: "success",
            title: "提交成功"
          });
          app.getUser(this);
        } else {
          wx.showToast({
            icon: "none",
            title: resdata.data.msg || '',
            duration: 1000
          });
        }
      },
      fail: (resdata) => {},
      complete: (resdata) => {
        wx.hideLoading();
      }
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
          // const {
          //   fileList1 = []
          // } = this.data;
          // fileList1.push({
          //   ...file,
          //   url: app.serverUrl + obj.data
          // });
          // this.setData({
          //   fileList1
          // });
          let avatar = app.serverUrl + obj.data;
          this.setData({
            avatar
          })
          this.addAvatar(avatar);

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

  onRadioChange(event) {
    // event.detail 为当前输入的值
    console.log('onRadioChange', event.detail);
    this.setData({
      sex: event.detail,
    })
  },


  addAvatar(avatar) {
    let url = app.serverUrl + "/api/user/addAvatar";
    let id = app.globalData.userId;
    if (!id) {
      wx.showToast({
        icon: "none",
        title: `用户id为${id}`,
      });
      return;
    }
    if (!avatar) {
      wx.showToast({
        icon: "none",
        title: `请选择头像`,
      });
      return;
    }
    wx.showLoading();
    wx.request({
      url: url,
      method: "POST",
      data: {
        id,
        avatar
      },
      success: (resdata) => {
        console.log(url, resdata.data)
        wx.hideLoading();
        if (resdata.data.code == 0) {
          // wx.showToast({
          //   icon: "success",
          //   title: "提交成功",
          //   duration: 1000
          // });
        } else {
          wx.showToast({
            icon: "none",
            title: resdata.data.msg || '',
            duration: 1000
          });
        }
      },
      fail: (resdata) => {
        wx.hideLoading();
      }
    });
  },
  onLoad: function (options) {
    // app.getCompanyList(this);
    app.getUser(this);
  }
})