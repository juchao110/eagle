const HEADERTITLE = 'HEADERTITLE'
const SETUSERINFO = 'SETUSERINFO'
const SETLEFTMENU = 'SETLEFTMENU'
const CHANGEMENUICON = 'CHANGEMENUICON'

export default {
  [HEADERTITLE](state, value) {
    state.headerTitle = value
  },
  [SETUSERINFO](state, value) {
    state.userInfo = value
  },
  [SETLEFTMENU](state, value) {
    state.leftMenu = value
  },
  [CHANGEMENUICON](state, value) {
    state.menuIcon = value
  }
}