import Vue from 'vue'
import router from '../router'
import {
  getUserInfo
} from '../../http/api.js'
import getToken from './getToken'
import store from '../store'
import {
  Toast
} from 'mint-ui'

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    store.commit('CHANGEMENUICON', false)
  }
  getToken(); //获取token
  store.commit('HEADERTITLE', to.meta.title) //设置页面header的title
  if (Vue.prototype.$token) {
    getUserInfo().then(res => {
      if (res.data.error !== undefined) {
        Toast({
          message: '登录失效，请重新登录',
          duration: 5000
        });
        localStorage.removeItem('token')
        next({
          path: '/login',
          redirect: to.fullPath
        })
        return
      }
      store.dispatch('setUserInfo', res.data) //保存用户信息到vuex
      localStorage.setItem('time', res.data.collect_interval)
      //判断权限
      if (!to.meta.roles) {
        next()
      } else if (to.meta.roles && to.meta.roles.indexOf(res.data.roles[0]) < 0) {
        Toast({
          message: '对不起，您无权访问',
          duration: 3000
        })
      } else {
        next()
      }
    })
  } else {
    if (to.matched.some(record => record.meta.requireAuth)) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }

  }
})