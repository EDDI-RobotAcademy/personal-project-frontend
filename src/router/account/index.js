import Vue from "vue";
import VueRouter from "vue-router";

import AccountRegisterPage from "@/views/account/AccountRegisterPage.vue";
import AccountListPage from "@/views/account/AccountListPage.vue";

Vue.use(VueRouter);

const accountRoutes = [
  {
    path: "/account-register-page",
    name: "AccountRegisterPage",
    component: AccountRegisterPage,
  },

  {
    path: "/manager-list-page",
    name: "AccountListPage",
    component: AccountListPage,
  },
];
export default accountRoutes;
