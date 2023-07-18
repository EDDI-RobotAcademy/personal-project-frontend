import Vue from "vue";
import VueRouter from "vue-router";

import AwsSdkView from "@/components/aws/AwsSdk.vue";

Vue.use(VueRouter);

const awsSdkRoutes = [
  {
    path: "/aws-sdk",
    name: "AwsSdkView",
    component: AwsSdkView,
  },
];

export default awsSdkRoutes;
