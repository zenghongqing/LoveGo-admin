const jwt = require('jsonwebtoken')
module.exports = async (ctx, next) => {
    const authorization = ctx.get('Authorization')
    if (authorization === '') {
        ctx.throw(401, 'no token detected in http header "Authorization"')
    }
    const token = authorization.split(' ')[1]
    let tokenContent
    try {
        tokenContent = await jwt.verify(token, 'sinner77') // //如果token过期或验证失败，将抛出错误
    } catch (err) {
        ctx.throw(401, 'invalid token')
    }
    await next()
}