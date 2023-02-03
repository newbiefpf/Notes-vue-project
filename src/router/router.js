// import Vue from "vue";

import Home from "@/views/Home.vue";


const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/profile",
    component: () => import("@/views/Profile"),
  },
  {
    path: "/messages",
    component: () => import("@/views/Messages"),
  },
  {
    path: "/public",
    component: () => import("@/views/Public"),
  },
  {
    path: "/settings",
    component: () => import("@/views/Settings"),
  },
];



export default routes;
