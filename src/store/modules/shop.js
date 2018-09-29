import {
    createShop,
    getShopList,
    getShopInfo,
    editShop
} from '@/api/shop'
// import {
//     getToken,
//     setToken,
//     removeToken
// } from '@/utils/auth'
const shop = {
    state: {
        shopData: null
    },
    mutations: {
        SET_SHOP_DATA: (state, shopData) => {
            state.shopData = shopData
        }
    },
    actions: {
        CreateShop ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                createShop(formData).then(res => {
                    if (res) {
                        resolve(res)
                    }
                }).catch(e => {
                    reject(e)
                })
            })
        },
        GetShopList ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                getShopList(formData).then(res => {
                    console.log(res, 'shopList')
                    if (res) {
                        commit('SET_SHOP_DATA', res)
                        resolve(res)
                    }
                }).catch(e => {
                    reject(e)
                })
            })
        },
        GetShopInfo ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                getShopInfo(formData).then(res => {
                    if (res) {
                        resolve(res)
                    }
                }).catch(e => {
                    reject(e)
                })
            })
        },
        EditShop ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                editShop(formData).then(res => {
                    console.log(res, 'editShop')
                    if (res && res.data) {
                        resolve()
                    }
                }).catch(e => {
                    reject(e)
                })
            })
        }
    }
}
export default shop
