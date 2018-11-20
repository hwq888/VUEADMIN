import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '../pages/Login'
import Main from '../pages/Main.vue'
import Box from '../pages/Box.vue'
import home from '../pages/Home'
import NotFound from '../pages/404.vue'

import Table from '../pages/nav1/Table.vue'
import TableDetails from '../pages/nav1/TableDetails.vue'
import Form from '../pages/nav1/Form.vue'
import user from '../pages/nav1/user.vue'
import Page4 from '../pages/nav2/Page4.vue'
import Page5 from '../pages/nav2/Page5.vue'
import Page6 from '../pages/nav3/Page6.vue'
import Page7 from '../pages/nav4/Page7.vue'
import Page8 from '../pages/nav4/Page8.vue'
import Page9 from '../pages/nav4/Page9.vue'
import Page10 from '../pages/nav4/Page10.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: login, meta: {title: '登录'}},
    {path: '/login', component: login, meta: {title: '登录'}},
    {path: '/',
      component: Main,
      name: '',
      meta: {title: '首页'},
      iconCls: 'iconfont icon-guhua',
      leaf: true, // 只有一个节点
      children: [
        {path: '/home', component: home, name: 'home', meta: {title: ''}}
      ]
    },
    {path: '/',
      component: Main,
      showNav: true,
      name: '导航一',
      meta: {title: '导航一'},
      iconCls: 'el-icon-message',
      children: [
        // { path: '/home', component: home, name: '主页', hidden: true },
        { path: '/table', component: Table, name: 'table', meta: {title: 'Table'} },
        { path: '/form', component: Form, name: 'form', meta: {title: 'Form'} },
        { path: '/user', component: user, name: 'user', meta: {title: 'User'} }
      ]
    },
    {path: '/',
      component: Main,
      meta: {title: '首页'},
      children: [
        { path: '/tableDetails', component: TableDetails, name: 'TableDetails', meta: {title: '详情'} }
      ]
    },
    {path: '/',
      component: Main,
      showNav: true,
      name: '导航二',
      meta: {title: '导航二'},
      iconCls: 'iconfont icon-goumai',
      children: [
        { path: '/page4', component: Page4, name: 'page4', meta: {title: '页面4'} },
        { path: '/page5', component: Page5, name: 'page5', meta: {title: '页面5'} }
      ]
    },
    {path: '/',
      component: Main,
      showNav: true,
      name: '导航三',
      meta: {title: ''},
      iconCls: 'iconfont icon-guhua',
      leaf: true, // 只有一个节点
      children: [
        { path: '/page6', component: Page6, name: 'page6', meta: {title: '导航三'} }
      ]
    },
    {path: '/',
      component: Main,
      showNav: true,
      showThreeNav: true,
      name: '导航四',
      meta: {title: '导航四'},
      iconCls: 'iconfont icon-goumai',
      children: [
        {path: '/one',
          component: Box,
          name: '多菜单一',
          meta: {title: '多菜单一'},
          children: [
            {path: '/page7', component: Page7, name: 'page7', meta: {title: '页面7'}},
            {path: '/page8', component: Page8, name: 'page8', meta: {title: '页面8'}}
          ]
        },
        {path: '/two',
          component: Box,
          name: '多菜单二',
          meta: {title: '多菜单二'},
          children: [
            {path: '/page9', component: Page9, name: 'page9', meta: {title: '页面9'}},
            {path: '/page10', component: Page10, name: 'page10', meta: {title: '页面10'}}
          ]
        }
      ]
    },
    {path: '/404', component: NotFound, meta: {name: '404'}},
    {path: '*', redirect: { path: '/404' }}
  ]
})
