const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberInfo = new Schema({
    username: {
        type: String,
        index: true,
        unique: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    password: String,
    Sex: String,
    photoUrl: {type: String, default: 'https://static.hdslb.com/images/akari.jpg'},
    nickName: String,
    phone: {type: String, unique: true},
    validWalletAmount: {type: Number, default: 0},
    paymentPassword: {type: String, default: null}
}, {collection: 'memberInfo'})
memberInfo.index({username: 1, createTime: -1})

const address = new Schema({
    Phone: String,
    City: String,
    Area: String,
    Selected: Number,
    nickName: String,
    MemberToken: String
}, {collection: 'addressInfo'})
const SchemaModule = {
    Member: mongoose.model('memberInfo', memberInfo),
    Address: mongoose.model('address', address)
}
module.exports = SchemaModule
