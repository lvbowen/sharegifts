import fetch from '@/utils/fetch'

const qs = require('qs')

// 账户余额
export function getBalanceList(params) {
  return fetch({
    url: '/UserAmount/list',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 充值
export function payMoney(params) {
  return fetch({
    url: '/UserAmount/recharge',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 充值状态查询
export function getPayState(params) {
  return fetch({
    url: '/UserAmount/getStatus',
    method: 'post',
    data: qs.stringify(params)
  })
}
