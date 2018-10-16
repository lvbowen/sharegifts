import fetch from '@/utils/fetch'

const qs = require('qs')

// 获取活动列表
export function getActivityList(params) {
  return fetch({
    url: '/goods/activity/activityList',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 创建活动
export function createActivity(params) {
  return fetch({
    url: '/goods/activity/addActivity',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 获取活动详情
export function getActivityDetail(params) {
  return fetch({
    url: '/goods/activity/activityDetail',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 下架或取消发布活动
export function cancelActivity(params) {
  return fetch({
    url: '/goods/activity/unShelve',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 上架活动
export function publishActivity(params) {
  return fetch({
    url: '/goods/activity/applyForSale',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 创建抽奖活动
export function createRewardActivity(params) {
  return fetch({
    url: 'goods/activity/addLuckyDraw',
    method: 'post',
    data: qs.stringify(params)
  })
}
//获取审核拒绝原因

export function getReasons(params) {
  return fetch({
    url: 'goods/Activity/getShelveReason',
    method: 'post',
    data: qs.stringify(params)
  })
}