<template>
  <div class="app-wrapper">
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container" />
  </div>
  <div class="main-container">
  <App-main/>
  </div>
</div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from 'views/layout';

  export default {
      name: 'layout',
      components: {
        Navbar,
        Sidebar,
        AppMain
    },
    computed: {
        sidebar() {
          return this.$store.state.app.sidebar;
      }
  }
}
</script>
