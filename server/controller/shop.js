const Shop = require('../models/shop')
const ShopInfo = Shop.Shop // 店铺信息
const { GenerateChallengecode } = require('./validate')
const CreateShop = async (ctx, next) => {
    const params = JSON.parse(ctx.request.body)
    console.log(params, 'shop')
    if (!params.shop_name || !params.shop_logo || !params.shop_logo || !params.cms_content || !params.shop_summary) {
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
        ctx.body = data
        ctx.status = 200
        ctx.success = true
    } catch (e) {
        ctx.body = e
        ctx.success = false
    }
}
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
module.exports = {
    CreateShop,
    GetShopList
}
