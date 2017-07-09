<template>
  <div class="app-wrapper">
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container"></Sidebar>
    </div>
    <div class="main-container">
      <App-main></App-main>
    </div>
  </div>
</template>

<script>
  import { Sidebar, AppMain } from '@/views/layout'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      AppMain
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .sidebar-wrapper {
      width: 210px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      transition: all .28s ease-out;
    }
    .sidebar-container {
      transition: all .28s ease-out;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: -17px;
      overflow-y: scroll;
    }
    .main-container {
      min-height: 100%;
      transition: all .28s ease-out;
      margin-left: 210px;
    }
  }
</style>
