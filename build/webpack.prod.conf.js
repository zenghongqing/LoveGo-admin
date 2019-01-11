'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { DllReferencePlugin } = require('webpack')
const webpackConfig = merge(baseWebpackConfig, {
  	mode: 'production',
  	devtool: config.build.productionSourceMap ? config.build.devtool : false,
  	output: {
	  	path: config.build.assetsRoot,
	  	filename: utils.assetsPath('js/[name].[chunkhash].js'),
	  	chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  	},
  	module: {
		rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
	},
  	optimization: {
	  	minimizer: [
			// 优化压缩css
			new OptimizeCSSAssetsPlugin(),
		  	new UglifyJsPlugin({
			  	parallel: 4
			  	// output: {
				//   	comments: false
				// }
			})
		],
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				// 处理入口chunk
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'initial',
					priority: 10
				},
				'async-commons': { // 异步加载公共包、组件等
					name: 'async-commons',
					minSize: 0,
					minChunks: 2,
					chunks: 'async',
					priority: 8
				},
				commons: {// 其他同步加载公共包
					chunks: 'all',
					minChunks: 2,
					name: 'commons',
					priority: 1
				}
			}
		},
		// 为每一个入口提取webpack runtime模块
		runtimeChunk: {name: 'manifest'}
  	},
  	plugins: [
		// 告诉 Webpack 使用了哪些动态链接库
		new DllReferencePlugin({
			context: __dirname, // 上下文环境路径
			// 描述 react 动态链接库的文件内容
			manifest: require('./dll/vue.dll.manifest.json')
		}),
		// extract css into its own file
		new MiniCssExtractPlugin({
			filename: 'static/css/[name]:[contenthash: 8].css'
		}),
		// Compress extracted CSS. We are using this plugin so that possible
		// duplicated CSS from different components can be deduped.
		new OptimizeCSSPlugin({
			cssProcessorOptions: config.build.productionSourceMap
			? { safe: true, map: { inline: false } }
			: { safe: true }
		}),
		// generate dist index.html with correct asset hash for caching.
		// you can customize output by editing /index.html
		// see https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: process.env.NODE_ENV === 'testing'
			? 'index.html'
			: config.build.index,
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),
		// keep module.id stable when vendor modules does not change
		new webpack.HashedModuleIdsPlugin(),
		// enable scope hoisting
		new webpack.optimize.ModuleConcatenationPlugin(),
		// copy custom static assets
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../static'),
				to: config.build.assetsSubDirectory,
				ignore: ['.*']
		}
		])
  	]
})

module.exports = webpackConfig
