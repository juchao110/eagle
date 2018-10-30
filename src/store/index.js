import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action.js'
import mutations from './mutation.js'
import getters from './getters.js'
Vue.use(Vuex);
const state = {
  number: 1,
  menuIcon: true, //menu图标是否显示的状态
  title: '',
  headerTitle: '',
  userInfo: '',
  letMenu: ''
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})