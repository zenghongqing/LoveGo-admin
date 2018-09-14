const Router = require('koa-router')
const controller = require('../controller')
const router = new Router()
const bodyParser = require('koa-bodyparser')
const checkToken = require('../token/checkToken')
// 启动数据库
module.exports = (app) => {
    router.post('/reg', checkToken, controller.Reg)
    router.post('/login', checkToken, controller.Login)
    app.use(bodyParser())
    app.use(router.routes()).use(router.allowedMethods())
}
