import type { FieldRule } from "vant";

// 表单校验
const mobileRules: FieldRule[] = [
  { required: true, message: "请输入手机号" },
  { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确" },
];

const passwordRules: FieldRule[] = [
  { required: true, message: "请输入密码" },
  { pattern: /^\w{8,24}$/, message: "密码需8-24个字符" },
];

const codeRules: FieldRule[] = [
  { required: true, message: "请输入短信验证码" },
  { pattern: /^\d{6}$/, message: "验证码是6个数字" },
];

const nameRules: FieldRule[] = [
  { required: true, message: "请输入姓名" },
  { pattern: /^[\u4e00-\u9fa5]{2,16}$/, message: "中文2-16个字符" },
];

const idCardRules: FieldRule[] = [
  { required: true, message: "请输入身份证号" },
  { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: "身份证号格式不正确" },
];

export { mobileRules, passwordRules, codeRules, nameRules, idCardRules };
