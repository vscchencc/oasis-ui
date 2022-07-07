/*
 * @@Description: 
 * @Author: chencc
 * @Date: 2022-07-06 16:38:31
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-06 16:38:38
 */
declare module "*.vue" {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}