import {
  login,
  getUserInfo
} from '@/api/user'
import {
  setToken,
  removeToken,
  setUserName,
  removeUserName,
  setAvatar,
  removeAvatar,
  setNickName,
  removeNickName
} from '@/utils/auth'

const actions = {
  setToken(ctx, value) {
    ctx.commit('SET_TOKEN', value)
  },
  setUserName(ctx, value) {
    ctx.commit("SET_USER_NAME", value)
  },
  setGoodDesc(ctx, value) {
    ctx.commit('SET_GOOD_DESC', value)
  },
  setAvatar(ctx, value) {
    ctx.commit('SET_AVATAR', value)
  },
  setNickName(ctx, value) {
    ctx.commit('SET_NICK_NAME', value)
  },
  setActivityDetail(ctx, value) {
    ctx.commit('SET_ACTIVITY_DETAIL', value)
  },
  setGoodDetail(ctx, value) {
    ctx.commit('SET_GOOD_DETAIL', value)
  },
  setStock(ctx, value) {
    ctx.commit('SET_STOCK', value)
  },
  setMoney(ctx, value) {
    ctx.commit('SET_MONEY', value)
  },
  // 用户登录
  Login(ctx, userInfo) {
    const phone = userInfo.phone
    const password = userInfo.password
    let params = {
      phone,
      password
    }
    return new Promise((resolve, reject) => {
      login(params).then(res => {
        if (res.code == '000') {
          const data = res.data
          setToken(data.token)
          setUserName(data.username)
          ctx.commit('SET_TOKEN', data.token)
          ctx.commit('SET_USER_NAME', data.username)
          resolve(res)
        } else {
          resolve(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户信息
  GetUserInfo(ctx) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
        if (res.code == '000') {
          const data = res.data
          if (data.userInfo) {
            setAvatar(data.userInfo.avatar)
            setUserName(data.username)
            setNickName(data.userInfo.nickname)
            ctx.commit('SET_AVATAR', data.userInfo.avatar)
            ctx.commit('SET_USER_NAME', data.username)
            ctx.commit('SET_NICK_NAME', data.userInfo.nickname)
          }
          resolve(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 前端登出
  FedLogOut(ctx) {
    return new Promise(resolve => {
      ctx.commit('SET_TOKEN', '')
      ctx.commit('SET_USER_NAME', '')
      ctx.commit('SET_AVATAR', '')
      ctx.commit('SET_NICK_NAME', '')
      removeToken()
      removeUserName()
      removeAvatar()
      removeNickName()
      resolve()
    })
  }
}
export default actions
