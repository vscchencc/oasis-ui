/*
 * @@Description: webpack prod config
 * @Author: chencc
 * @Date: 2022-06-29 19:28:42
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-06 16:22:50
 */
const path = require("path");
const { merge } = require("webpack-merge");
//复制静态资源到指定文件夹
const copyWebpackPlugin = require("copy-webpack-plugin");
// 压缩 CSS
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//压缩js
const TerserWebpackPlugin = require("terser-webpack-plugin");
// 引入htmlWebpackPlugin自动导入js文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//查看打包的文件大小
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const compressionWebpackPlugin = require("compression-webpack-plugin");

const BaseWebpackConfig = require("./webpack.base");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

//只有生产的包会清除log
const consoleObj = function () {
  if (process.env.NODE_ENV === "production") {
    return {
      // 多进程
      parallel: true,
      //删除注释
      extractComments: false,
      terserOptions: {
        compress: {
          // 生产环境去除console
          drop_console: true,
          drop_debugger: true
        }
      }
    };
  } else {
    return {
      // 多进程
      parallel: true
    };
  }
};

module.exports = merge(BaseWebpackConfig, {
  mode: "production",
  // webpack打包的输出相关的额配置
  output: {
    // 打包时先清除上次打包文件
    clean: true,
    path: path.resolve(__dirname, "../dist"),
    filename: "./js/[name].[chunkhash].js",
  },
  plugins: [
    //静态资源输出到根目录
    new copyWebpackPlugin({
      patterns: [
        {
          from: resolve("/public"),
          //放到output文件夹下
          to: resolve("/dist"),
          globOptions: {
            dot: true,
            gitignore: false,
            ignore: [
              // 配置不用copy的文件
              "**/index.html"
            ]
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      // 指定模板
      template: path.resolve (__dirname, '../public/index.html'),
      // 输出的文件
      filename: path.resolve (__dirname, '../dist/index.html'),
      title: "Template-Vue3",
      inject: "body",
      minify: {
        collapseWhitespace: true, // 去掉空格
        removeComments: true // 去掉注释
      }
    }),
    new compressionWebpackPlugin({
      algorithm: "gzip", // 使用gzip压缩
      test: /\.js$|\.html$|\.css$/, // 匹配文件名
      filename: "[path][base].gz", // 压缩后的文件名(保持原文件名，后缀加.gz)
      minRatio: 0.8, // 压缩率小于1才会压缩
      threshold: 10240, // 对超过10k的数据压缩
      deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.analyMode == "true" ? "server" : "disabled", //这个配置后默认是不会启用这个插件
      generateStatsFile: false, // 是否生成stats.json文件
      statsOptions: { source: false }
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(consoleObj())
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial", // only package third parties that are initially dependent
        },
        commons: {
          name: "chunk-common",
          minChunks: 2, //  minimum common number
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true,
        },
      }
    }
  }
})