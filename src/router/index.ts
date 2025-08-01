import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true,
  }
);
/** 原始静态路由（未做任何处理） */
const routes: any = [];

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

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
      children: [...routes],
    },
  ],
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
