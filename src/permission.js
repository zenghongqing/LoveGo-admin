import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/addAdmin'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        console.log(getToken())
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
