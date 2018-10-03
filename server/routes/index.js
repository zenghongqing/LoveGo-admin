const Router = require('koa-router')
const controller = require('../controller')
const shop = require('../controller/shop')
const goods = require('../controller/goods')
const router = new Router()
const upload = require('./upload')
// const checkToken = require('../token/checkToken')
// 启动数据库
module.exports = (app) => {
    // 服务端首页
    router.get('/', async (ctx) => {
        await ctx.render('index', {
            title: 'LoveGo'
        })
    })
    router.post('/CreateUser', controller.CreateUser)
    router.post('/uploadfile', upload.single('file'), controller.UploadFile)
    router.post('/LoginUser', controller.LoginUser)
    router.post('/GetAdminInfo', controller.GetAdminInfo)
    // 获取管理员列表
    router.post('/GetAdminList', controller.GetAdminList)
    router.post('/AuthorizedAdmin', controller.AuthorizedAdmin)
    router.post('/DeleteAdmin', controller.DeleteAdmin)
    router.post('/EditAdminInfo', controller.EditAdmin)
    // 店铺管理
    router.post('/CreateShop', shop.CreateShop)
    router.post('/GetShopList', shop.GetShopList)
    router.post('/GetShopInfo', shop.GetShopInfo)
    router.post('/EditShop', shop.EditShop)
    router.post('/DeleteShop', shop.DeleteShop)
    router.post('/EditShopCategory', shop.EditShopCategory)
    router.post('/AddShopCategory', shop.AddShopCategory)
    router.post('/DeleteShopCategory', shop.DeleteShopCategory)
    // 商品模块
    router.post('/GetAllCategory', goods.GetAllCategory)
    router.post('/CreateGoods', goods.CreateGoods)
    router.post('/GetGoodsList', goods.GetGoodsList)
    router.post('/DeleteGoods', goods.DeleteGoods)
    // 后台管理用户模块
    router.post('/GetUserList', controller.GetUserList)
    app.use(router.routes()).use(router.allowedMethods())
}
