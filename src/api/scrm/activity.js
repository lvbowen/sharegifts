import fetch from '@/utils/fetch'
const qs = require('qs')
let qiNiuUpload = process.env.NODE_ENV == "development" ? "https://up.qbox.me" : 'https://up.qbox.me';
// 获取活动列表
export function getAcityList(params) {
  return fetch({
    url: '/gaofan/Active/get_active_list',
    method: 'post',
    data: qs.stringify(params)
  })
}
//修改或添加活动
export function addAcityList(params) {
  return fetch({
    url: '/gaofan/Active/create_active',
    method: 'post',
    data: qs.stringify(params)
  })
}
//文档流
export function upload(params){
  return fetch({
    url: '/QiniuApi/put_images',
    method: 'post',
    headers: {'Content-Type': "multipart/form-data"},
    params
  })
}
//审核明细
export function checkInfo(params) {
  return fetch({
    url: '/gaofan/Active/get_active_detail',
    method: 'post',
    data: qs.stringify(params)
  })
}
//商家同意返现
export function agreeReturn(params) {
  return fetch({
    url: '/gaofan/Active/agree_return',
    method: 'post',
    data: qs.stringify(params)
  })
}
//商家拒绝返现
export function refuseReturn(params) {
  return fetch({
    url: '/gaofan/Active/refuse_return',
    method: 'post',
    data: qs.stringify(params)
  })
}
//获取账户余额

export function getAccountBanlance(params) {
  return fetch({
    url: 'gaofan/Active/getUserCenterInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}