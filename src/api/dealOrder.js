import fetch from '@/utils/fetch'

const qs = require('qs')

// 获取订单列表
export function getOrderList(params) {
  return fetch({
    url: '/order/Order/index',
    method: 'get',
    params
  })
}

// 订单导出
export function exportOrder(params) {
  return fetch({
    url: '/order/Order/export',
    method: 'get',
    params
  })
}

// 订单导入自动发货
export function importOrder(params) {
  return fetch({
    url: '/order/Order/import',
    method: 'post',
    data: qs.stringify(params)
  })
}

