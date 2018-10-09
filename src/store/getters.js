const getters = {
    /* 公共模块 */
    sidebar: state => state.app.sidebar,
    /* 管理员模块 */
    userData: state => state.admin.userData,
    adminData: state => state.admin.adminData,
    /* 用户模块 */
    userListData: state => state.user.userListData,
    /* 店铺模块 */
    shopData: state => state.shop.shopData,
    /* 商品模块 */
    goodsListData: state => state.goods.goodsListData,
    /* 订单模块 */
    orderListData: state => state.order.orderListData
}

export default getters
