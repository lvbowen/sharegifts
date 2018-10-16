import fetch from '@/utils/fetch'

const qs = require('qs')

// 跳转爱聚优选
export function toaiju(params) {
  return fetch({
    url: '/forAjyx/loginShop',
    method: 'post',
    data: qs.stringify(params)
  })
}



