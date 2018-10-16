const mutations = {
  SET_TOKEN(state, value) {
    state.token = value
  },
  SET_USER_NAME(state, value) {
    state.userName = value
  },
  SET_GOOD_DESC(state, value) {
    state.goodDesc = value
  },
  SET_AVATAR(state, value) {
    state.avatar = value
  },
  SET_NICK_NAME(state, value) {
    state.nickName = value
  },
  SET_ACTIVITY_DETAIL(state, value) {
    state.activityDetail = value
  },
  SET_GOOD_DETAIL(state, value) {
    state.goodDetails = value
  },
  SET_STOCK(state, value) {
    state.stock = value
  },
  SET_MONEY(state, value) {
    state.needMoney = value
  }
}
export default mutations
