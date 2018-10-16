import scrmRouters from "../scrm/index"

let sharegiftsRoutes = [
  // 商品管理
  {
    path: '/goodsManage',
    name: 'GoodsManage',
    component: () => import('@/views/sharegifts/goodsManage/goodsManage')
  },
  // 添加商品
  {
    path: '/addGood',
    name: 'AddGood',
    component: () => import('@/views/sharegifts/goodsManage/addGood')
  },
  // 创建活动
  {
    path: '/createActivity/:id',
    name: 'CreateActivity',
    component: () => import('@/views/sharegifts/goodsManage/createActivity')
  },
  // 活动列表
  {
    path: '/activityList',
    name: 'ActivityList',
    component: () => import('@/views/sharegifts/activityList/activityList')
  },
  // 活动详情
  {
    path: '/activityDetail/:id',
    name: 'ActivityDetail',
    component: () => import('@/views/sharegifts/activityList/activityDetail')
  },
  //交易订单
  {
    path: '/dealOrder',
    name: 'DealOrder',
    component: () => import('@/views/sharegifts/dealOrder/dealOrder')
  },
  //账户余额
  {
    path: '/accountBalance',
    name: 'AccountBalance',
    component: () => import('@/views/sharegifts/accountBalance/accountBalance')
  },
  //资质审核
  {
    path: '/aptitude',
    name: 'Aptitude',
    component: () => import('@/views/sharegifts/aptitude/index')
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import('@/views/sharegifts/agreement/agreement')
  }
]
let sharegiftsRouters = [{
  path: '/homePage',
  name: 'HomePage',
  component: () => import('@/views/sharegifts/homePage/homePage'),
  redirect: '/goodsManage',
  children: [...sharegiftsRoutes, ...scrmRouters]
}]
export default sharegiftsRouters
