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
      console.log(event.detail);
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
            wx.showToast({
              icon: "success",
              title: "提交成功",
              duration: 1000
            });
            this.getUser();
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

    getUser() {
      let url = app.serverUrl + "/api/user/getUser";
      let userId = app.globalData.userId;
      wx.request({
        url: url,
        method: "POST",
        data: {
          id: userId
        },
        success: (resdata) => {
          console.log(url, resdata.data.data)
          const {
            id,
            openId,
            name,
            sex,
            addr,
            jobPosition,
            company,
            phone,
            wechat,
            qq,
            email,
            avatar,
          } = resdata.data.data;

          if (resdata.data.code == 0) {
            this.setData({
              id,
              openId,
              name,
              sex,
              addr,
              jobPosition,
              company,
              phone,
              wechat,
              qq,
              email,
              avatar,
            });
          }
        },
        fail: (resdata) => {
          console.log(resdata);
        }
      });

    },


    addAvatar(avatar) {
      let url = app.serverUrl + "/api/user/addAvatar";
      let id = app.globalData.userId;
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

      this.getUser();
    }
  }
})