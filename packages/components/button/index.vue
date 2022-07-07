<!--
 * @@Description: button component
 * @Author: chencc
 * @Date: 2022-07-07 09:20:12
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-07 09:29:43
-->
<template>
  <div class="tiga-button">
    <p @click="handleClick">测试按钮组件</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";

export default defineComponent({
  name: "tiga-button",
  setup() {
    const handleClick = () => {
      console.log("-----click-----");
    }

    return {
      handleClick
    }
  }
})

</script>

<style scoped>
@import "./style.scss";
</style>