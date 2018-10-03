const Goods = require('../models/goods')
const { GenerateChallengecode, permissionValidate } = require('./validate')
const Category = Goods.Category
const Product = Goods.Product
// 获取商品分类
const GetAllCategory = async (ctx, next) => {
    try {
        const data = await Category.find({}, {
            _id: 0,
            __v: 0
        })
        const count = await Category.find({}).countDocuments()
        ctx.body = {
            data: data,
            total: count
        }
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
// 保存商品信息
const CreateGoods = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.shopId || !params.status || !params.productName || !params.image_url.length || !params.categoryId || !params.content || !params.summary || !params.price || !params.stocks) {
        ctx.success = false
        return
    }
    try {
        console.log(params)
        const goodsInfo = {
            productName: params.productName,
            categoryId: params.categoryId,
            productNo: parseInt(GenerateChallengecode(15)),
            image_url: params.image_url,
            content: params.content,
            summary: params.summary,
            price: params.price,
            stocks: params.stocks,
            shopId: params.shopId,
            status: params.status
        }
        const data = await new Product(goodsInfo).save()
        ctx.body = data
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
    }
}
const GetGoodsList = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.pageIndex || params.pageIndex < 0 || !params.pageSize) {
        ctx.success = false
        return
    }
    let querySkip = (parseInt(params.pageIndex) - 1) * parseInt(params.pageSize)
    let queryLimit = parseInt(params.pageSize)
    try {
        const data = await Product.find({}, {
            _v: 0
        }).skip(querySkip).limit(queryLimit)
        const count = await Product.find({}).countDocuments()
        ctx.body = {
            data: data,
            total: count
        }
        ctx.success = true
        ctx.status = 200
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
const DeleteGoods = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    console.log(params)
    if (!params.Id || !params.AdminToken) {
        ctx.success = false
        return
    }
    let deleteMsg = await permissionValidate(ctx, params.AdminToken, ['root', 'admin'])
    if (deleteMsg && !deleteMsg.msg) {
        try {
            await Product.deleteOne({
                _id: params.Id
            })
            ctx.success = true
            ctx.status = 200
        } catch (e) {
            ctx.body = e
            ctx.success = false
        }
    }
    ctx.success = true
    ctx.status = 200
}
module.exports = {
    GetAllCategory,
    CreateGoods,
    GetGoodsList,
    DeleteGoods
}
