import { getUserList } from '@/api/user'
const admin = {
    state: {
        userListData: null
    },
    mutations: {
        SET_USER_LIST_DATA: (state, userListData) => {
            state.userListData = userListData
        }
    },
    actions: {
        // 获取用户信息列表
        GetUserList ({ commit, state }, formData) {
            return new Promise((resolve, reject) => {
                getUserList(formData).then(res => {
                    resolve(res.data)
                }).catch(e => {
                    reject(e)
                })
            })
        }
    }
}
export default admin
