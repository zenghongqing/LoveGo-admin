const Router = require('koa-router')
const controller = require('../controller')
const shop = require('../controller/shop')
const goods = require('../controller/goods')
const order = require('../controller/order')
const member = require('../controller/member')
const statis = require('../controller/statis')
const Sms = require('../models/sms')
const ChallengeCode = Sms.SMSChallengeCode
const { StatisNewApi, SendPhoneMessage } = require('../controller/validate')
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
    // 统计接口数目
    router.all('/*', async (ctx, next) => {
        // 统计接口数目
        await StatisNewApi()
        if (ctx.method === 'OPTIONS') {
            ctx.success = true
            ctx.status = 200
        } else {
            console.log('下一路由')
            await next()
        }
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
    router.post('/shop/GetProduct', goods.GetProduct)
    router.post('/EditGoods', goods.EditProduct)
    router.post('/CreateCategory', goods.CreateCategory)
    router.post('/DeleteCategory', goods.DeleteCategory)
    router.post('/EditCategory', goods.EditCategory)
    // 订单模块
    router.post('/CreateOrder', order.CreateOrder)
    router.post('/GetOrderList', order.GetOrderList)
    router.post('/GetOrder', order.GetOrder)
    // 用户模块
    router.post('/Register', member.Register)
    router.post('/Login', member.Login)
    // 统计模块
    router.post('/GetStatisData', statis.GetStatisData)
    // 短信验证
    router.post('/SendPhoneMessage', async (ctx, next) => {
        const params = JSON.parse(ctx.request.body)
        try {
            let phoneData = await ChallengeCode.findOne({phone: params.phone})
            if (phoneData && phoneData.status === 9) {
                return ctx.throw(405, '验证码已过期')
            }
            await SendPhoneMessage(params.phone)
            ctx.success = true
            ctx.status = 200
        } catch (e) {
            ctx.body = e
            ctx.success = false
        }
    })
    // 后台管理用户模块
    router.post('/GetUserList', member.GetUserList)
    app.use(router.routes()).use(router.allowedMethods())
}
