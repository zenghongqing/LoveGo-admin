const { Admin } = require('../models/admin')
const Sms = require('../models/sms')
const {
    StatisUser,
    StatisOrder,
    StatisShop,
    StatisAdmin,
    StatisVisits,
    StatisApi
} = require('../models/statics')
const ChallengeCode = Sms.SMSChallengeCode
exports.permissionValidate = (ctx, AdminToken, permissionList) => {
    return new Promise((resolve, reject) => {
        Admin.findOne({
            _id: AdminToken
        }, {
            password: 0
        }).then(adminInfo => {
            if (!adminInfo) {
                return resolve({msg: '用户信息不存在'})
            }
            if (permissionList.indexOf(adminInfo.roles) === -1) {
                return resolve({msg: '用户权限不足'})
            }
            return resolve(adminInfo)
        }, err => {
            reject(err)
        })
    })
}
exports.GenerateChallengecode = (maxLength) => { // 生成指定位数位随机验证码
    var Challengecode = ''
    for (var i = 0; i < maxLength; i++) {
        Challengecode += Math.floor(Math.random() * 10)
    }
    return Challengecode
}
exports.DateRandomFormate = (str) => {
    if (!str) return
    let Year = str.getFullYear().toString()
    let Month = str.getMonth().toString()
    let Day = str.getDate().toString()
    let Hours = str.getHours().toString()
    let Minutes = str.getMinutes().toString()
    let Seconds = str.getSeconds().toString()
    let trmap = new Date().getTime().toString()
    let newDate = Year + Month + Day + Hours + Minutes + Seconds + trmap
    return newDate
}
exports.FormatDate = (date, AddDayCount) => {
    if (!date) return ''
    if (AddDayCount) {
        var dd = new Date()
        dd.setDate(dd.getDate() + AddDayCount)// 获取AddDayCount天后的日期
        date = dd
    }
    return {
        y: date.getFullYear(),
        m: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
        d: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        h: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        i: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        s: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
        a: date.getDay() < 10 ? '0' + date.getDay() : date.getDay()
    }
}
// 发送短信验证码
exports.SendPhoneMessage = (phone) => {
    let GenerateChallengecode = exports.GenerateChallengecode(5)
    let newChallengeCode = new ChallengeCode({
        username: null,
        phone: phone,
        challengecode: GenerateChallengecode,
        Status: 1
    })
    return new Promise((resolve, reject) => {
        newChallengeCode.save().then(res => {
            if (!res) {
                let err = '保存失败'
                return reject(err)
            }
            setTimeout(() => {
                ChallengeCode.updateOne({phone: phone, challengecode: GenerateChallengecode}, {Status: 9}, (err, success) => { console.log(err, success) })
            }, 300000)
            resolve(res)
        }, err => {
            reject(err)
        })
    })
}
// 检查验证码是否过期
exports.CheckChallengeCode = (phone, challengeCode) => {
    return new Promise((resolve, reject) => {
        return ChallengeCode.findOne({phone: phone, challengecode: challengeCode, Status: 1}).then((res) => {
            // 测试用
            resolve()
            // 实际代码
            // if (!res) {
            //     const err = '验证码错误'
            //     return reject(err)
            // }
            // let resDate = new Date(res.createTime).getMinutes()
            // if (new Date().getMinutes() - resDate >= 5) {
            //     ChallengeCode.updateOne({phone: phone, challengecode: challengeCode, Status: 1}, {Status: 9}).then(success => {
            //         if (!success) {
            //             let err = '验证码已过期或不存在'
            //             return reject(err)
            //         }
            //         return resolve(success)
            //     }, err => {
            //         reject(err)
            //     })
            // }
        })
    })
}
// 统计新用户
exports.StatisNewUser = async () => {
    await new StatisUser({}).save()
}
// 统计新增订单
exports.StatisNewOrder = async (orderNo) => {
    await new StatisOrder({
        order_no: orderNo
    }).save()
}
// 统计新增店铺
exports.StatisNewShop = async () => {
    await new StatisShop({}).save()
}
// 统计新增管理员
exports.StatisNewAdmin = async () => {
    await new StatisAdmin({}).save()
}
// 统计访问量
exports.StatisNewVisits = () => {

}
// 统计接口调用次数
exports.StatisNewApi = async () => {
    await new StatisApi({}).save()
}
