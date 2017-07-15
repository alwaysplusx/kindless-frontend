<template>
  <div>
    <div v-for="item in menus" :key="item.id">
      <!-- leaf menu item -->
      <div v-if="!item.hidden && (!item.children || item.children.length == 0)">
				<el-menu-item :index="item.path">
					 <i v-if="item.icon" :class="item.icon" aria-hidden="true"></i>{{item.name}}
				</el-menu-item>
      </div>
      <!-- has children -->
      <el-submenu :index="item.path" v-if="!item.hidden && item.children && item.children.length > 0">
        <template slot="title">
          <i v-if="item.icon" :class="item.icon" aria-hidden="true"></i> {{item.name}}
        </template>
        <div v-for="child in item.children" v-if="!child.hidden" :key="child.id">
          <sidebar-item v-if="child.children && child.children.length > 0" :menus="[child]" class="menu-indent"></sidebar-item>
          <el-menu-item v-else :index="child.path" class="menu-indent">
            <i v-if="child.icon" :class="child.icon" aria-hidden="true"></i> {{child.name}}
          </el-menu-item>
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
    // text-indent: 5px;
  }
</style>
