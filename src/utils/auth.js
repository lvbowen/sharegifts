const TokenKey = 'Admin-Token'
const UserName = 'Admin-UserName'
const FirstCate = 'First-CateName'
const SecondCate = 'Second-CateName'
const Avatar = 'Admin-Avatar'
const NickName = 'Admin-NickName'

//  设置token
export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

//  获取token
export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

// 删除token
export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

// 设置userName
export function setUserName(userName) {
  return sessionStorage.setItem(UserName, userName)
}

// 获取userName
export function getUserName() {
  return sessionStorage.getItem(UserName)
}

// 删除userName
export function removeUserName() {
  return sessionStorage.removeItem(UserName)
}

//设置一级商品类目
export function setFirstCate(cateName) {
  return sessionStorage.setItem(FirstCate, cateName)
}

// 获取一级商品类目
export function getFirstCate() {
  return sessionStorage.getItem(FirstCate)
}

// 删除一级商品类目
export function removeFirstCate() {
  return sessionStorage.removeItem(FirstCate)
}

//设置二级商品类目
export function setSecondCate(cateName) {
  return sessionStorage.setItem(SecondCate, cateName)
}

// 获取二级商品类目
export function getSecondCate() {
  return sessionStorage.getItem(SecondCate)
}

//删除二级商品类目
export function removeSecondCate(cateName) {
  return sessionStorage.removeItem(SecondCate)
}

// 设置微信头像
export function setAvatar(avatar) {
  return sessionStorage.setItem(Avatar, avatar)
}

// 获取微信头像
export function getAvatar() {
  return sessionStorage.getItem(Avatar)
}

// 删除微信头像
export function removeAvatar() {
  return sessionStorage.removeItem(Avatar)
}

// 设置微信昵称
export function setNickName(nickName) {
  return sessionStorage.setItem(NickName, nickName)
}

// 获取微信昵称
export function getNickName() {
  return sessionStorage.getItem(NickName)
}

// 删除微信昵称
export function removeNickName() {
  return sessionStorage.removeItem(NickName)
}
