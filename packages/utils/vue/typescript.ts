/*
 * @@Description: typescript
 * @Author: chencc
 * @Date: 2022-07-07 15:11:58
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-07 15:16:28
 */
import type { AppContext, Plugin } from "vue";

export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}