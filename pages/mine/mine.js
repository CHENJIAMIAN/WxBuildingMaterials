// pages/mine.js
let app = getApp();

Component({
  data: {
    fileList1: [],
    avatar: '',
    show: false,
    isBaseInfo: true,
    name: '',
    sex: '',
    addr: '',
    jobPosition: '',
    company: '',
    phone: '',
    wechat: '',
    qq: '',
    email: ''
  },
  methods: {
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
      this.onConfirm();
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
    addUserInfo() {
      let url = app.serverUrl + "/api/user/addUserInfo";
      let id = app.globalData.userId;
      const {
        name,
        sex,
        addr,
        jobPosition,
        company,
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
      if (!addr) {
        wx.showToast({
          icon: "none",
          title: `请输入地址`,
        });
        return;
      }
      if (!jobPosition) {
        wx.showToast({
          icon: "none",
          title: `请输入职位`,
        });
        return;
      }
      if (!company) {
        wx.showToast({
          icon: "none",
          title: `请输入公司`,
        });
        return;
      }
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
      wx.request({
        url: url,
        method: "POST",
        data: {
          id,
          name,
          sex,
          addr,
          jobPosition,
          company,
          phone,
          wechat,
          qq,
          email
        },
        success: (resdata) => {
          console.log(url, resdata.data);
          if (resdata.data.code == 0) {
            // wx.showToast({
            //   icon: "success",
            //   title: "提交成功",
            //   duration: 1000
            // });
            app.getUser(this);
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
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }

      app.getUser(this);
    }
  }
})