import request from '@/utils/service'
export function createUser (params) {
    return request({
        url: '/api/CreateUser',
        method: 'post',
        data: JSON.stringify(params)
    })
}
