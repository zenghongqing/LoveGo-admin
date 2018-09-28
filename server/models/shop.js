const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 店铺信息
const shopInfo = new Schema({
    shop_name: {type: String, unique: true},
    id: {type: Number, unique: true},
    shop_logo: {type: Array},
    cms_content: {type: String},
    category_info: {type: Array},
    cms_banner: {type: Array},
    like_count: {type: Number, default: 0},
    goods_total_num: {type: Number, default: 0},
    goods_list: {type: Array},
    shop_score: {
        ship: {type: Number, default: 0},
        service: {type: Number, default: 0},
        goods: {type: Number, default: 0}
    },
    shop_summary: {type: String},
    shop_create_date: {type: Date, default: Date.now}
}, {
    collection: 'shopInfo'
})
shopInfo.index({
    shop_create_date: -1,
    like_count: -1
})
const SchemaModule = {
    Shop: mongoose.model('shopInfo', shopInfo)
}
module.exports = SchemaModule
