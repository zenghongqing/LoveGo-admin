import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: '/', // api的base_url
    timeout: 5000, // 请求超时时间
    headers: {
        'Content-Type': 'text/plain'
    }
})

// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非2000是抛错 可结合自己业务进行修改
         */
        console.log(response, 'response')
        if (response.status === 200) {
            if (response.data) {
                return response.data
            } else {
                Message({
                    message: response.data.Message,
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(response.data.Message)
            }
        }
    }
    , error => {
        console.log('err' + error)
        Message({
            message: error.Message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })
export default service
