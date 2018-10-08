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
    console.log(params, '111')
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
// 获取商品列表信息
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
// 删除商品
const DeleteGoods = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
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
// 获取商品信息
const GetProduct = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.productNo) {
        ctx.success = false
        return
    }
    try {
        let data = await Product.findOne({
            productNo: params.productNo
        })
        ctx.body = data
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
// 编辑商品
const EditProduct = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    console.log(params)
    if (!params.Id || !params.AdminToken) {
        ctx.success = false
        return
    }
    let UpdatedData = {}
    if (params.productName) {
        UpdatedData.productName = params.productName
    }
    if (params.categoryId) {
        UpdatedData.categoryId = params.categoryId
    }
    if (params.image_url) {
        UpdatedData.image_url = params.image_url
    }
    if (params.content) {
        UpdatedData.content = params.content
    }
    if (params.summary) {
        UpdatedData.summary = params.summary
    }
    if (params.price) {
        UpdatedData.price = params.price
    }
    if (params.stocks) {
        UpdatedData.stocks = params.stocks
    }
    if (params.shopId) {
        UpdatedData.shopId = params.shopId
    }
    if (params.status) {
        UpdatedData.status = params.status
    }
    let editPermission = await permissionValidate(ctx, params.AdminToken, ['root', 'admin'])
    if (editPermission && !editPermission.msg) {
        try {
            let data = await Product.updateOne({
                productNo: params.Id
            }, UpdatedData, {
                upsert: false
            })
            ctx.body = data
            ctx.success = true
            ctx.status = 200
        } catch (e) {
            ctx.body = e
            ctx.success = false
        }
    }
}
const CreateCategory = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.label) {
        ctx.success = false
        return
    }
    // 删除数据，方便测试
    // await Category.remove({})
    // ctx.status = 200
    // ctx.success = true
    let formData = {
        Id: GenerateChallengecode(5),
        name: params.label,
        parentId: params.parentId,
        image_url: params.image_url,
        desc: params.desc,
        children: params.children
    }
    try {
        let data = await new Category(formData).save()
        ctx.body = data
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
const DeleteCategory = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.Id || !params.AdminToken) {
        ctx.success = false
        return
    }
    let deleteMsg = await permissionValidate(ctx, params.AdminToken, ['root', 'admin'])
    if (deleteMsg && !deleteMsg.msg) {
        try {
            await Category.deleteOne({
                Id: params.Id
            })
            ctx.success = true
            ctx.status = 200
        } catch (e) {
            ctx.body = e
            ctx.success = false
        }
    } else {
        ctx.success = false
    }
}
const EditCategory = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.Id || !params.AdminToken) {
        ctx.success = false
        return
    }
    let formData = {}
    if (params.name) {
        formData.name = params.name
    }
    if (params.image_url) {
        formData.image_url = params.image_url
    }
    if (params.parentId) {
        formData.parentId = params.parentId
    }
    if (params.desc) {
        formData.desc = params.desc
    }
    let editMsg = await permissionValidate(ctx, params.AdminToken, ['root', 'admin'])
    if (editMsg && !editMsg.msg) {
        try {
            let data = await Category.updateOne({
                Id: params.Id
            }, formData, {
                upsert: false
            })
            ctx.body = data
            ctx.success = true
            ctx.status = 200
        } catch (e) {
            ctx.body = e
            ctx.success = false
        }
    } else {
        ctx.success = false
    }
    ctx.success = true
    ctx.status = 200
}
module.exports = {
    GetAllCategory,
    CreateGoods,
    GetGoodsList,
    DeleteGoods,
    GetProduct,
    EditProduct,
    CreateCategory,
    DeleteCategory,
    EditCategory
}
