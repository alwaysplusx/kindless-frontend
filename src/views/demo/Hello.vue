<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <el-button @click.native="doSomething">Let's do it</el-button>
    <el-button @click.native="toIndex">Index</el-button>
    <el-button @click.native="toUser">User</el-button>
    <el-button @click.native="nprogress">NProgress Bar</el-button>
    <router-view></router-view>
  </div>
</template>

<script>

import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

export default {
  name: 'hello',
  components: {
    NprogressContainer
  },
  methods: {
    doSomething () {
      this.$notify({
        title: 'It Works',
        message: 'Let\'s to do something',
        duration: 6000
      })
    },
    toIndex () {
      this.$router.push('/')
    },
    toUser () {
      this.$router.push('/user')
    },
    nprogress () {
      console.log(this.$nprogress)
      this.$nprogress.start()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0px;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;
}
</style>
