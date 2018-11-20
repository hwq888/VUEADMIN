<template>
  <el-row class="container">
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
        <!--导航菜单-->
        <el-menu :default-active="currentPath" class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose" unique-opened :collapse="collapsed" router  background-color="#001529" text-color="hsla(0,0%,100%,.7)">
          <template v-for="(item,index) in $router.options.routes" v-if="item.showNav">
            <el-submenu :index="index+''" :key="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.meta.title}}</span>
              </template>
              <!--三级菜单-->
              <template v-if="item.showThreeNav">
                <el-menu-item-group v-for="itemChild in item.children" :index="itemChild.path" :key="itemChild.path" >
                  <template slot="title">{{itemChild.meta.title}}</template>
                  <el-menu-item v-for="child in itemChild.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.meta.title}}</el-menu-item>
                </el-menu-item-group>
              </template>
              <!--三级菜单-->
              <!--二级菜单-->
              <template v-else>
                  <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.meta.title}}</el-menu-item>
              </template>
              <!--二级菜单-->
            </el-submenu>
            <!--一级菜单-->
            <el-menu-item v-if="item.leaf&&item.children.length>0" :key="item.children[0].path" :index="item.children[0].path">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.children[0].meta.title}}</span>
            </el-menu-item>
            <!--一级菜单-->
          </template>
        </el-menu>
        <!--导航菜单-->
      </aside>
      <el-row class="content-container">
        <!--右端-顶部-->
        <el-col :span="24" class="header">
          <el-col :span="24" class="breadcrumb-container">
            <div class="fl tools" @click.prevent="collapse">
              <i class="iconfont">&#xe62f;</i>
            </div>
            <div class="fl">
              <!--<strong class="title fl">{{$route.name}}</strong>-->
              <el-breadcrumb separator="/" class="fl breadcrumb-inner">
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                  {{ item.meta.title }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="userinfo fr">
              <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner"><img src="../assets/images/user.png" /> {{sysUserName}}</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>我的消息</el-dropdown-item>
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-col>
        <!--右端-顶部-->
        <!--右端-菜单列表-->
        <el-col :span="24" class="tag-nav-wrapper">
          <TagsNav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
        </el-col>
        <!--右端-菜单列表-->
        <!--右端-内容-->
        <el-col :span="24" class="content-wrapper rel">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
        <!--右端-内容-->
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util'
import TagsNav from '@/components/Main/tags-nav'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import { mapMutations } from 'vuex'
export default {
  components: {
    TagsNav
  },
  data () {
    return {
      sysName: 'VUEADMIN',
      currentPath: '/home',
      minLogo,
      maxLogo,
      collapsed: false,
      sysUserName: '',
      sysUserAvatar: ''
    }
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    }
  },
  watch: {
    '$route' (newRoute) {
      // console.log('Watch Router Start')
      // console.log(newRoute)
      // console.log('Watch Router End')
      this.setBreadCrumb(newRoute.matched)
      // debugger
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  mounted () {
    this.currentPath = this.$route.path
    let user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.sysUserName = user.name || ''
      this.sysUserAvatar = user.avatar || ''
    }
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag({route: this.$store.state.app.homeRoute})
    this.setBreadCrumb(this.$route.matched)
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag'
    ]),
    onSubmit () {
      console.log('submit!')
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleselect: function (a, b) {
    },
    // 退出登录
    logout: function () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('user')
        _this.$router.push('/login')
      }).catch(() => {

      })
    },
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    // showMenu (i, status) {
    //   this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
    // },
    handleClick (item) {
      this.turnToPage(item)
    },
    turnToPage (route) {
      // debugger
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
      if (route.path) {
        this.currentPath = route.path
      }
    },
    handleCloseTag (res, type, route) {
      // debugger
      let _path = ''
      if (type === 'all') {
        this.turnToPage('home')
        _path = '/home'
      } else if (routeEqual(this.$route, route)) {
        // debugger
        if (type === 'others') {
          _path = route.path
        } else {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
          _path = nextRoute.path
        }
      }
      this.setTagNavList(res)
      if (_path) {
        this.currentPath = _path
      }
    }
  }
}

</script>

<style scoped lang="less">
  /*@import '~scss_vars';*/
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: #fff;
      color:#fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#606266;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          color: #515a6e;
          font-size: 14px;
        }
        .breadcrumb-inner {
          height:60px; line-height: 60px;
        }
      }
      .tools{
        padding: 0px 35px 0 15px;
        width:24px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        .iconfont{
          color: #515a6e;
          font-size: 24px;
        }
      }
    }
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 0px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex:0 0 230px;
        width: 230px;
        background: #001529;
        .logo-con{
          height: 64px;
          padding: 10px 0;
          /*background: #2d8cf0;*/
          /*width: 230px;*/
          /*overflow: hidden;*/
          img{
            height: 60px;
            width: auto;
            display: block;
            margin: 0 auto;
          }
        }
        .el-menu-vertical-demo{
          .iconfont{ margin: 0; display: inline-block; font-size: 18px; width: 24px; text-align: center; vertical-align: middle;}
        }
        .el-menu-vertical-demo:not(.el-menu--collapse) {
          width: 230px;
          .iconfont{ font-size: 18px;display: inline-block; margin-right: 5px; width: 24px; text-align: center; vertical-align: middle;}
        }
        .el-menu{
          border-right:0;
          height: 100%;
        }
        .collapsed{
          width:60px;
          background: #001529;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }

        }
        /*.el-menu--dark{background-color:#fff;}*/
        /*.el-menu--dark.is-active{  background: #f1f2f7;  }*/
        /*.el-menu{  background: #fff;}*/
        /*.el-submenu .el-menu,.el-menu-item {*/
          /*background-color: #F7F7F7;*/
        /*}*/
        .el-submenu.is-active.is-opened{
          .el-menu li{ background: #000!important;}
          .el-menu li.is-active{ background: #2d8cf0!important; color: #fff!important;}
        }
      }
      .menu-collapsed{
        flex:0 0 60px;
        width: 64px;
        transition:all 0.25s ease-out 0s;
      }
      .menu-expanded{
        flex:0 0 230px;
        width: 230px;
        transition:all 0.25s ease-out 0s;
      }
      .content-container {
        background: #f1f2f7;
        flex:1;
        .content-wrapper {
          overflow-x: hidden;
          overflow-y: scroll;
          box-sizing: border-box;
          height: calc(100% - 100px);
          padding: 10px 10px 60px;
        }
        .tag-nav-wrapper {
          height: 40px; background: #f0f0f0; overflow: hidden; padding:0;
        }
      }
    }
  }
</style>
