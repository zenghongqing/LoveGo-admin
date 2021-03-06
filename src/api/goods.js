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
export function getProduct (params) {
    return request({
        url: '/api/shop/GetProduct',
        method: 'post',
        data: params
    })
}
export function editProduct (params) {
    return request({
        url: '/api/EditGoods',
        method: 'post',
        data: params
    })
}
export function createCategory (params) {
    return request({
        url: '/api/CreateCategory',
        method: 'post',
        data: params
    })
}
export function deleteCategory (params) {
    return request({
        url: '/api/DeleteCategory',
        method: 'post',
        data: params
    })
}
export function editCategory (params) {
    return request({
        url: '/api/EditCategory',
        method: 'post',
        data: params
    })
}
