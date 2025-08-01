import type {
  DoctorPage,
  FollowType,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
} from "@/types/consult";
import { request } from "@/utils/request";

const ConsultAPI = {
  // 获取知识列表
  getKnowledgePage(params: KnowledgeParams) {
    return request<KnowledgePage>("/patient/home/knowledge", "GET", params);
  },

  // 获取推荐关注医生
  getDoctorPage(params: PageParams) {
    return request<DoctorPage>("/home/page/doc", "GET", params);
  },

  // 关注或取消关注医生
  followOrUnfollow(id: string, type: FollowType = "doc") {
    return request("/like", "POST", { id, type });
  },
};

export default ConsultAPI;
