<template>
  <div class="sidebar-container">
    <el-menu mode="vertical" :default-active="$route.path" router>
      <sidebar-item :data='data'></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
  import $ from '@/apis'
  import SidebarItem from './SidebarItem'

  export default {
    components: {
      SidebarItem
    },
    data () {
      return {
        data: [],
        rootVisible: false
      }
    },
    created () {
      this.getMenus()
    },
    methods: {
      getMenus () {
        $.menu.getTree()
        .then(data => {
          if (this.rootVisible) {
            this.data = data
          } else {
            this.data = data[0].children
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu {
    min-height: 100%;
  }
  .sidebar-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px;
    overflow-y: scroll;
    transition: all .28s ease-out;
  }
</style>
