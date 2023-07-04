import Vue from "vue";
import VueRouter from "vue-router";

import SignUpPage from "@/views/account/SignUpPage.vue";

Vue.use(VueRouter);

const accountRoutes = [
  {
    path: "/sign-up-page",
    name: "SignUpPage",
    component: SignUpPage,
  },
];

export default accountRoutes;
