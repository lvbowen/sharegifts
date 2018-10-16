import {getToken, getUserName, getAvatar, getNickName} from '@/utils/auth'

const state = {
  token: getToken(),
  userName: getUserName(),
  goodDesc: '',             // 商品详情
  avatar: getAvatar(),      // 微信头像
  nickName: getNickName(),   // 微信昵称
  activityDetail: '' ,  // 高返活动详情
  goodDetails:'',//高返获取商品详情
  stock:0,//高返库存
  needMoney:0,//返现总金额
}
export default state
