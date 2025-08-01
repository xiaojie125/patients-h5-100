export default {
  path: "/notify",
  redirect: "/notify/index",
  children: [
    {
      path: "/notify/index",
      meta: {
        title: "消息中心",
      },
      component: () => import("@/views/Notify/index.vue"),
    },
  ],
} satisfies RouteConfigsTable;
