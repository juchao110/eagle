import {
  getUserInfo
} from '../../http/api.js'
import store from 'vuex'
import router from '../router'


// router.beforeEnter((to, from, next) => {
//   console.log(to)
//   console.log(from)
//   next()
// })

// getUserInfo().then(res => {
//   if (res.data.error !== undefined) {
//     Toast({
//       message: '登录失效，请重新登录',
//       duration: 5000
//     });
//     this.$router.push({
//       path: '/login'
//     })
//     return
//   }
//   this.setUserInfo(res.data)
//   this.getInfo = true
//   localStorage.setItem('time', res.data.collect_interval)
// })