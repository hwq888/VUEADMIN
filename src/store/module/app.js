// import { getBreadCrumbList, setTagNavListInLocalstorage, getMenuByRouter, getTagNavListFromLocalstorage, getHomeRoute, routeHasExist } from '@/libs/util'
import { getBreadCrumbList, setTagNavListInLocalstorage, getTagNavListFromLocalstorage, getHomeRoute, routeHasExist } from '@/libs/util'
import routers from '@/router/index.js'
export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getHomeRoute(routers.options.routes),
    local: ''
  },
  getters: {
    // menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)
  },
  mutations: {
    setBreadCrumb (state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
    },
    setTagNavList (state, list) {
      // debugger
      // console.log('setTagNavList start')
      // console.log(state)
      // console.log(list)
      if (list) {
        state.tagNavList = [...list]
        setTagNavListInLocalstorage([...list])
      } else state.tagNavList = getTagNavListFromLocalstorage()
      // console.log(state.tagNavList)
      // console.log('setTagNavList end')
    },
    addTag (state, { route, type = 'unshift' }) {
      // debugger
      if (!routeHasExist(state.tagNavList, route)) {
        if (type === 'push') {
          state.tagNavList.push(route)
        } else {
          if (route.name === 'home') {
            state.tagNavList.unshift(route)
          } else {
            // state.tagNavList.splice(1, 0, {'name': '首页', 'path': '/home', 'meta': {}})
            state.tagNavList.splice(1, 0, route)
          }
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      state.local = lang
    }
  }
}
