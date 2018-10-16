import router from './router'
import {setToken, getToken} from '@/utils/auth' // 验权
import {getUserInfo} from '@/api/user'

let tokenInfo = window.location.search
if (tokenInfo) {
  let tokenArr = tokenInfo.split('=')
  setToken(tokenArr[1])
}


function userInfo() {
  return new Promise((resolve) => {
    getUserInfo().then(res => {
      resolve(res)
    })
  })
}


// 获取flag值是异步，待处理...

/**
 *登录跳转权限说明：
 * 1.首先是登录权限的判断，如果路由跳转时有token值，则可以登录，否则每个路由间的跳转跳回登录页；退出登录时清空本地token,同理；
 * 2.登录后进入大系统模块选项页，如果用户信息完善信息标识flag不为2，且是从导航页进入子模块的话，直接跳到商家信息完善页面，如果flag为2则放行；
 * 3.进入到商家完善信息页面，想从此页面跳转其他页面，如果flag值不为2，则不跳转，即跳回此页面，但是从此页面想跳回登录页则放行；
 * 4.因为beforeEach是循环遍历每个路由，如果在循环的过程中，刚好是由此页面跳到相同的页面，则放行，避免深度无线循环。
 */
router.beforeEach((to, from, next) => {

  let flag = '2'
  if (getToken()) {
    if (to.path == '/aptitude') {
      next()
    } else if (flag != '2' && from.path == '/dashboard' || flag != '2' && from.path == '/aptitude') {
      if (to.path == '/login') {
        next()
      } else {
        next('/aptitude')
      }
    } else {
      next()
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  }
})


