export default {
  path: "/home",
  redirect: "/home/index",
  children: [
    {
      path: "/home/index",
      meta: {
        title: "首页",
      },
      component: () => import("@/views/Home/index.vue"),
    },
  ],
} satisfies RouteConfigsTable;
