// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import 'element-ui/lib/theme-default/index.css'
import 'material-icons/css/material-icons.css'
import 'font-awesome/scss/font-awesome.scss'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

const whiteList = ['/login']

const isAccessPath = (path) => {
  return whiteList.indexOf(path) !== -1 || store.getters.authorized
}

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (isAccessPath(to.path)) {
    console.log('access path')
    next()
  } else if (to.path !== '/login') {
    console.log('not authorized to login')
    next('/login')
    NProgress.done()
  } else {
    console.log('other')
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
