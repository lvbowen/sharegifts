import Vue from 'vue'
import Router from 'vue-router'
import AijuRouters from "./preference/index"
import ShareRouters from "./sharegifts/index"

Vue.use(Router)
let routers = [
  {
    path: '/',
    redirect: '/Login',
    component: resolve => require(['@/views/login/login'], resolve)
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard')
  },
  //login
  {
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/views/login/login'], resolve)
  },
  {
    path: '/register',
    name: 'Register',
    component: resolve => require(['@/views/register/register'], resolve)
  },
  {
    path: '/apply',
    name: 'Apply',
    component: resolve => require(['@/views/apply/apply'], resolve)
  }
]

let router = new Router({
  linkExactActiveClass: 'router-active',
  routes: [...routers, ...AijuRouters, ...ShareRouters]
})
export default router



