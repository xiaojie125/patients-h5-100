<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;">
        查看更多
        <i class="van-icon van-icon-arrow" />
      </a>
    </div>
    <div class="body">
      <!-- 推荐关注医生 -->
      <van-swipe :width="(150 / 375) * width" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="item in list" :key="item.id">
          <doctor-card :item="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import DoctorCard from "./DoctorCard.vue";
import { useWindowSize } from "@vueuse/core";
import ConsultAPI from "@/api/consult";
import { DoctorList } from "@/types/consult";
import { onMounted, ref } from "vue";

const { width } = useWindowSize();

const list = ref<DoctorList>([]);
const loadData = async () => {
  const res = await ConsultAPI.getDoctorPage({ current: 1, pageSize: 5 });
  list.value = res.data.rows;
};
onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
