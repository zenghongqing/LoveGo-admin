const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodsCategoryInfo = new Schema({ // 商品分类
    Id: {
        type: Number,
        unique: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type: Number
    },
    image_url: {
        type: Array
    },
    name: {
        type: String
    },
    desc: {
        type: String
    }
}, {
    collection: 'goodsCategoryInfo'
})

goodsCategoryInfo.index({
    Id: 1,
    parentId: 1
})
const shopProductInfo = new Schema({
    createTime: {
        type: Date,
        default: Date.now
    },
    productName: {
        type: String
    },
    categoryId: {// 分类父级Id
        type: Number
    },
    shopId: {// 该商品对应的店铺Id
        type: Number
    },
    productNo: {
        type: String,
        unique: true
    },
    image_url: {
        type: Array
    },
    content: {
        type: String
    },
    summary: {
        type: String
    },
    price: {
        type: Number
    },
    stocks: {// 库存
        type: Number
    },
    status: {// 1上架 9下架
        type: Number
    }
}, {
    collection: 'shopProductInfo'
})
shopProductInfo.index({
    createTime: -1,
    status: 1
})
module.exports = {
    Category: mongoose.model('goodsCategoryInfo', goodsCategoryInfo),
    Product: mongoose.model('shopProductInfo', shopProductInfo)
}
