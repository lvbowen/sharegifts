import fetch from '@/utils/fetch'

const qs = require('qs')

// 用户登录
export function login(params) {
  return fetch({
    url: '/merchants/Passport/loginSite',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 获取用户信息
export function getUserInfo(params) {
  return fetch({
    url: '/merchants/merchantUser/userInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}



