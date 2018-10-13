const Shop = require('../models/shop')
const ShopInfo = Shop.Shop // 店铺信息
const { GenerateChallengecode, permissionValidate, StatisNewShop } = require('./validate')
const CreateShop = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.shop_name || !params.shop_logo || !params.cms_banner || !params.shop_summary) {
        ctx.success = false
        ctx.body = ''
        return
    }
    let shopData = {
        id: GenerateChallengecode(5),
        shop_name: params.shop_name,
        shop_logo: params.shop_logo,
        cms_content: params.cms_content,
        shop_summary: params.shop_summary,
        category_info: [
            {
                Id: 1,
                createTime: new Date(),
                desc: '根目录',
                image_url: [],
                name: '根目录',
                parentId: 0
            }
        ],
        cms_banner: params.cms_banner || [],
        goods_total_num: 0,
        like_count: 0,
        goods_list: params.goods_list || []
    }
    if (shopData.goods_list && shopData.goods_list.length) {
        shopData.goods_total_num = shopData.goods_list.length
    }
    try {
        let data = await new ShopInfo(shopData).save()
        await StatisNewShop()
        ctx.body = data
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
// 获取店铺列表信息
const GetShopList = async (ctx, next) => {
    let params = JSON.parse(ctx.request.body)
    if (!params.pageIndex || !params.pageSize || params.pageIndex <= 0) {
        ctx.success = false
        ctx.body = ''
        return
    }
    let querySkip = (parseInt(params.pageIndex) - 1) * parseInt(params.pageSize)
    let queryLimit = parseInt(params.pageSize)
    console.log(querySkip, queryLimit)
    try {
        let data = await ShopInfo.find({}).skip(querySkip).limit(queryLimit)
        let count = await ShopInfo.find({}).countDocuments()
        ctx.body = {
            data,
            count: count
        }
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
// 获取店铺信息
const GetShopInfo = async (ctx, next) => {
    let params = JSON.parse(ctx.request.body)
    try {
        let data = await ShopInfo.findOne({
            id: params.ShopId
        })
        if (data) {
            ctx.body = data
            ctx.success = true
            ctx.status = 200
        }
        // 测试删除无用的数据库数据
        // await ShopInfo.remove({id: params.ShopId})
        // ctx.success = true
        // ctx.status = 200
    } catch (e) {
        ctx.body = e
        ctx.sucess = false
    }
}
// 编辑保存店铺信息
const EditShop = async (ctx, next) => {
    let params = JSON.parse(ctx.request.body)
    if (!params.Id || !params.AdminToken) {
        ctx.success = false
    }
    let editData = {
        shop_name: params.shop_name || '',
        shop_logo: params.shop_logo || [],
        cms_content: params.cms_content !== '' && params.cms_content !== 'null' ? params.cms_content : '',
        category_info: params.category_info || [],
        cms_banner: params.cms_banner || [],
        goods_total_num: 0,
        goods_list: params.goods_list || [],
        shop_summary: params.shop_summary || ''
    }
    let shopData = await permissionValidate(ctx, params.AdminToken, ['root', 'admin']).then()
    if (shopData && !shopData.msg) {
        try {
            await ShopInfo.updateOne({
                id: params.Id
            }, editData, {
                upsert: false
            })
            ctx.success = true
            ctx.status = 200
        } catch (e) {
            ctx.success = false
        }
    } else {
        ctx.success = false
    }
}
const DeleteShop = async (ctx, next) => {
    let params = JSON.parse(ctx.request.body)
    let deleteMsg = await permissionValidate(ctx, params.AdminToken, ['root', 'admin'])
    if (deleteMsg && !deleteMsg.message) {
        try {
            await ShopInfo.deleteOne({
                id: params.ShopId
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
const EditShopCategory = async (ctx, next) => {
    let params = JSON.parse(ctx.request.body)
    if (!params.id || !params.categoryId || !params.category_info || !params.AdminToken) {
        ctx.success = false
        return
    }
    let editCateMsg = await permissionValidate(ctx, params.AdminToken, ['root', 'admin'])
    if (editCateMsg && !editCateMsg.msg) {
        try {
            await ShopInfo.updateOne({
                id: params.id,
                'category_info.Id': params.categoryId
            }, {
                $set: {
                    'category_info.$': params.category_info
                }
            }, {
                upsert: false
            })
            ctx.success = true
            ctx.status = 200
        } catch (e) {
            ctx.success = false
        }
    } else {
        ctx.success = false
    }
}
const AddShopCategory = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.id || !params.category_info) {
        ctx.success = false
    }
    params.category_info.Id = Number(GenerateChallengecode(5))
    try {
        await ShopInfo.updateOne({id: params.id}, {
            $push: {
                'category_info': params.category_info
            }
        }, {
            upsert: false
        })
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
const DeleteShopCategory = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    if (!params.AdminToken || !params.categoryId || !params.Id) {
        ctx.success = false
        return
    }
    let deleteCatMsg = await permissionValidate(ctx, params.AdminToken, ['root', 'admin'])
    if (deleteCatMsg && !deleteCatMsg.message) {
        try {
            await ShopInfo.updateOne({id: params.Id}, {
                $pull: {
                    'category_info': {Id: params.categoryId}
                }
            })
            ctx.status = 200
            ctx.success = true
        } catch (e) {
            ctx.body = e
            ctx.success = false
        }
    }
}
module.exports = {
    CreateShop,
    GetShopList,
    GetShopInfo,
    EditShop,
    DeleteShop,
    EditShopCategory,
    AddShopCategory,
    DeleteShopCategory
}
