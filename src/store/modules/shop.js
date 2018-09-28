import {
    createShop,
    getShopList
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
                    if (res) {
                        resolve(res)
                    }
                }).catch(e => {
                    reject(e)
                })
            })
        }
    }
}
export default shop
