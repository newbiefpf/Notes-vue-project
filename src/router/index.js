import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const constRoutes = [
  {
    path: "/",
    redirect: "/community",
    component: () => import("@/views/index"),
    children: [
      {
        path: "/home",
        component: () => import("@/components/body/center/home.vue"),
      },
      {
        path: "/community",
        component: () => import("@/components/body/center/community.vue"),
      },
      {
        path: "/myindex",
        component: () => import("@/components/body/center/myindex.vue"),
      },
      {
        path: "/publication",
        component: () => import("@/components/body/center/publication.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/components/login/login.vue"),
  },
];

//重复点击同一路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history",
  routes: [...constRoutes],
});
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title ? to.meta.title : "Note";
  next();
});

export default router;
