export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if (time === null || time === undefined) {
    return ''
  }

  if (typeof time == 'string') {
    return time
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (time == null || time == '') {
    return null
  } else if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function formatToString(obj) {
  if (obj == null) {
    return ''
  } else {
    return obj.toString()
  }
}

export function formatNumWithCommas(num, decimals) {
  if (num === null || num === undefined || num === '') return '';

  var str, nums;
  if (decimals) {
    num = (num * 1).toFixed(decimals);
  }

  nums = num.toString().split('.');
  str = nums[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  if (nums.length > 1) {
    str += '.' + nums[1];
  }
  return str;
}

export function parseToFloat(value) {
  if (value == null || value == '') {
    return 0
  } else {
    let tem = parseFloat(value)
    if (tem !== tem) {//NAN
      return 0
    } else {
      return tem
    }
  }
}

//格式化为2018年01月25日或者2018-01-25格式
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : pddLeftZero(str))
    }
  }
  return fmt
}


function pddLeftZero(str) {
  return ('00' + str).substr(str.length)
}

//转化成百分比的值   0.03 -》3
export function valueToPercent(value) {
  if (/^(-?\d+)(\.\d+)?$/.test(value)) {
    return parseFloat((value * 100).toPrecision(12))
  } else {
    return ''
  }
}

//3%  -》0.03
export function percentToValue(value) {
  if (/^(-?\d+)(\.\d+)?$/.test(value)) {
    return parseFloat((value / 100).toPrecision(12))
  } else {
    return ''
  }
}

//将  ‘1，2，3，4’转换成[1,2,3,4]
export function parseToIntArrar(str) {
  if (str == null || str == '') {
    return []
  } else {
    let _array = str.split(','),
      array = []

    for (let item in _array) {
      if (item != null && item != '') {
        let num = parseInt(item)
        if (Number.isInteger(num)) {
          array.push(num)
        }
      }
    }

    return array
  }
}

//数字转化成大写
export function parseToCapitalRMB(n) {
  if (n === null || n === undefined) {
    return ''
  }
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
    return "数据非法";
  if (n === 0) {
    return '零元'
  }
  var unit = "千百拾亿千百拾万千百拾元角分", str = "";
  n += "00";
  var p = n.indexOf('.');
  if (p >= 0)
    n = n.substring(0, p) + n.substr(p + 1, 2);
  unit = unit.substr(unit.length - n.length);
  for (var i = 0; i < n.length; i++)
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}
