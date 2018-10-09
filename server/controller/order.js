const OrderObj = require('../models/order')
const Package = OrderObj.Package
const Order = OrderObj.Order
const Comment = OrderObj.Comment
const { DateRandomFormate } = require('./validate')
console.log(Package, Order, Comment)
const CreateOrder = async (ctx, next) => {
    const params = ctx.request.body
    console.log(params)
    const formData = {
        orderInfo: {
            orderNo: DateRandomFormate(new Date()),
            memberToken: params.memberToken || '5a80f6e6ec752f2950f50ef9',
            total_fee: 112,
            cancel_status: 0,
            confirm_status: 0,
            addressInfo: {province: '广东省', city: '深圳市', county: '南山区', address: '软件产业基地'},
            pay_status: 0,
            finish_status: 0,
            comment_status: 0
        },
        ProductList: [
            {
                productName: '豆腐皮麻辣',
                categoryId: 11,
                image_url: [],
                content: '这麻辣真不错，哈赤',
                summary: '童年的味道',
                price: 6,
                stocks: 100,
                shopId: 37373,
                status: 1
            }
        ]

    }
    let data = await new Order(formData).save()
    ctx.body = data
    // await Order.remove({})
    ctx.success = true
    ctx.status = 200
}
const GetOrderList = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.pageIndex || params.pageIndex <= 0 || !params.pageSize) {
        ctx.success = false
        return
    }
    let querySkip = (parseInt(params.pageIndex) - 1) * parseInt(params.pageSize)
    let queryLimit = parseInt(params.pageSize)
    try {
        let data = await Order.find({}, {
            _v: 0
        }).skip(querySkip).limit(queryLimit)
        let count = await Order.find({}).countDocuments()
        console.log(params)
        ctx.body = {
            data: data,
            count: count
        }
        ctx.success = true
        ctx.status = 200
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
module.exports = {
    CreateOrder,
    GetOrderList
}
