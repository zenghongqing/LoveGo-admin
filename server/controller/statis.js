const {
    StatisUser,
    StatisOrder,
    StatisShop,
    StatisAdmin,
    StatisVisits,
    StatisApi
} = require('../models/statics')
const { FormatDate } = require('./validate')
const GetStatisData = async (ctx, next) => {
    let statisData = {
        MonthTotalData: [],
        UserDailyData: [],
        OrderDailyData: [],
        ShopDailyData: [],
        AdminDailyData: [],
        VisitsDailyData: [],
        ApiDailyData: []
    }
    try {
        let i = 0
        while (i <= 30) {
            let afterDate = FormatDate(new Date(), -(30 - (i + 1)))
            let afterThirtyDate = FormatDate(new Date(), -(30 - i))
            // 一个月的记录
            let thirtyDateQuery = {
                'create_date': {
                    $gte: new Date(`${afterThirtyDate.y}-${afterThirtyDate.m}-${afterThirtyDate.d} 00:00:00`),
                    $lt: new Date(`${afterDate.y}-${afterDate.m}-${afterDate.d} 00:00:00`)
                }
            }
            let userCount = await StatisUser.find(thirtyDateQuery).countDocuments()
            statisData.UserDailyData.push(userCount)
            let orderCount = await StatisOrder.find(thirtyDateQuery).countDocuments()
            statisData.OrderDailyData.push(orderCount)
            let shopCount = await StatisShop.find(thirtyDateQuery).countDocuments()
            statisData.ShopDailyData.push(shopCount)
            let adminCount = await StatisAdmin.find(thirtyDateQuery).countDocuments()
            statisData.AdminDailyData.push(adminCount)
            let visitsCount = await StatisVisits.find(thirtyDateQuery).countDocuments()
            statisData.VisitsDailyData.push(visitsCount)
            let apisCount = await StatisApi.find(thirtyDateQuery).countDocuments()
            statisData.ApiDailyData.push(apisCount)
            statisData.MonthTotalData.push(`${afterDate.y}-${afterDate.m}-${afterDate.d}`)
            i++
        }
        ctx.body = statisData
        ctx.success = true
        ctx.status = 200
    } catch (e) {
        console.log(e)
        ctx.body = e
        ctx.success = false
    }
}
module.exports = {
    GetStatisData
}
