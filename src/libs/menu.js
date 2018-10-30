import router from '../router'
import store from '../store'

let routerValue = router.options.routes
let menuValue = []

function filterRouter(r) {
  let arr = []
  for (let i of r) {
    if (i.path !== '' && i.path !== '*' && i.path !== '/login' && i.path !== '/index') {
      arr.push(i)
    }
  }
  return arr
}
let newRoute = filterRouter(routerValue)
for (let i in newRoute) {
  menuValue.push({
    first: newRoute[i].meta.title,
    icon: newRoute[i].meta.icon
  })
  menuValue[i].child = []
  for (let j in newRoute[i].children) {
    if (newRoute[i].children[j].path !== '' && newRoute[i].children[j].meta.hidden !== true) {
      menuValue[i].child.push({
        second: newRoute[i].children[j].meta.title,
        link: `${newRoute[i].path}/${newRoute[i].children[j].path}`
      })
    }
  }
}
store.commit('SETLEFTMENU', menuValue)