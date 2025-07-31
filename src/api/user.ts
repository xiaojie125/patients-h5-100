import type { User, CodeType, UserInfo } from "@/types/user";
import { request } from "@/utils/request";

const UserAPI = {
  // 密码登陆
  loginByPassword(mobile: string, password: string) {
    return request<User>("/login/password", "POST", { mobile, password });
  },

  // 发送验证码
  sendMobileCode(mobile: string, type: CodeType) {
    return request("code", "GET", { mobile, type });
  },

  // 短信登录
  loginByMobile(mobile: string, code: string) {
    return request<User>("login", "POST", { mobile, code });
  },

  // 获取个人信息
  getUserInfo() {
    return request<UserInfo>("/patient/myUser");
  },
};

export default UserAPI;
