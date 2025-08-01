export default {
  path: "/user",
  redirect: "/user/index",
  children: [
    {
      path: "/user/index",
      component: () => import("@/views/User/index.vue"),
      meta: { title: "我的" },
    },
    {
      path: "/user/patient",
      component: () => import("@/views/User/PatientPage.vue"),
      meta: { title: "家庭档案" },
    },
  ],
} satisfies RouteConfigsTable;
