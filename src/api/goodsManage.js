import fetch from '@/utils/fetch'

const qs = require('qs')

// 获取商品列表
export function getGoodsList(params) {
  return fetch({
    url: '/goods/Goods/goodsList',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 新建商品
export function addGood(params) {
  return fetch({
    url: '/goods/Goods/addGoods',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 新建商品
export function editGood(params) {
  return fetch({
    url: '/goods/Goods/editGoods',
    method: 'post',
    data: qs.stringify(params)
  })
}


// 获取商品SKU规格列表
export function getSkuList(params) {
  return fetch({
    url: '/goods/goods/skuList',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 根据淘宝url拉取商品信息
export function fetchGood(params) {
  return fetch({
    url: '/goods/Goods/fetchGoods',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 获取分类列表
export function getCateList(params) {
  return fetch({
    url: '/goods/Category/cateList',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 获取商品详情信息
export function getGoodDetail(params) {
  return fetch({
    url: '/goods/goods/goodsDetail',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 删除商品
export function deleteGood(params) {
  return fetch({
    url: '/goods/Goods/deleteGoods',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 获取小程序码
export function getCode(params) {
  return fetch({
    url: '/merchants/merchantUser/code',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 导入商品列表
export function importGoodsList(params) {
  return fetch({
    url: 'forAjyx/goodsList',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 导入商品
export function importGoods(params) {
  return fetch({
    url: 'forAjyx/import',
    method: 'post',
    data: qs.stringify(params)
  })
}
