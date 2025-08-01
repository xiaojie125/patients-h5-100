export default {
  path: "/article",
  redirect: "/article/index",
  children: [
    {
      path: "/article/index",
      meta: {
        title: "健康百科",
      },
      component: () => import("@/views/Article/index.vue"),
    },
  ],
} satisfies RouteConfigsTable;
