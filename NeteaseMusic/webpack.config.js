/*
 * @Author: i白描
 * @Date:   2019-02-26 10:03:59
 * @Last Modified by:   i白描
 * @Last Modified time: 2019-02-26 11:43:30
 */
const webpack = require('webpack');

module.exports = function(webpackConfig, env) {
	if (process.env.env === 'prod') {
		webpackConfig.plugins.push(new webpack.IgnorePlugin(/^vconsole$/))
	}
	return webpackConfig
}