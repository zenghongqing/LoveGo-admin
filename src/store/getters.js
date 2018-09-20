const getters = {
    /* 公共模块 */
    sidebar: state => state.app.sidebar,
    /* 管理员模块 */
    userData: state => state.admin.userData,
    adminData: state => state.admin.adminData
}

export default getters
