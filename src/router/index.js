import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/views/demo/Hello'
import User from '@/views/demo/User'
import Layout from '@/views/layout/Layout'
import Login from '@/views/login'

Vue.use(Router)

const routes = [{
  path: '/',
  // redirect: '/user',
  name: 'layout',
  component: Layout
}, {
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/user',
  name: 'user',
  component: User
}, {
  path: '/test/user',
  name: 'test',
  component: User
}]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})
