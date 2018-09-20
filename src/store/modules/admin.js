// import { getToken, setToken, removeToken } from '@/utils/auth'
import { createUser } from '@/api/admin'
const admin = {
    state: {
        userData: {
            userData: null,
            adminData: null
        }
    },
    mutations: {
        SET_USER_DATA: (state, userData) => {
            state.userData = userData
        },
        SET_ADMIN_DATA: (state, adminData) => {
            state.adminData = adminData
        }
    },
    actions: {
        // 登录
        Login ({commit}, userInfo) {
            return new Promise((resolve, reject) => {
            })
        },
        // 获取用户信息
        GetInfo ({commit, state}, token) {
            return new Promise((resolve, reject) => {})
        },
        // 登出
        LogOut ({commit, state}) {
            return new Promise((resolve, reject) => {
                commit('SET_USER_DATA', null)
                resolve()
            })
        },
        // 创建管理员
        CreateUser ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                createUser(formData).then(res => {
                    console.log(res, 'res')
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 管理员列表
        AdminList ({commit, state}, formData) {
            return new Promise((resolve, reject) => {})
        },
        // 编辑管理员
        EditAdminInfo ({commit, state}, formData) {
            return new Promise((resolve, reject) => {})
        },
        // 审核管理员
        AuthorizedAdmin ({commit, state}, formData) {
            return new Promise((resolve, reject) => {})
        },
        // 管理员信息
        AdminInfo ({commit, state}, formData) {
            return new Promise((resolve, reject) => {})
        },
        // 删除管理员
        DeleteAdmin ({commit, state}, formData) {
            return new Promise((resolve, reject) => {})
        },
        // 统计信息
        GetStatisData ({commit, state}, formData) {
            return new Promise((resolve, reject) => {})
        }
    }
}
export default admin
