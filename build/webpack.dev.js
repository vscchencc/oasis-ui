/*
 * @@Description: webpack dev config
 * @Author: chencc
 * @Date: 2022-06-29 15:21:09
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-06 16:37:10
 */
const path = require("path");
const { merge } = require("webpack-merge");

const BaseWebpackConfig = require("./webpack.base");

// 引入htmlWebpackPlugin自动导入js文件
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(BaseWebpackConfig, {
  mode: "development",
  devtool: 'source-map',
  // webpack打包的输出相关的额配置
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve (__dirname, '../dist'),
    // 打包后生成的js文件，带hash值来保证文件的唯一性
    filename: 'js/[name].[chunkhash].js',
    // 生成的chunk文件名
    chunkFilename: 'js/[name].[chunkhash].js',
    // 资源的引用路径（这个跟你打包上线的配置有关系）
    publicPath: '/',
  },
  devServer: {
    hot: true,
    open: false,
    port: 8096,
    host: "localhost",
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 指定模板
      template: path.resolve (__dirname, '../public/index.html'),
      // 输出的文件
      filename: path.resolve (__dirname, '../dist/index.html'),
      title: "Template-Vue3",
      //打包出来的那个js文件，放置在生成的body标签内
      inject: "body"
    }),
  ],
  optimization: {
    runtimeChunk: "single"
  }
})
