import request from '@/utils/service'
export function login (username, password) {
    return request({
        url: '/api/LoginUser',
        method: 'post',
        data: {
            username,
            password
        }
    })
}
export function getInfo (token) {
    return request({
        url: '/api/GetAdminInfo',
        method: 'post',
        data: {
            AdminToken: token
        }
    })
}
