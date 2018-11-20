// import config from '@/config'
import {objEqual} from '@/libs/tools'

export const regExp = {
  kong: /\S/, // 非空
  phone: /^1\d{10}$/, // 手机号
  number: /^[0-9]*$/, // 只能是数字x
  numberd: /^\d+(\.\d+)?$/, // 只能是数字和小数点
  numberdOrAmount: /^\d+(\.\d{2})?$/, // 限制输入数字，且小数点保留两位
  amount: /^(([1-9][0-9]*)|(([0]|[0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, // 金额
  area: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 文本域：10-200个汉字或字母
  isZh: /^[\u4E00-\u9FA5]{2,4}$/, // 姓名
  contactReg: /^[A-Za-z\u4e00-\u9fa5]+$|[a-z]]/, // 联系人：姓名至少一个汉字或字母
  contractNoReg: /\S/, // 合同编号 匹配由数字和26个英文字母组成的字符串
  nameReg: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 名称 至少一个汉字或字母
  busReg: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 商家/公司名称 姓名至少一个汉字或字母
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, // 邮箱号码
  password: /^[\x21-\x7E]{6,20}$/, // 密码
  phoneEmail: /^[1]{1}[0-9]{10}$|(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, // 匹配手机邮箱
  idCard: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/, // 简单身份证校验
  banknum: /^(\d{16}|\d{18}|\d{19}|\d{20}|\d{21})$/ // 银行卡
}

/*
 *说明：localStorage存储对象
 * @param key：对象  obj：对象的值
 * */
export const setLocalStorage = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj))
}
/*
  *说明：获取localStorage获取对象数据
  *key：对象
  * */
export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
/*
  *说明：localStorage删除对象
  * key：对象  obj：对象的值
  * */
export const delLocalStorage = (key) => {
  localStorage.removeItem(key)
}
/*
  *说明：localStorage删除所有
  * key：对象  obj：对象的值
  * */
export const delAllLocalStorage = (key) => {
  localStorage.clear()
}
/*
  *说明：设置cookie方法
  *key：对象  val：对象的值   time：过去时间（小时）
  * */
export const setCookie = (key, val, time) => {
  if (time) {
    let date = new Date() // 获取当前时间
    const hours = time // 将date设置为n小时以后的时间
    date.setTime(date.getTime() + hours * 3600 * 1000) // 格式化为cookie识别的时间
    document.cookie = key + '=' + val + ';expires=' + date.toGMTString() // 设置cookie
  } else {
    document.cookie = key + '=' + val
  }
}
/*
*说明：获取cookie方法
 *key：对象
 * */
export const getCookie = (key) => {
  const getCookie = document.cookie.replace(/[ ]/g, '') // 获取cookie，并且将获得的cookie格式化，去掉空格字符
  const arrCookie = getCookie.split(';') // 将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
  let tips // 声明变量tips
  for (let i = 0; i < arrCookie.length; i++) { // 使用for循环查找cookie中的tips变量
    const arr = arrCookie[i].split('=') // 将单条cookie用"等号"为标识，将单条cookie保存为arr数组
    if (key === arr[0]) { // 匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
      tips = arr[1] // 将cookie的值赋给变量tips
      break // 终止for循环遍历
    }
  }
  return tips
}
/*
  *说明：删除cookie方法
  *key：对象
  * */
export const deleteCookie = (key) => {
  let date = new Date() // 获取当前时间
  date.setTime(date.getTime() - 10000) // 将date设置为过去的时间
  document.cookie = key + '=v; expires =' + date.toGMTString()// 设置cookie
}

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
// export const getMenuByRouter = (list, access) => {
//   let res = []
//   forEach(list, item => {
//     if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
//       let obj = {
//         icon: (item.meta && item.meta.icon) || '',
//         name: item.name,
//         meta: item.meta
//       }
//       if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
//         obj.children = getMenuByRouter(item.children, access)
//       }
//       if (item.meta && item.meta.href) obj.href = item.meta.href
//       if (showThisMenuEle(item, access)) res.push(obj)
//     }
//   })
//   return res
// }

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched, homeRoute) => {
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [Object.assign(homeRoute, { to: homeRoute.path }), ...res]
}

// export const showTitle = (item, vm) => vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)
export const showTitle = (item, vm) => ((item.meta && item.meta.title) || item.name)

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  // debugger
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) return res
    } else {
      if (item.name === 'home') homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  // debugger
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  // console.log('getNewTagList end' + newList)
  return newList
}
/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  // debugger
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}
/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  // debugger
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}
