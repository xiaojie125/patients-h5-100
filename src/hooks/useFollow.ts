import ConsultAPI from "@/api/consult";
import type { FollowType } from "@/types/consult";
import { ref } from "vue";

// 关注
export const useFollow = (type: FollowType = "doc") => {
  const loading = ref(false);

  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true;
    try {
      await ConsultAPI.followOrUnfollow(item.id, type);
      item.likeFlag = item.likeFlag === 1 ? 0 : 1;
    } finally {
      loading.value = false;
    }
  };
  return { loading, follow };
};
