import type { User, CodeType, UserInfo, PatientList, Patient } from "@/types/user";
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

  // 获患者信息列表
  getPatientList() {
    return request<PatientList>("/patient/mylist");
  },

  // 添加患者信息
  addPatient(patient: Patient) {
    return request<Patient>("patient/add", "POST", patient);
  },

  // 编辑患者信息
  editPatient(patient: Patient) {
    return request<Patient>("patient/update", "PUT", patient);
  },

  // 删除患者信息
  deletePatient(id: string) {
    return request<Patient>(`patient/del/${id}`, "DELETE");
  },
};

export default UserAPI;
