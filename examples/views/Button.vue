<!--
 * @@Description: Button
 * @Author: chencc
 * @Date: 2022-07-06 16:52:18
 * @LastEditors: chencc
 * @LastEditTime: 2022-07-07 09:25:17
-->
<template>
  <div @click="handleClick">测试按钮组件</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";

export default defineComponent({
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