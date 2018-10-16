// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {api} from './js/api.js'
// ajax设置
import "./js/ajax.js";

Vue.config.productionTip = false
// 接口地址
Vue.prototype.$api = api;
// 引用element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, {
  size: 'medium'  // element ui 使用尺寸
});
// vuex
import store from './store/store.js'

//重置样式
import './style/reset.css'
import './style/common.css'
import './style/ele.css'
import './style/index.css'; // 全局自定义样式

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
//引入上传图片
import {upload} from './js/upload.js'

Vue.prototype.$upload = upload;
// 引入正则
import {reg} from './js/reg.js';
import '@/permission' // 权限

Vue.prototype.$reg = reg;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
