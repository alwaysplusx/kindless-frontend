<template>
  <div class="app-wrapper">
    <div class="headbar-wrapper">
      <Headbar></Headbar>
    </div>
    <div class="sidebar-wrapper">
      <Sidebar></Sidebar>
    </div>
    <div class="main-wrapper">
      <App-main></App-main>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain, Headbar } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    Sidebar,
    AppMain,
    Headbar
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$headbar-height: 50px;
$sidebar-width: 210px;
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .headbar-wrapper {
    top: 0px;
    right: 0px;
    left: 0px;
    height: $headbar-height;
    transition: all .28s ease-out;
  }
  .sidebar-wrapper {
    position: fixed;
    width: 210px;
    top: $headbar-height;
    bottom: 0px;
    left: 0px;
    z-index: 1001;
    overflow: hidden;
    transition: all .28s ease-out;
  }
  .main-wrapper {
    min-height: 100%;
    transition: all .28s ease-out;
    margin-left: $sidebar-width;
  }
}
</style>
