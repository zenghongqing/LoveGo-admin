const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sysStatisVisits = new Schema({
    create_date: {
        type: Date,
        default: Date.now
    },
    country: {
        type: String
    },
    province: {
        type: String
    },
    city: {
        type: String
    },
    isp: {
        type: String
    }
}, {
    collection: 'sysStatisVisits'
})
sysStatisVisits.index({
    create_date: -1
})
const sysStatisApi = new Schema({// api 调用次数
    create_date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'sysStatisApi'
})
sysStatisApi.index({
    create_date: -1
})
const sysStatisUser = new Schema({// 统计用户
    create_date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'sysStatisUser'
})
sysStatisApi.index({
    create_date: -1
})
const sysStatisOrder = new Schema({// 统计订单
    create_date: {
        type: Date,
        default: Date.now
    },
    order_no: {
        type: String
    }
}, {
    collection: 'sysStatisOrder'
})
sysStatisOrder.index({
    create_date: -1
})
const sysStatisShop = new Schema({
    create_date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'sysStatisShop'
})
sysStatisShop.index({
    create_date: -1
})
const sysStatisAdmin = new Schema({
    create_date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'sysStatisAdmin'
})
sysStatisAdmin.index({
    create_date: -1
})

module.exports = {
    StatisUser: mongoose.model('sysStatisUser', sysStatisUser),
    StatisOrder: mongoose.model('sysStatisOrder', sysStatisOrder),
    StatisShop: mongoose.model('sysStatisShop', sysStatisShop),
    StatisAdmin: mongoose.model('sysStatisAdmin', sysStatisAdmin),
    StatisVisits: mongoose.model('sysStatisVisits', sysStatisVisits),
    StatisApi: mongoose.model('sysStatisApi', sysStatisApi)
}
