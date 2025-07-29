<template>
  <!-- 验证vant颜色被覆盖 -->
  <van-button type="primary">按钮</van-button>
  <a href="#">123</a>
</template>

<script setup lang="ts">
import { Button as VanButton } from 'vant'
</script>

<style scoped lang="scss">
// 使用 css 变量
a {
  color: var(--cp-primary);
}
</style>
