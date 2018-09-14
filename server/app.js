const Koa = require('koa')
const app = new Koa()
const routes = require('./routes')
const serve = require('koa-static')
const path = require('path')
// const session = require('koa-session-store')
// const mongooseStore = require('koa-session-mongoose')
const { port } = require('./config')
require('./db')
// 路由配置
routes(app)
// 设置静态目录
app.use(serve(
    path.join(__dirname, '/public')
))
// app.use(session({
//     store: mongooseStore.create({
//         expires: 1000 * 5
//     })
// }))

app.listen(port, () => {
    console.log('程序正在启动...' + port)
})