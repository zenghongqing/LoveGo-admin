import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'
// import HelloWorld from '@/components/HelloWorld'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
const constantRouterMap = [
    {// 登录
        path: '/login',
        component: _import('login/index'),
        hidden: true
    },
    {// 404页面
        path: '/404',
        component: _import('404'),
        hidden: true
    },
    {// 注册页
        path: '/addAdmin',
        component: _import('senior/addAdmin'),
        hidden: true
    },
    {// 首页
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
    },
    {
        path: '/user',
        component: Layout,
        name: 'user',
        meta: {
            title: '用户管理',
            icon: 'user'
        },
        children: [
            {
                path: 'userInfo',
                name: 'userInfo',
                component: _import('user/userInfo'),
                meta: {
                    title: '用户列表',
                    icon: 'user'
                }
            }
        ]
    },
    {
        path: '/shop',
        component: Layout,
        name: 'shop',
        meta: {
            title: '店铺管理',
            icon: 'store'
        },
        children: [
            {
                path: 'shopInfo',
                name: 'shopInfo',
                component: _import('shop/shopInfo'),
                meta: {
                    title: '店铺管理',
                    icon: 'table'
                }
            },
            {
                path: 'addShop',
                name: 'addShop',
                component: _import('shop/addShop'),
                meta: {
                    title: '新增店铺',
                    icon: 'add'
                }
            },
            {
                path: 'shopCategory',
                name: 'shopCategory',
                hidden: true,
                component: _import('shop/shopCategory'),
                meta: {
                    title: '商品分类管理',
                    icon: 'add'
                }
            },
            {
                path: 'editShop',
                name: 'editShop',
                hidden: true,
                component: _import('shop/editShop'),
                meta: {
                    title: '编辑店铺',
                    icon: 'edit'
                }
            }
        ]
    },
    {
        path: '/goods',
        component: Layout,
        name: 'goods',
        meta: {
            title: '商品管理',
            icon: 'goods'
        },
        children: [
            {
                path: 'goodsInfo',
                name: 'goodsInfo',
                component: _import('goods/goodsInfo'),
                meta: {
                    title: '商品列表',
                    icon: 'table'
                }
            },
            {
                path: 'addGoods/:shopId',
                name: 'addGoods',
                hidden: true,
                component: _import('goods/addGoods'),
                meta: {
                    title: '添加商品',
                    icon: 'add'
                }
            },
            {
                path: 'editGoods/:id',
                name: 'editGoods',
                hidden: true,
                component: _import('goods/editGoods'),
                meta: {
                    title: '编辑商品',
                    icon: 'user'
                }
            },
            {
                path: 'goodsCategory',
                name: 'goodsCategory',
                component: _import('goods/goodsCategory'),
                meta: {
                    title: '商品分类管理',
                    icon: 'tree'
                }
            }
        ]
    },
    {
        path: '/order',
        name: 'order',
        component: Layout,
        meta: {
            title: '订单管理',
            icon: 'order'
        },
        children: [
            {
                path: 'orderList',
                name: 'orderList',
                component: _import('order/orderList'),
                meta: {
                    title: '订单信息',
                    icon: 'table'
                }
            },
            {
                path: 'orderInfo/:id',
                name: 'orderInfo',
                hidden: true,
                component: _import('order/orderInfo'),
                meta: {
                    title: '订单详情',
                    icon: 'user'
                }
            }
        ]
    },
    {
        path: '/senior',
        component: Layout,
        name: 'senior',
        meta: {
            title: '高级用户管理',
            icon: 'settings'
        },
        children: [
            {
                path: 'adminInfo',
                name: 'adminInfo',
                component: _import('senior/adminInfo'),
                meta: {
                    title: '管理员信息',
                    icon: 'admin'
                }
            },
            {
                path: 'editAdmin/:id',
                name: 'editAdmin',
                hidden: true,
                component: _import('senior/editAdmin'),
                meta: {
                    title: '编辑管理员',
                    icon: 'user'
                }
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]
export default new Router({
    routes: constantRouterMap
})
