const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sysUserInfo = new Schema({// 管理员信息
    username: {type: String, unique: true},
    password: {type: String},
    create_date: {type: Date, default: Date.now()},
    phone: {type: String},
    roles: {type: String}, // 权限规则
    photo_url: {type: String, default: 'https://static.hdslb.com/images/akari.jpg'},
    province: {type: String},
    city: {type: String},
    area: {type: String},
    address: {type: String},
    status: {type: Number, default: 9} // 审核状态
}, { collection: 'sysUserInfo' })
// 当没有传入collection参数时，
// Mongoose会通过model name（就是第一个参数），
// 调用utils.toCollectionName方法产生一个collection name，
// 而这个方法会使name变成复数形式。如果你不想要这个过程，
// 只要传入collection name参数或设置Schema中的collection name选项。

// 通过index方法添加索引，如给create_date和status字段添加索引, 1和-1分别表示升序索引和降序索引
sysUserInfo.index({
    create_date: 1,
    status: 1
})

const SchemaModule = {
    Admin: mongoose.model('sysUserInfo', sysUserInfo)
}

module.exports = SchemaModule
