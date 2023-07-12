import Vue from "vue";
import VueRouter from "vue-router";

import AccountRegistPage from "@/views/account/AccountRegistPage.vue";
import AccountListPage from "@/views/account/AccountListPage.vue";
import LoginPage from "@/views/account/LoginPage.vue";

Vue.use(VueRouter);

const accountRoutes = [
  {
    path: "/account-regist-page",
    name: "AccountRegistPage",
    component: AccountRegistPage,
  },
  {
    path: "/account-list-page",
    name: "AccountListPage",
    component: AccountListPage,
  },
  {
    path: "/login-page",
    name: "LoginPage",
    component: LoginPage,
  },
];
export default accountRoutes;
