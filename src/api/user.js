import request from '@/utils/service'

export function getUserList (params) {
    return request({
        url: '/api/GetUserList',
        method: 'post',
        data: params
    })
}
