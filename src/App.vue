<template>
  <p>{{ store.user }}</p>
  <van-button
    @click="
      store.setUser({
        id: '1',
        mobile: '1',
        account: '1',
        avatar: '1',
        token: '1'
      })
    "
  >
    登录
  </van-button>
  <van-button @click="store.delUser()">退出</van-button>
</template>

<script setup lang="ts">
import { Button as VanButton } from 'vant'
import { useUserStore } from './stores'

const store = useUserStore()
</script>

<style scoped lang="scss">
// 使用 css 变量
a {
  color: var(--cp-primary);
}
</style>
