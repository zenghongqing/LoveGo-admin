import {
    getAllCategory,
    createGoods,
    getGoodsList,
    deleteGoods,
    getProduct,
    editProduct
} from '@/api/goods'

const goods = {
    state: {
        goodsListData: null
    },
    mutations: {
        SET_GOODS_LIST_DATA: (state, goodsListData) => {
            state.goodsListData = goodsListData
        }
    },
    actions: {
        GetAllCategory ({commit, state}) {
            return new Promise((resolve, reject) => {
                getAllCategory().then((res) => {
                    resolve(res.data)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        CreateGoods ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                createGoods(formData).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        GoodsList ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                getGoodsList(formData).then((res) => {
                    if (res && res.data) {
                        commit('SET_GOODS_LIST_DATA', res.data)
                        resolve(res.data)
                    }
                }).catch(e => {
                    reject(e)
                })
            })
        },
        DeleteGoods ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                deleteGoods(formData).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        GetProduct ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                getProduct(formData).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        EditGoods ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                editProduct(formData).then(res => {
                    console.log(res, 'editData')
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        }
    }
}
export default goods
