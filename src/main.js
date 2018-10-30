// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import store from './store'
import Icon from 'vue-svg-icon/Icon.vue'
Vue.component('icon', Icon)

import './assets/js/rem'
require('vue2-animate/dist/vue2-animate.min.css')
import './assets/sass/style.sass'
import './components/component'
import './filter/filter'
import './token/permission'
import './libs/menu'
import './libs/userinfo'
// import './libs/vconsole'

Vue.use(MintUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})