import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";
import accountRoutes from "./account";
import productRoutes from "./product";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  ...accountRoutes,
  ...productRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
