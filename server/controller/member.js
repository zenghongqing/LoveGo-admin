const MemberModel = require('../models/member')
const Member = MemberModel.Member
const Address = MemberModel.Address
const { CheckChallengeCode, GenerateChallengecode, StatisNewUser } = require('./validate')
const Sms = require('../models/sms')
const ChallengeCode = Sms.SMSChallengeCode
console.log(Member, Address)
const Register = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.username || !params.password) {
        ctx.success = false
        return
    }
    try {
        await CheckChallengeCode(params.phone, params.challengecode)
        let mem = await Member.findOne({username: params.username})
        console.log(mem, 111, 'mem')
        if (mem) {
            ctx.body = {
                msg: '该账户已存在'
            }
            ctx.status = 200
            ctx.success = true
            return
        }
        let newMemberInfo = new Member({
            username: params.username,
            password: params.password,
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
module.exports = {
    Register,
    GetUserList
}
