import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const constRoutes = [
  {
    path: "/",
    component: () => import("@/views/index"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes: [...constRoutes],
});
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title ? to.meta.title : "Note";
  next();
});




export default router
