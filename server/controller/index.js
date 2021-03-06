const Sys = require('../models/admin')
const Admin = Sys.Admin
// const path = require('path')
const md5 = require('md5')
const { permissionValidate, StatisNewAdmin } = require('./validate')
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
    try {
        let data = await new Admin(newAdmin).save()
        await StatisNewAdmin()
        ctx.body = data
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
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
        return ctx.throw(400, '未填用户信息')
    }
    try {
        let data = await Admin.findOne({
            username: params.username,
            password: md5(params.password)
        }, {
            __v: 0,
            password: 0
        })
        ctx.body = data
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
// 获取管理员信息
const GetAdminInfo = async (ctx, next) => {
    let adminToken = JSON.parse(ctx.request.body).AdminToken
    try {
        let info = await Admin.findOne({_id: adminToken}, {
            __v: 0,
            password: 0
        })
        ctx.body = info
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
// 获取管理员列表
const GetAdminList = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    let adminInfo = await permissionValidate(ctx, params.AdminToken, ['root'])
    if (adminInfo && !adminInfo.message) {
        let adminList = await Admin.find({}, {
            __v: 0,
            password: 0
        })
        if (!adminList) {
            return ctx.throw(404, '用户信息不存在')
        } else {
            ctx.body = adminList
        }
    } else {
        return ctx.throw(405, adminInfo.message)
    }
    ctx.success = true
    ctx.status = 200
}
// 管理员审核
const AuthorizedAdmin = async (ctx, next) => {
    let params = JSON.parse(ctx.request.body)
    let adminInfo = await permissionValidate(ctx, params.rootId, ['root'])
    if (adminInfo && !adminInfo.message) {
        let authorizeMsg = await Admin.updateOne({
            _id: params.othersId
        }, {
            status: params.status
        }, {
            upsert: false
        })
        if (!authorizeMsg) {
            ctx.body = {
                msg: '用户信息不存在'
            }
            return ctx.throw(405, '用户信息不存在')
        } else {
            ctx.body = adminInfo
        }
    } else {
        ctx.body = {
            msg: adminInfo.message
        }
        return ctx.throw(405, '用户信息不存在')
    }
    ctx.status = 200
    ctx.success = true
}
// 删除管理员
const DeleteAdmin = async (ctx, next) => {
    let params = JSON.parse(ctx.request.body)
    if (!params.AdminToken) {
        ctx.body = {}
    }
    let adminInfo = await permissionValidate(ctx, params.AdminToken, ['root'])
    if (adminInfo && !adminInfo.message) {
        let adminList = await Admin.deleteOne({
            _id: params.AdminToken
        })
        if (!adminList) {
            // ctx.body = {
            //     msg: '用户信息不存在'
            // }
            return ctx.throw(404, '用户信息不存在')
        } else {
            ctx.body = adminList
        }
    } else {
        // ctx.body = {
        //     msg: adminInfo.message
        // }
        return ctx.throw(404, adminInfo.message)
    }
    ctx.status = 200
    ctx.success = true
}
// 编辑管理员
const EditAdmin = async (ctx, next) => {
    let params = JSON.parse(ctx.request.body)
    if (!params.TargetId || !params.AdminToken) {
        ctx.success = false
    }
    let UpdatedData = {}
    if (params.roles) {
        UpdatedData.roles = params.roles
    }
    if (params.phone) {
        UpdatedData.phone = params.phone
    }
    if (params.province) {
        UpdatedData.province = params.province
    }
    if (params.city) {
        UpdatedData.city = params.city
    }
    if (params.area) {
        UpdatedData.area = params.area
    }
    if (params.address) {
        UpdatedData.address = params.address
    }
    if (params.status) {
        UpdatedData.status = params.status
    }
    let adminInfo = await permissionValidate(ctx, params.AdminToken, ['root'])
    if (adminInfo && !adminInfo.message) {
        let editInfo = await Admin.updateOne({
            _id: params.TargetId
        }, UpdatedData, {
            upsert: false
        })
        if (!editInfo) {
            // ctx.body = {
            //     msg: '用户信息不存在'
            // }
            return ctx.throw(404, '用户信息不存在')
        } else {
            ctx.body = editInfo
        }
    } else {
        return ctx.throw(404, '用户信息不存在')
    }
    ctx.status = 200
    ctx.success = true
}
module.exports = {
    CreateUser,
    UploadFile,
    LoginUser,
    GetAdminInfo,
    GetAdminList,
    AuthorizedAdmin,
    DeleteAdmin,
    EditAdmin
}
