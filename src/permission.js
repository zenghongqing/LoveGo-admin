import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import { Message } from 'element-ui'

const whiteList = ['/login', '/addAdmin'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            if (store.getters.userData === null) {
                const Token = getToken()
                store.dispatch('GetInfo', Token).then(res => {
                    next()
                })
            } else {
                if (to.path.indexOf('/senior') > -1 && store.getters.userData.roles !== 'root') {
                    Message.error('用户权限不足, 无法进入')
                    NProgress.done()
                    next({path: '/'})
                } else {
                    next()
                }
            }
        }
    } else {
        store.dispatch('LogOut').then(() => {
            if (whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                next('/login')
                NProgress.done()
            }
        })
    }
})
router.afterEach(() => {
    NProgress.done()
})
