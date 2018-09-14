import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
/**
 * @param String 引入文件的目录(第一个参数)
 * @param Boolean 是否要查找该目录下的子级目录
 * @param String 匹配要引入的文件
*/
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
