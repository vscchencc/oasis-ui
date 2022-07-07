/*
 * @@Description: 
 * @Author: chencc
 * @Date: 2022-07-07 09:40:46
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-07 15:47:21
 */
import { withInstall } from "./utils/index"
import Button from "./components/button/index";

const componentsList = [
  Button
]

const install = function(Vue) {
  // 注册所有组件
  withInstall(componentsList)
  // componentsList.map((component) => {
  //   Vue.use(component)
  // })
}

export default {
  install,
  Button
}