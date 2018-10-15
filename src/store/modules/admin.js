import { setToken, removeToken } from '@/utils/auth'
import { createUser, getAdminList, authorizedAdmin, deleteAdmin, getAdminInfo, editAdminInfo, getStatisData } from '@/api/admin'
import { login, getInfo } from '@/api/login'
const admin = {
    state: {
        userData: null,
        adminData: null
    },
    mutations: {
        SET_USER_DATA: (state, userData) => {
            state.userData = userData
        },
        // 管理员列表数据
        SET_ADMIN_DATA: (state, adminData) => {
            state.adminData = adminData
        }
    },
    actions: {
        // 登录
        Login ({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo.username.trim(), userInfo.password).then(res => {
                    console.log(res, 'login')
                    if (res && res.msg) {
                        reject(res.msg)
                    } else {
                        setToken(res.data)
                        resolve()
                    }
                }, err => {
                    console.log(err, 'eee')
                    reject(err)
                })
            })
        },
        // 获取用户信息
        GetInfo ({commit, state}, token) {
            return new Promise((resolve, reject) => {
                getInfo(token).then(res => {
                    commit('SET_USER_DATA', res.data)
                    resolve(res.data)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        // 登出
        LogOut ({commit, state}) {
            return new Promise((resolve, reject) => {
                commit('SET_USER_DATA', null)
                removeToken()
                resolve()
            })
        },
        // 创建管理员
        CreateUser ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                createUser(formData).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 管理员列表
        AdminList ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                getAdminList(formData).then(res => {
                    commit('SET_ADMIN_DATA', res)
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        // 编辑管理员
        EditAdminInfo ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                editAdminInfo(formData).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        // 审核管理员
        AuthorizedAdmin ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                authorizedAdmin(formData).then(res => {
                    if (res && !res.msg) {
                        resolve()
                    }
                }).catch(e => {
                    reject(e)
                })
            })
        },
        // 获取管理员信息
        AdminInfo ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                getAdminInfo(formData).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        // 删除管理员
        DeleteAdmin ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                deleteAdmin(formData).then(res => {
                    resolve()
                }).catch(e => {
                    reject(e)
                })
            })
        },
        // 统计信息
        GetStatisData ({commit, state}, formData) {
            return new Promise((resolve, reject) => {
                getStatisData().then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            })
        }
    }
}
export default admin
