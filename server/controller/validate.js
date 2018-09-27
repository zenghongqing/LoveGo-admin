const { Admin } = require('../models/admin')
exports.permissionValidate = (ctx, AdminToken, permissionList) => {
    return new Promise((resolve, reject) => {
        Admin.findOne({
            _id: AdminToken
        }, {
            password: 0
        }).then(adminInfo => {
            console.log(adminInfo, '111')
            if (!adminInfo) {
                return resolve({msg: '用户信息不存在'})
            }
            if (permissionList.indexOf(adminInfo.roles) === -1) {
                return resolve({msg: '用户权限不足'})
            }
            return resolve(adminInfo)
        }, err => {
            reject(err)
        })
    })
}
