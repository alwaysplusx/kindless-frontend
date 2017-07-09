<template>
  <div>
    <div v-for="item in menus" :key="item.id">
      <el-submenu :index="item.path" v-if="!item.hidden">
        <template slot="title">
          <i v-if="item.icon" :class="item.icon" aria-hidden="true"></i> {{item.name}}
        </template>
  
        <div v-for="child in item.children" v-if="!child.hidden" :key="child.id">
          <div v-if="child.group && child.children && child.children.length > 0">
            <el-menu-item-group>
              <template slot="title">
                <i v-if="child.icon" :class="child.icon" aria-hidden="true"></i> {{child.name}}
              </template>
              <div v-for="cc in child" :key="cc.id">
                <sidebar-item v-if="cc.children && cc.children.length > 0" :menus="cc.children" class="menu-indent"></sidebar-item>
                <!--<el-menu-item :index="cc.path" class="menu-indent">AAA</el-menu-item>-->
              </div>
            </el-menu-item-group>
          </div>
          <div v-else>
            <sidebar-item v-if="child.children && child.children.length > 0" :menus="[child]" class="menu-indent"></sidebar-item>
            <el-menu-item v-else :index="child.path" class="menu-indent">{{child.name}}</el-menu-item>
          </div>
  
        </div>
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    menus: {
      type: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.menu-indent {
  display: block;
  text-indent: 10px;
}
</style>
