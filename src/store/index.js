import Vuex from 'vuex'
import Vue from 'vue'
import app from './modules/app'
import admin from './modules/admin'
import user from './modules/user'
import shop from './modules/shop'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        admin,
        user,
        shop
    },
    getters
})
