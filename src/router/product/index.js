import Vue from "vue";
import VueRouter from "vue-router";

import ProductListPage from "@/views/product/ProductListPage.vue";
import ProductRegisterPage from "@/views/product/ProductRegisterPage.vue";
import ProductReadPage from "@/views/product/ProductReadPage.vue";
import ProductModifyPage from "@/views/product/ProductModifyPage.vue";

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
  {
    path: "/product-read/:productId",
    name: "ProductReadPage",
    components: { default: ProductReadPage },
    props: { default: true },
  },
  {
    path: "/product-modify/:productId",
    name: "ProductModifyPage",
    components: { default: ProductModifyPage },
    props: { default: true },
  },
];
export default productRoutes;
