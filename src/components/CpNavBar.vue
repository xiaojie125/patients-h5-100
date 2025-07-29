<template>
  <van-nav-bar
    fixed
    left-arrow
    :title="title"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
  </van-nav-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onClickLeft = () => {
  // 判断历史是否有上一页
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/') // 否则回到首页
  }
}

defineProps<{
  title?: string
  rightText?: string
}>()

const emit = defineEmits<{
  (e: 'click-right'): void
}>()
const onClickRight = () => {
  emit('click-right')
}
</script>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }

    &__text {
      font-size: 15px;
    }
  }
}
</style>
