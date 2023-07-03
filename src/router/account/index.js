import Vue from "vue";
import VueRouter from "vue-router";

import AccountRegistPage from "@/views/account/AccountRegistPage.vue";
import AccountListPage from "@/views/account/AccountListPage.vue";

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
];
export default accountRoutes;
