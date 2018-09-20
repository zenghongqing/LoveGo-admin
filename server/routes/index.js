const Router = require('koa-router')
const controller = require('../controller')
const router = new Router()
const upload = require('./upload')
// const checkToken = require('../token/checkToken')
// 启动数据库
module.exports = (app) => {
    router.post('/CreateUser', controller.CreateUser)
    router.post('/uploadfile', upload.single('file'), controller.UploadFile)
    router.post('/login', controller.Login)
    app.use(router.routes()).use(router.allowedMethods())
}
