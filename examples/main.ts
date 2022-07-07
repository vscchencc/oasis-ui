/*
 * @@Description: main
 * @Author: chencc
 * @Date: 2022-07-01 10:10:57
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-07 11:19:06
 */
import { createApp } from "vue";
import router from "./router/index";

// import * as Tiga from "../lib/tigaui";

import Button from "../packages/components/button"

import App from "./App.vue";

const app = createApp(App);

app.use(router);

console.log(Button);
// app.use(Button);

// console.log(Tiga);

app.mount("#app");