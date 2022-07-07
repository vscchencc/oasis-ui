/*
 * @@Description: main
 * @Author: chencc
 * @Date: 2022-07-01 10:10:57
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-07 15:53:23
 */
import { createApp } from "vue";
import router from "./router/index";

// import * as Tiga from "../lib/tigaui";

// import TigaButton from "../packages/components/button"
const Tiga = require("../lib/tigaui")

import App from "./App.vue";

const app = createApp(App);

app.use(router);

console.log(Tiga);

// console.log(TigaButton);
// app.use(TigaButton);

// console.log(Tiga);

app.mount("#app");