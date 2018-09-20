const multer = require('koa-multer')
// const upload = multer({dest: './public/uploads/'})
// 处理上传文件
const storage = multer.diskStorage({
    // 文件保存路径
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    // 修改文件名称
    filename: (req, file, cb) => {
        const fileFormat = (file.originalname).split('.') // 以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})
// 加载配置
const upload = multer({storage: storage})
module.exports = upload
