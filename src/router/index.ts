import { useUserStore } from '@/store'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/Login/index.vue') },
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/Home/index.vue') },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue')
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue')
        },
        { path: '/user', component: () => import('@/views/User/index.vue') }
      ]
    }
  ]
})

// 全局前置路由守卫
// router.beforeEach((to, form, next) => {
//   // 用户仓库
//   const store = useUserStore()
//   // 不需要登录的页面，白名单
//   const whiteList = ['/login']
//   // 如果没有登录且不在白名单内，去登录
//   if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
//   // 否则不做任何处理
//   next()
// })

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
