const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopOrderInfo = new Schema({// 订单信息
    orderInfo: {
        createTime: {
            type: Date,
            default: Date.now
        },
        addressInfo: {
            type: Object
        },
        orderNo: {
            type: String
        },
        memberToken: {
            type: String
        },
        total_fee: {
            type: Number
        },
        cancel_status: {
            type: Number
        },
        confirm_status: {
            type: Number
        },
        pay_status: {
            type: Number
        },
        finish_status: {
            type: Number
        },
        comment_status: {
            type: Number
        }
    },
    ProductList: {
        type: Array
    }
}, {
    collection: 'shopOrderInfo'
})
shopOrderInfo.index({
    createTime: -1
})

const orderCommentInfo = new Schema({
    createTime: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    },
    username: {
        type: String
    },
    productNo: {
        type: String
    },
    star: {
        type: Number
    },
    image_url: {
        type: Array
    },
    content: {
        type: String
    },
    counter: {
        type: Number
    }
}, {
    collection: 'orderCommentInfo'
})
orderCommentInfo.index({
    createTime: -1
})
const orderPackageInfo = new Schema({
    createTime: {
        type: Date,
        default: Date.now
    },
    memberToken: {
        type: String
    },
    checked: {
        type: Boolean,
        default: false
    },
    product: {
        type: Object
    },
    counter: {
        type: Number
    },
    status: {
        type: Number
    }
}, {
    collection: 'orderPackageInfo'
})
orderPackageInfo.index({
    createTime: -1
})
const SchemaModule = {
    Comment: mongoose.model('orderCommentInfo', orderCommentInfo),
    Package: mongoose.model('orderPackageInfo', orderPackageInfo),
    Order: mongoose.model('shopOrderInfo', shopOrderInfo)
}
module.exports = SchemaModule
