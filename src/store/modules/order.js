import {
    getOrderList,
    getOrder
} from '@/api/order'

const order = {
    state: {
        orderListData: null
    },
    mutations: {
        SET_ORDER_LIST_DATA: (state, orderListData) => {
            state.orderListData = orderListData
        }
    },
    actions: {
        GetOrderList ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                getOrderList(formData).then(res => {
                    commit('SET_ORDER_LIST_DATA', res.data.data)
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        GetOrder ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                getOrder(formData).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        }
    }
}
export default order
