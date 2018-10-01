import request from '@/utils/service'
export function createShop (params) {
    return request({
        url: '/api/CreateShop',
        method: 'post',
        data: params
    })
}
export function getShopList (params) {
    return request({
        url: '/api/GetShopList',
        method: 'post',
        data: params
    })
}
export function getShopInfo (params) {
    return request({
        url: '/api/GetShopInfo',
        method: 'post',
        data: params
    })
}
export function editShop (params) {
    return request({
        url: '/api/EditShop',
        method: 'post',
        data: params
    })
}
export function deleteShop (params) {
    return request({
        url: '/api/DeleteShop',
        method: 'post',
        data: params
    })
}
export function editShopCategory (params) {
    return request({
        url: '/api/EditShopCategory',
        method: 'post',
        data: params
    })
}
export function addShopCategory (params) {
    return request({
        url: '/api/AddShopCategory',
        method: 'post',
        data: params
    })
}
export function deleteShopCategory (params) {
    return request({
        url: '/api/DeleteShopCategory',
        method: 'post',
        data: params
    })
}
