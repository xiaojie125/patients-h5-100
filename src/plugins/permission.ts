import router from "@/router";
// import NProgress from "@/utils/nprogress";

export function setupPermission() {
  // 白名单路由
  // const whiteList = ["/login"];

  router.beforeEach((to, from, next) => {
    console.log(to, from, next);
    next()
    // NProgress.start();

    // const isLogin = getToken
  });
}
