let backRouters=[
//添加店铺
  {
    path: '/addShop',
    name: 'AddShop',
    component: resolve => require([/* webpackChunkName: "addShop" */'@/views/scrm/shop/addShop'], resolve)
  },
  //活动列表
  {
    path: '/activity',
    name: 'Activity',
    component: resolve => require([/* webpackChunkName: "activity" */'@/views/scrm/activities/activityList'], resolve)
  },
  //新建活动
  {
    path: '/addActivity',
    name: 'addActivity',
    component: resolve => require([/* webpackChunkName: "addActivity" */'@/views/scrm/activities/addActivity'], resolve)
  },
  //任务设置
  {
    path: '/addTask',
    name: 'addTask',
    component: resolve => require([/* webpackChunkName: "addTask" */'@/views/scrm/activities/addTask'], resolve)
  },
  //活动明细
  {
    path: '/activityInfo',
    name: 'activityInfo',
    component: resolve => require([/* webpackChunkName: "activityInfo" */'@/views/scrm/activities/activityInfo'], resolve)
  },
   //活动审核
   {
    path: '/examine',
    name: 'examine',
    component: resolve => require([/* webpackChunkName: "examine" */'@/views/scrm/activities/examine'], resolve)
  },
  //审核明细
  {
    path: '/examineInfo',
    name: 'examineInfo',
    component: resolve => require([/* webpackChunkName: "examineInfo" */'@/views/scrm/activities/examineInfo'], resolve)
  },
]
export default backRouters