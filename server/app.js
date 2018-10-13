const Koa = require('koa')
const app = new Koa()
const routes = require('./routes')
const serve = require('koa-static')
const path = require('path')
const body = require('koa-body')
const views = require('koa-views')
// const bodyParser = require('koa-bodyparser')

// const session = require('koa-session-store')
// const mongooseStore = require('koa-session-mongoose')
const { port } = require('./config')
require('./db')
// app.use(bodyParser())
app.use(body())
// 设置静态目录
app.use(serve(
    path.join(__dirname, '/public')
))
// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// 路由配置
routes(app)
// app.use(session({
//     store: mongooseStore.create({
//         expires: 1000 * 5
//     })
// }))

app.listen(port, () => {
    console.log('程序正在启动...' + port)
})
