const { DllPlugin } = require('webpack')
const path = require('path')
const config = require('../config')
module.exports = {
    entry: {
        vue: ['vue', 'vue-router', 'vuex', 'echarts', 'element-ui', 'vue-html5-editor']
    },
    output: {
        path: path.join(__dirname, 'dist-[hash]'),
        filename: '[name].dll.js',
        // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
        // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
        library: '_dll_[name]'
    },
    plugins: [
        // 接入DllPlugin
        new DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            // 例如 react.manifest.json 中就有 "name": "_dll_react"
            path: path.join(__dirname, 'dll', '[name].dll.manifest.json'),
            // filename: '[name].dll.js',
            name: '_dll_[name]'
        })
    ]
}