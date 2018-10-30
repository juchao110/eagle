export default {
  addNumber({
    commit
  }, nb) {
    commit('ADD', nb)
  },
  setUserInfo({
    commit
  }, value) {
    commit('SETUSERINFO', value)
  },
  setLeftMenu({
    commit
  }, value) {
    commit('SETLEFTMENU', value)
  }
}