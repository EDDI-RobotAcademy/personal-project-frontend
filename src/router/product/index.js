import Vue from "vue";
import VueRouter from "vue-router";

import ProductListPage from "@/views/product/ProductListPage.vue";
import ProductRegisterPage from "@/views/product/ProductRegisterPage.vue";

Vue.use(VueRouter);

const productRoutes = [
  {
    path: "/product-list",
    name: "ProductListPage",
    component: ProductListPage,
  },
  {
    path: "/product-register",
    name: "ProductRegisterPage",
    component: ProductRegisterPage,
  },
];
export default productRoutes;
