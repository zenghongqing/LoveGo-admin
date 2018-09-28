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
