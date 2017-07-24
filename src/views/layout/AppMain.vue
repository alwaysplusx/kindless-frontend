<template>
  <div class="main-container">
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key () {
        return (this.$route.name !== undefined ? this.$route.name : this.$route) + '_' + +new Date()
      }
    }
  }
</script>

<style>
  .main-container {
    min-height: 100%;
    margin: 20px;
  }
</style>
