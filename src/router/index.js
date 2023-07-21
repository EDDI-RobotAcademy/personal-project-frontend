import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import accountRoutes from "./account";
import noticeRoutes from "./notice";
import communityRoutes from "./community";
import imsipage from "@/views/imsipage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/imsi",
    name: "imsipage",
    component: imsipage,
  },

  ...accountRoutes,
  ...noticeRoutes,
  ...communityRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
