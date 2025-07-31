import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      meta: {
        title: "登录",
      },
      component: () => import("@/views/Login/index.vue"),
    },
    {
      path: "/",
      component: () => import("@/layout/index.vue"),
      redirect: "/home",
      children: [
        {
          path: "/home",
          meta: {
            title: "首页",
          },
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "/article",
          meta: {
            title: "健康百科",
          },
          component: () => import("@/views/Article/index.vue"),
        },
        {
          path: "/notify",
          meta: {
            title: "消息中心",
          },
          component: () => import("@/views/Notify/index.vue"),
        },
        {
          path: "/user",
          meta: {
            title: "我的",
          },
          component: () => import("@/views/User/index.vue"),
        },
      ],
    },
  ],
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
