import router from "@/router";
import { getToken } from "@/utils/auth";
import NProgress from "@/utils/nprogress";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function setupPermission() {
  // 白名单路由
  const whiteList = ["/login"];

  router.beforeEach((to, from, next) => {
    NProgress.start();

    const isLogin = !!getToken(); // 判断是否登陆
    if (isLogin) {
      if (to.path === "login") {
        // 已登录，访问登录页，重定向到主页
        next({ path: "/" });
      } else {
        next();
      }
    } else {
      // 未登录，判断是否在白名单中
      if (whiteList.includes(to.path)) {
        next();
      } else {
        // 不在白名单中，重定向到登陆页
        redirectToLogin(to, next);
        NProgress.done();
      }
    }
  });

  // 后置守卫，保证每次路由跳转结束时关闭进度条
  router.afterEach(() => {
    NProgress.done();
  });
}

// 重定向到登录页
function redirectToLogin(to: RouteLocationNormalized, next: NavigationGuardNext) {
  const params = new URLSearchParams(to.query as Record<string, string>);
  const queryString = params.toString();
  const redirect = queryString ? `${to.path}?${queryString}` : to.path;
  next(`/login?redirect=${encodeURIComponent(redirect)}`);
}
