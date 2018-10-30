import Vue from 'vue'
import moment from 'moment'
// 格式化数字（例子：1,000,000）
Vue.filter('thousand', (el) => {
  var result = [],
    counter = 0
  if (el != el.toString().replace(/\d+\.(\d*)/, '$1')) {
    var floot = '.' + el.toString().replace(/\d+\.(\d*)/, '$1')
  } else {
    var floot = ''
  }
  el = parseInt(el)
  el = (el || 0).toString().split('')
  // console.log(el)
  for (var i = el.length - 1; i >= 0; i--) {
    counter++
    result.unshift(el[i])
    if (!(counter % 3) && i != 0) {
      result.unshift(',')
    }
  }
  el = result.join('')
  return el + floot
})
// 时间过滤器（带时分秒）
Vue.filter('YYYY-MM-DD-hh-mm-ss', (data, formatString) => {
  data = Number(data) * 1000
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return moment(data).format(formatString)
})
// 时间过滤器（带分时）
Vue.filter('YYYY-MM-DD-hh-mm', (data, formatString) => {
  data = Number(data) * 1000
  formatString = formatString || 'YYYY-MM-DD HH:mm'
  return moment(data).format(formatString)
})
// 时间过滤器（不带分时）
Vue.filter('YYYY-MM-DD', (data, formatString) => {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(data).format(formatString)
})
// 时间过滤器（不要年，有月、日、时、分）
Vue.filter('MM-DD-hh-mm', (data, formatString) => {
  data = Number(data)
  formatString = formatString || 'MM-DD HH:mm'
  return moment(data).format(formatString)
})

// 隐藏用户名字（默认保留姓，可选保留前面num位）
// num位需要显示的个数，从左往右计数，页面中使用方法为{{data | hidden-name(2)}}
Vue.filter('hidden-name', (data, num) => {
  if (num == undefined) {
    num = 1
  }
  data = data.toString().split('')
  var dataLength = data.length
  var firstName = data.splice(0, num)
  for (var i = 1; i < dataLength; i++) {
    firstName.push('*')
  }
  return firstName.join('')
})

// 隐藏手机号中间n位(当n为空是默认隐藏5位)
// num 为隐藏手机号中间的位数，页面中使用方法为{{data | hidden-tel(5)}}
Vue.filter('hidden-tel', (phone, num) => {
  // console.log(num)
  if (num == undefined) {
    num = 5
  }
  phone = phone.toString().split('')
  var firstNum = (11 - num) / 2
  var lastNum = (11 - num) / 2 + num
  var phoneLength = phone.length
  var first = phone.splice(0, firstNum)
  var last = phone.splice(num, lastNum)
  var mid = []
  var newPhone = []
  for (var i = 1; i <= num; i++) {
    mid.push('*')
  }
  newPhone = first.concat(mid, last)
  return newPhone.join('')
})

// 保留小数点后n位，不传默认2
Vue.filter('limitDoc', (nub, num) => {
  nub = Number(nub)
  if (num == undefined) {
    num = 2
  }
  return nub.toFixed(num)
})

// 当前变量不存在时，设置默认值
Vue.filter('default', (nub, num) => {
  if (nub === 0) {
    return nub
  } else if (nub == '' || nub == undefined || nub == NaN) {
    return num
  } else {
    return nub
  }
})

// 取整
Vue.filter('getInt', (nub) => {
  return parseInt(nub)
})

// 时间格式去掉年
Vue.filter('time', (nub) => {
  let arr = nub.split('')
  let newarr = arr.splice(5, arr.length)
  return newarr.join('')
})

// 时间格式去 时、分、秒
Vue.filter('dateyear', (nub) => {
  let arr = nub.split('')
  let newarr = arr[0]
  return newarr
})

// 时间节点（刚刚，1小时前，2小时前等）
Vue.filter('current', (nub, status) => {
  let create = nub * 1000
  let now = new Date().getTime()
  let left = now - create
  let day = '',
    hour = '',
    min = ''
  day = left / 1000 / 60 / 60 / 24
  hour = left / 1000 / 60 / 60
  min = left / 1000 / 60
  // if (status == 1) {
  //
  // } else {
  //   return moment(create).format('YYYY-MM-DD HH:mm:ss')
  // }
  if (parseInt(day) == 0) {
    if (parseInt(hour) < 1) {
      if (parseInt(min) < 1) {
        return `刚刚`
      } else {
        return `${parseInt(min)}分钟前`
      }
    } else {
      return `${parseInt(hour)}小时前`
    }
  } else {
    return moment(create).format('YYYY-MM-DD HH:mm:ss')
  }
})

// 把boolen值换成是或者否
Vue.filter('getBoolen', (nub) => {
  if (nub) {
    return '是'
  } else {
    return '否'
  }
})