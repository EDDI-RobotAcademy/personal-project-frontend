import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

import MapTestPage from "../views/MapTestPage.vue";
import MapMarkerTestPage from "../views/MapMarkerTestPage.vue";

import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";

import BordRegisterPage from "../views/Bord/BordRegisterPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/mapTestPage",
    name: "MapTestPage",
    component: MapTestPage,
  },
  {
    path: "/mapMarkerTestPage",
    name: "MapMarkerTestPage",
    component: MapMarkerTestPage,
  },
  {
    path: "/loginPage",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/signupPage",
    name: "SignupPage",
    component: SignupPage,
  },
  {
    path: "/bordRegisterPage",
    name: "BordRegisterPage",
    component: BordRegisterPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
