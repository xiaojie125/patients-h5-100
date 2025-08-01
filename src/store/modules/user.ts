import type { User } from "@/types/user";
import { clearToken, setRefreshToken, setToken } from "@/utils/auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "cp-user",
  () => {
    // 用户信息
    const user = ref<User>();
    // 设置用户，登录后使用
    const setUser = (u: User) => {
      user.value = u;
      setToken(u.token);
      setRefreshToken(u.refreshToken);
    };
    // 清空用户，退出后使用
    const delUser = () => {
      user.value = undefined;
      clearToken();
    };
    return { user, setUser, delUser };
  },
  {
    persist: true,
  }
);
