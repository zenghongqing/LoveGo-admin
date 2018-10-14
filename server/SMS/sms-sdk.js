const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIuiiL0UHyXYpp'
const secretAccessKey = 'eF1wd2UuA9ITNlhMVkjj8GXni6vpHa'
// 初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})
// 发送短信
module.exports = smsClient
