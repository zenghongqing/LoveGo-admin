const AlipayFormData = require('alipay-sdk/lib/form').default
const fs = require('fs')
const path = require('path')
const AliPaySdk = require('alipay-sdk').default

const formData = new AlipayFormData()
formData.setMethod('get')

formData.addField('notifyUrl', 'https://openclub.alipay.com/index.php')
formData.addField('bizContent', {
    outTradeNo: '70501111111S001111119',
    productCode: 'QUICK_MSECURITY_PAY',
    totalAmount: '0.01',
    subject: '商品',
    body: '商品详情'
})
const read = filename => {
    return fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
}
const payMoney = async (ctx, next) => {
    // const params = JSON.parse(ctx.request.body)
    const options = {
        appId: '2018111062131493',
        privateKey: read('../keys/private-key.pem'),
        alipayPublicKey: read('../keys/public-key.pem')
    }
    const alipaySdk = new AliPaySdk(options)
    try {
        const result = await alipaySdk.exec('alipay.trade.page.pay', {}, {
            formData: formData
        })
        ctx.body = result
        ctx.success = true
        console.log(result, 'result')
    } catch (e) {
        console.log(e)
    }
} 
module.exports = {
    payMoney
}
