import type { User, CodeType } from '@/types/user'
import { request } from '@/utils/request'

// 密码登陆
export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}

// 发送验证码
export const sendMobileCode = (mobile: string, type: CodeType) => {
  return request('code', 'GET', { mobile, type })
}

// 短信登录
export const loginByMobile = (mobile: string, code: string) => {
  return request<User>('login', 'POST', { mobile, code })
}
