import Vue from 'vue'
let from = window.location.hash
let arr = from.split('')
if (from.indexOf('token') > -1) {
  let token = arr.splice((from.indexOf('token') + 6), arr.length).join('')
  localStorage.setItem('token', token)
}

export default function() {
  if (localStorage.token) {
    Vue.prototype.$token = {
      headers: {
        'user_token': localStorage.token,
      }
    }
    //   图片的token 使用
    Vue.prototype.$ImgHeader = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'user_token': localStorage.token
      }
    }
  } else if (sessionStorage.token) {
    Vue.prototype.$token = {
      headers: {
        'user_token': sessionStorage.token,
      }
    }
    //   图片的token 使用
    Vue.prototype.$ImgHeader = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'user_token': sessionStorage.token
      }
    }
  } else {
    Vue.prototype.$token = ''
    Vue.prototype.$ImgHeader = ''
  }
}