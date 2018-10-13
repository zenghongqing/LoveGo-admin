import request from '@/utils/service'
export function createUser (params) {
    return request({
        url: '/api/CreateUser',
        method: 'post',
        data: JSON.stringify(params)
    })
}
export function getAdminList (params) {
    return request({
        url: '/api/GetAdminList',
        method: 'post',
        data: JSON.stringify(params)
    })
}
export function authorizedAdmin (params) {
    return request({
        url: '/api/AuthorizedAdmin',
        method: 'post',
        data: params
    })
}
export function deleteAdmin (params) {
    return request({
        url: '/api/DeleteAdmin',
        method: 'post',
        data: params
    })
}
export function getAdminInfo (params) {
    return request({
        url: '/api/GetAdminInfo',
        method: 'post',
        data: params
    })
}
export function editAdminInfo (params) {
    return request({
        url: '/api/EditAdminInfo',
        method: 'post',
        data: params
    })
}
export function getStatisData () {
    return request({
        url: '/api/GetStatisData',
        method: 'post',
        data: {}
    })
}
