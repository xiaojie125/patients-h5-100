<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { KnowledgeList, KnowledgeParams, KnowledgeType } from "@/types/consult";
import KnowledgeCard from "./KnowledgeCard.vue";
import ConsultAPI from "@/api/consult";
import { ref } from "vue";

const props = defineProps<{
  type: KnowledgeType;
}>();

// 数据列表
const list = ref<KnowledgeList>([]);
// 加载中状态
const loading = ref(false);
// 是否已全部加载完毕
const finished = ref(false);
// 查询参数
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10,
});
// 滚动到底部
const onLoad = async () => {
  // 加载数据
  const res = await ConsultAPI.getKnowledgePage(params.value);
  list.value.push(...res.data.rows);
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true;
  } else {
    params.value.current++;
  }
  loading.value = false;
};
</script>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
