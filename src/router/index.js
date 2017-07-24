import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import Login from '@/views/login'

import Dashboard from '@/views/dashboard'

import User from '@/views/user'
import Menu from '@/views/menu'
import Role from '@/views/demo/Role'
import Permission from '@/views/demo/Permission'

Vue.use(Router)

const routes = [{
  name: '首页',
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [
    {path: 'dashboard', component: Dashboard},
    {path: 'user', component: User},
    {path: 'role', component: Role},
    {path: 'permission', component: Permission},
    {path: 'menu', component: Menu}
  ]
}, {
  path: '/login',
  name: 'login',
  hidden: true,
  component: Login
}]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})
