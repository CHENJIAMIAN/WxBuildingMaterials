'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});
var relation_1 = require('../../miniprogram_npm/@vant/weapp/common/relation');
var component_1 = require('../../miniprogram_npm/@vant/weapp/common/component');
component_1.VantComponent({
  relation: relation_1.useParent('tabs'),
  props: {
    dot: {
      type: Boolean,
      observer: 'update',
    },
    info: {
      type: null,
      observer: 'update',
    },
    icon: {
      type: String,
      observer: 'update',
    },
    title: {
      type: String,
      observer: 'update',
    },
    disabled: {
      type: Boolean,
      observer: 'update',
    },
    titleStyle: {
      type: String,
      observer: 'update',
    },
    name: {
      type: null,
      value: '',
    },
  },
  data: {
    active: false,
  },
  methods: {
    getComputedName: function () {
      if (this.data.name !== '') {
        return this.data.name;
      }
      return this.index;
    },
    updateRender: function (active, parent) {
      var parentData = parent.data;
      this.inited = this.inited || active;
      this.setData({
        active: active,
        shouldRender: this.inited || !parentData.lazyRender,
        shouldShow: active || parentData.animated,
      });
    },
    update: function () {
      if (this.parent) {
        this.parent.updateTabs();
      }
    },
  },
});