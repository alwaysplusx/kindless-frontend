<template>
  <el-menu mode="vertical" theme="dark" :default-active="$route.path" router>
    <sidebar-item :menus='menus'></sidebar-item>
  </el-menu>
</template>

<script>
  // import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: {
      SidebarItem
    },
    data () {
      return {
        menus: [{
          path: '/home',
          name: 'Home',
          icon: 'el-icon-setting'
        }, {
          path: '/user',
          name: 'User',
          icon: 'el-icon-information',
          children: [
            { path: '/user', name: 'User Second' },
            { path: '/user/third', name: 'User Thrid' },
            { path: '/user/fourth', name: 'User Fourth' }
          ]
        }, {
          path: '/example',
          name: 'Example',
          icon: 'el-icon-menu',
          children: [
            {
              path: '/ga',
              group: true,
              name: 'Group A',
              icon: 'fa fa-paper-plane',
              children: [
                { path: '/example/ga/1', name: 'Gropu A Table' },
                { path: '/example/ga/2', name: 'Gropu A Grid' }
              ]
            },
            {
              path: '/gb',
              group: true,
              name: 'Group B',
              icon: 'fa fa-paper-plane-o',
              children: [
                { path: '/example/gb/1', name: 'Gropu B Table' },
                { path: '/example/gb/2', name: 'Gropu B Grid' }
              ]
            },
            { path: '/example/second', name: 'Second' },
            { path: '/example/third', name: 'Thrid' },
            { path: '/example/fourth', name: 'Fourth' }
          ]
        }]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu {
    min-height: 100%;
  }
</style>
