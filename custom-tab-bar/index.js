Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/home/home",
      iconPath: "/image/home2.png",
      selectedIconPath: "/image/home1.png",
      text: "找材料",
      id: 'tab1'
    }, {
      pagePath: "/pages/mine/mine",
      iconPath: "/image/user2.png",
      selectedIconPath: "/image/user1.png",
      text: "我的",
      id: 'tab2'
    }]
  },
  attached() {},
  methods: {
    tapAdd() {
      wx.navigateTo({
        url: '/pages/publish/publish',
      })
    },
    switchTab(e) {
      console.log('switchTab', e);
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})