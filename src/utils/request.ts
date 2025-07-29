import { useUserStore } from '@/stores'
import router from '@/router'
import axios from 'axios'
import { showToast } from 'vant'

const instance = axios.create({
  baseURL: '/',
  timeout: 10000
})

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    // 请求头携带token
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    // 处理业务失败 与后端约定 响应如果不是10000 则代表业务失败
    if (res.data?.code !== 10000) {
      showToast(res.data?.message || '业务失败')
    }
    // 摘取核心响应数据
    return res.data
  },
  (err) => {
    // 处理401错误
    if (err.response.status === 401) {
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登录页面
      router.push({
        path: '/login',
        query: { returnUrl: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(err)
  }
)

export default instance
