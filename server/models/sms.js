const mongoose = require('mongoose')
const Schema = mongoose.Schema

const smsChallengecode = new Schema({
    username: {type: String},
    phone: {type: String},
    createTime: {type: Date, default: Date.now},
    challengecode: {type: String, unique: true},
    Status: {type: Number}
}, {collection: 'smsChallengecode'})

smsChallengecode.index({
    createTime: -1,
    Status: -1
})
const SchemaModule = {
    SMSChallengeCode: mongoose.model('smsChallengecode', smsChallengecode)
}
module.exports = SchemaModule
