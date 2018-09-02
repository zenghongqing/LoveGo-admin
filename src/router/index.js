import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'
// import HelloWorld from '@/components/HelloWorld'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: '首页',
        meta: {
          title: '首页',
          icon: 'home'
        },
        component: _import('dashboard/index')
      }
    ]
  }
]
export default new Router({
  routes: constantRouterMap
})
