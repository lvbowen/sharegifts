// 根据id枚举值获取对应文本信息
export function getTextById(obj, value) {
  if (value === undefined || value === null || value === '' || !/^-?\d+$/.test(value)) {
    return ''
  }
  for (let i in obj) {
    if (obj[i].id == value) {
      return obj[i].text
    }
  }
  return ''
}

// 根据文本信息获得对应的id
export function getIdByText(arr, value) {
  if (value == null || value === '') {
    return ''
  }
  for (let i in arr) {
    if (arr[i].cate_name == value) {
      return arr[i].cate_id
    }
  }
}

//活动列表类型枚举
export const ActivityType = {
  Price: {id: 1, name: 'price', text: '一口价'},
  Bidders: {id: 2, name: 'bidders', text: '竞拍'},
  Reward: {id: 3, name: 'reward', text: '抽奖'},
}

//活动列表状态枚举
export const ActivityState = {
  WaitAudit: {id: 2, name: 'waitAudit', text: '待审核'},
  Doing: {id: 3, name: 'doing', text: '进行中'},
  Sended: {id: 7, name: 'sended', text: '已送出'},
  SoldOut: {id: 4, name: 'soldOut', text: '已下架'},
  Overd: {id:8, name:'overd', text:'已结束'}
}

// 余额变动原因
export const AmountChangeState = {
  Pay: {id: 1, name: 'pay', text: '充值'},
  Withdraw: {id: 2, name: 'withdraw', text: '提现'},
  Frozen: {id: 3, name: 'frozen', text: '保证金冻结'},
  Receive: {id: 4, name: 'receive', text: '领取宝贝'},
  Send: {id: 5, name: 'send', text: '送出宝贝'},
  Refund: {id: 6, name: 'refund', text: '退款'},
  Thaw: {id: 7, name: 'thaw', text: '保证金解冻收入'},
  Cashback: {id: 8, name: 'cashback', text: '保证金返现支出'},
  Trial: {id: 9, name: 'trial', text: '试用返现收入'}
}

// 开奖方式
export const rewardType = {
  TimeReward: {id: 1, name: 'timeReward', text: '定时开奖'},
  FullReward: {id: 2, name: 'fullReward', text: '满人开奖'},
  DirectReward: {id: 3, name: 'directReward', text: '直接开奖'}
}
