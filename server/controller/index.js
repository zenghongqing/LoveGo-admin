const Sys = require('../models/admin')
const Admin = Sys.Admin
// const path = require('path')
const md5 = require('md5')
// const qs = require('qs')
// 保存管理员信息
const CreateUser = async (ctx, next) => {
    let params = JSON.parse(ctx.request.body)
    if (!params.username || !params.password || !params.roles) {
        console.error('未填用户信息')
    }
    let newAdmin = {
        username: params.username,
        password: md5(params.password),
        roles: params.roles,
        phone: params.phone || null,
        province: params.province || null,
        city: params.city || null,
        area: params.area || null,
        address: params.address || null,
        status: 9,
        photo_url: params.photo_url
    }
    new Admin(newAdmin).save().then(response => {
        console.log(response, '保存管理员信息成功')
    }, err => {
        console.error(err)
    })
    ctx.status = 200
    ctx.success = true
}
const UploadFile = async (ctx, next) => {
    ctx.body = {
        filePath: `http://localhost:3000/uploads/${ctx.req.file.filename}`
    }
    ctx.status = 200
    ctx.success = true
}
const Login = async (ctx, next) => {}
module.exports = {
    CreateUser,
    UploadFile,
    Login
}
