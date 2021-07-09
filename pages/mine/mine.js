// pages/mine.js
let app = getApp();

Component({
  data: {

  },
  methods: {
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