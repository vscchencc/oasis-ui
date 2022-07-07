/*
 * @@Description: webpack base config
 * @Author: chencc
 * @Date: 2022-06-29 17:12:59
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-06 16:36:28
 */
const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//打包友好提示
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const envMode = process.env.envMode;

require("dotenv").config({ path: `.env` });
require("dotenv").config({ path: `.env.${envMode}`});

// 正则匹配 VUE_APP_ 开头的变量
const prefixRE = /^VUE_APP_/;

let env = {};
for (const key in process.env) {
  if (key === "NODE_ENV" || key === "BASE_URL" || prefixRE.test(key)) {
    env[key] = JSON.stringify(process.env[key])
  }
}

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  // webpack打包的入口文件
  entry: path.resolve(__dirname, "../examples/main.ts"),
  output: {
    clean: true,
    //自定义asset module资源打包后的路径和名字
    assetModuleFilename: "assets/images/[contenthash][ext]"
  },
  target: "web",
  cache: {
    type: 'filesystem'  // 持久化缓存
  },
  stats: "errors-only",
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@": resolve("src"),
      "@components": resolve("src/components"),
      "@assets": resolve("src/assets"),
      "@img": resolve("src/assets/img"),
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
    new webpack.DefinePlugin({
      "process.env": {
        ...env
      },
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/style/[contenthash].css"
    }),
    new FriendlyErrorsWebpackPlugin({
      // 成功的时候输出
      compilationSuccessInfo: {
        messages: [`已经编译打包成功啦~`]
      },
      // 是否每次都清空控制台
      clearConsole: true
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  optimization: {
    nodeEnv: false
  }
}