import request from '@/utils/service'
export function getAllCategory () {
    return request({
        url: '/api/GetAllCategory',
        method: 'post',
        data: {}
    })
}
export function createGoods (params) {
    return request({
        url: '/api/CreateGoods',
        method: 'post',
        data: params
    })
}
export function getGoodsList (params) {
    return request({
        url: '/api/GetGoodsList',
        method: 'post',
        data: params
    })
}
export function deleteGoods (params) {
    return request({
        url: '/api/DeleteGoods',
        method: 'post',
        data: params
    })
}
