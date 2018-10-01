import {
    createShop,
    getShopList,
    getShopInfo,
    editShop,
    deleteShop,
    editShopCategory,
    addShopCategory,
    deleteShopCategory
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
                    if (res && res.data) {
                        resolve()
                    }
                }).catch(e => {
                    reject(e)
                })
            })
        },
        DeleteShop ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                deleteShop(formData).then(res => {
                    console.log(res, 'deleteShop')
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        EditShopCategory ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                editShopCategory(formData).then(res => {
                    console.log(res, 'res')
                    if (res.status === 200) {
                        resolve(res)
                    }
                }).catch(e => {
                    reject(e)
                })
            })
        },
        AddShopCategory ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                addShopCategory(formData).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        DeleteShopCategory ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                deleteShopCategory(formData).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        }
    }
}
export default shop
