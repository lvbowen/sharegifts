import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import {Message} from 'element-ui';
import router from '../router'

// import store from '../store/store.js'
export const Axios = axios.create({
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
})
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  let token = sessionStorage.getItem('Admin-Token');
  if (token) {
    config.headers.token = `${token}`
  }

  // post请求
  if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  if (!response.data || response.data == undefined) {
    return response
  }

  if (response.data && response.data.code && response.data.code != '000' && response.data.code != '500') {
    Message.error(response.data.msg)


  }
  if (response.data.code == 500) {
    Message.error(response.data.msg)
    console.log(window.location);

    setTimeout(() => {
      // window.location.href = root + '/#/login'
      // router.push({
      //   path: '/login'
      // })
    }, 1000);

  }

  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
//导出的时候 需要设置flag=true
Vue.prototype.$post = function (url, data, type, flag = false) {
  return new Promise((resolve, reject) => {
    Axios({
      method: "post",
      url: url,
      headers: {
        'Content-Type': type || 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: data,
      withCredentials: false
    })
      .then(function (res) {
        !flag ? resolve(res.data) : resolve(res);
      })
      .catch(function (err) {
        reject(err);
      });

  })
};
Vue.prototype.$get = function (url, params) {
  return new Promise((resolve, reject) => {
    Axios({
      method: "get",
      url: url,
      params: params,
    })
      .then(function (res) {
        resolve(res.data);
      })
      .catch(err => {
        reject(err)
      });
  })
};



