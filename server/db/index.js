const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/LoveGo', {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connection success!')
    }
})

let db = mongoose.connection
// 防止Mongoose：mpromise错误
mongoose.Promise = global.Promise
db.once('open', () => {
    console.log('数据库连接成功')
})
db.on('error', () => {
    console.log('数据库连接失败')
})
db.on('close', () => {
    console.log('数据库连接断开')
})
module.exports = db
