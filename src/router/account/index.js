import Vue from "vue";
import VueRouter from "vue-router";

import SignUpPage from "@/views/account/SignUpPage.vue";
import SignInPage from "@/views/account/SignInPage.vue";

Vue.use(VueRouter);

const accountRoutes = [
  {
    path: "/sign-up",
    name: "SignUpPage",
    component: SignUpPage,
  },
  {
    path: "/sign-in",
    name: "SignInPage",
    component: SignInPage,
  },
];

export default accountRoutes;
