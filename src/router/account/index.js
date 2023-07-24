import Vue from "vue";
import VueRouter from "vue-router";

import AccountRegistPage from "@/views/account/AccountRegistPage.vue";
import AccountListPage from "@/views/account/AccountListPage.vue";
import LoginPage from "@/views/account/LoginPage.vue";
import CheckPasswordPage from "@/views/account/CheckPasswordPage.vue";
import Mypage from "@/views/account/Mypage.vue";

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
  {
    path: "/check-password",
    name: "CheckPasswordPage",
    component: CheckPasswordPage,
  },
  {
    path: "/mypage/:accountId",
    name: "Mypage",
    components: { default: Mypage },
    props: { default: true },
  },
];
export default accountRoutes;
