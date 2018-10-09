import request from '@/utils/service'
export function getOrderList (params) {
    return request({
        url: '/api/GetOrderList',
        method: 'post',
        data: params
    })
}
export function getOrder (params) {
    return request({
        url: '/api/GetOrder',
        method: 'post',
        data: params
    })
}
