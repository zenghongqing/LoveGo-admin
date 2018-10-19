const MemberModel = require('../models/member')
const Member = MemberModel.Member
const md5 = require('md5')
// const Address = MemberModel.Address
const { CheckChallengeCode, GenerateChallengecode, StatisNewUser, StatisNewVisits } = require('./validate')
const Sms = require('../models/sms')
const ChallengeCode = Sms.SMSChallengeCode
const Register = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.username || !params.password) {
        ctx.success = false
        return
    }
    try {
        await CheckChallengeCode(params.phone, params.challengecode)
        let mem = await Member.findOne({username: params.username})
        if (mem) {
            // ctx.body = {
            //     msg: '该账户已存在'
            // }
            return ctx.throw(204, '该账户已存在')
        }
        let newMemberInfo = new Member({
            username: params.username,
            password: md5(params.password),
            validWalletAmount: 200000,
            Sex: params.Sex ? params.Sex : null,
            phone: params.phone,
            nickName: 'LG' + GenerateChallengecode(10)
        })
        await newMemberInfo.save()
        await StatisNewUser()
        await ChallengeCode.updateOne({phone: params.phone, challengecode: params.challengecode, Status: 1}, {Status: 9})
        ctx.success = true
        ctx.status = 200
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
// 获取用户信息列表
const GetUserList = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.pageIndex || params.pageIndex <= 0 || !params.pageSize) {
        return console.error('页码不对')
    }
    let querySkip = (parseInt(params.pageIndex) - 1) * parseInt(params.pageSize)
    let queryLimit = parseInt(params.pageSize)
    console.log(querySkip, queryLimit)
    try {
        let data = await Member.find({}, {
            _v: 0,
            password: 0
        }).skip(querySkip).limit(queryLimit)
        let count = await Member.find({}).countDocuments()
        ctx.body = {
            data,
            count: count
        }
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = {
            data: e,
            msg: '无法查询到用户信息'
        }
        ctx.success = false
    }
}
// 用户登录
const Login = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.username || !params.password) {
        return ctx.throw(404, '登录信息不完整')
    }
    try {
        // 获取用户标识
        let memberInfo = await Member.findOne({username: params.username})
        if (!memberInfo) {
            ctx.success = false
            return
        }
        let userInfo = await Member.findById(memberInfo._id)
        if (userInfo.username === params.username && userInfo.password === md5(params.password)) {
            ctx.body = memberInfo.data
            ctx.success = true
            ctx.status = 200
            await StatisNewVisits()
        } else {
            return ctx.throw(404, '账号密码错误')
        }
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
module.exports = {
    Register,
    GetUserList,
    Login
}
