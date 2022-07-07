/*
 * @@Description: webpack component lib
 * @Author: chencc
 * @Date: 2022-07-07 09:33:14
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-07 10:22:11
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  entry: {
    tigaui: path.resolve(__dirname, "../packages/tigaui.ts")
  },
  output: {
    clean: true,
    // 打包过后的文件的输出的路径
    path: path.resolve (__dirname, "../lib"),
    // 打包后生成的js文件
    filename: "[name].js",
    publicPath: "/",
    library: "tigaui",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  externals: {
    // "vue": "Vue",
    // "vue-router": "VueRouter"
  },
  resolve: {
    extensions: ['*', '.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../examples'),
      UI: path.resolve(__dirname, '../packages/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset", // asset 资源类型可以根据指定的图片大小来判断是否需要将图片转化为 base64
        generator: {
          filename: "assets/images/[hash][ext][query]" // 局部指定输出位置
        },
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024 // 限制于 60kb
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|)$/,
        type: "asset/resource",
        generator: {
          // 输出文件位置以及文件名
          filename: "assets/fonts/[hash:8].[name][ext]"
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
  ]
}