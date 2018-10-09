import Vuex from 'vuex'
import Vue from 'vue'
import app from './modules/app'
import admin from './modules/admin'
import user from './modules/user'
import shop from './modules/shop'
import goods from './modules/goods'
import order from './modules/order'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        admin,
        user,
        shop,
        goods,
        order
    },
    getters
})
