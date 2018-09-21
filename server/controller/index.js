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
        return
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
// 上传头像
const UploadFile = async (ctx, next) => {
    ctx.body = {
        filePath: `http://localhost:3000/uploads/${ctx.req.file.filename}`
    }
    ctx.status = 200
    ctx.success = true
}
// 管理员登陆
const LoginUser = async (ctx, next) => {
    let params = JSON.parse(ctx.request.body)
    if (!params.username || !params.password) {
        return console.error('未填用户信息')
    }
    let { data } = await Admin.findOne({
        username: params.username,
        password: md5(params.password)
    }, {
        __v: 0,
        password: 0
    }).then(res => {
        console.log(res)
        let msg = ''
        if (!res) {
            msg = '用户信息不存在'
        }
        if (res.status !== 1) {
            msg = '账号审核未通过'
        }
        return {
            msg: msg || 'no',
            data: res._id
        }
    })
    ctx.body = data
    ctx.status = 200
    ctx.success = true
}
// 获取管理员信息
const GetAdminInfo = async (ctx, next) => {
    let adminToken = JSON.parse(ctx.request.body).AdminToken
    let info = await Admin.findOne({_id: adminToken}, {
        __v: 0,
        password: 0
    })
    ctx.body = info
    ctx.status = 200
    ctx.success = true
}
// 获取用户信息列表
const GetUserList = async (ctx, next) => {
    console.log(ctx.request.body)
    const params = JSON.parse(ctx.request.body)
    if (!params.pageIndex || params.pageIndex <= 0 || !params.pageSize) {
        return console.error('页码不对')
    }
    let querySkip = (parseInt(params.pageIndex) - 1) * parseInt(params.pageSize)
    let queryLimit = parseInt(params.pageSize)
    console.log(querySkip, queryLimit)
    ctx.status = 200
    ctx.success = true
}
module.exports = {
    CreateUser,
    UploadFile,
    LoginUser,
    GetAdminInfo,
    GetUserList
}
