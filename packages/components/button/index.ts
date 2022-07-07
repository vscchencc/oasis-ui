/*
 * @@Description: Button entry
 * @Author: chencc
 * @Date: 2022-07-07 09:25:36
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-07 09:53:14
 */

import Button from "./index.vue"

Button.install = (Vue: any) => {
  Vue.component(Button.name, Button);
};

export default Button;
