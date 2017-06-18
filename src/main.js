// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import NProgress from 'vue-nprogress'
import App from './App'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(NProgress)

const nprogress = new NProgress({ parent: '.nprogress-container' })

router.beforeEach((to, from, next) => {
  if (store.authorized) {
    console.info('logined and authorized')
    next()
  } else if (to.path === '/') {
    console.info('not authorized')
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  nprogress,
  ...App
}).$mount('#app')
