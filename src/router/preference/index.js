let aijuRoutes=[

  // 商品结算
  {
    path: '/merchant',
    name: 'Merchant',
    component: () => import(/* webpackChunkName: "Merchant" */ '@/views/preference/merchantSettlement/index')
  },
  // 结算详情
  {
    path: '/settlementDetail',
    name: 'SettlementDetail',
    component: () => import(/* webpackChunkName: "SettlementDetail" */'@/views/preference/merchantSettlement/settlementDetail')
  },
  //交易订单
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "Order" */'@/views/preference/transactionOrder/index')
  },
  //商品管理
  {
    path: '/good',
    name: 'Good',
    component: () => import(/* webpackChunkName: "Good" */'@/views/preference/goodManage/index')
  },
  //商品管理设置
  {
    path: '/goodSet',
    name: 'GoodSet',
    component: () => import(/* webpackChunkName: "GoodSet" */'@/views/preference/goodManage/set')
  },
  //商品管理新建
  {
    path: '/newGood',
    name: 'NewGood',
    component: () => import(/* webpackChunkName: "NewGood" */'@/views/preference/goodManage/new')
  },

  //优惠券管理
  {
    path: '/coupon',
    name: 'Coupon',
    component: () => import(/* webpackChunkName: "Coupon" */'@/views/preference/coupon/index')
  },
  //新建优惠券
  {
    path: '/newCoupon',
    name: 'NewCoupon',
    component: () => import(/* webpackChunkName: "NewCoupon" */'@/views/preference/coupon/new')
  }
]
let aijuRouters=[{
  path: '/aiju',
  name: 'aiju',
  component: () => import(/* webpackChunkName: "main" */ '@/views/preference/main/main'),
  redirect:'/aptitude',
  children:[...aijuRoutes]
 }]
export default aijuRouters
