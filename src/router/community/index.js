import Vue from "vue";
import VueRouter from "vue-router";

import CommunityRegistPage from "@/views/community/CommunityRegistPage.vue";
import CommunityModifyPage from "@/views/community/CommunityModifyPage.vue";
import CommunityPage from "@/views/community/CommunityPage.vue";
import CommunityReadPage from "@/views/community/CommunityReadPage.vue";

Vue.use(VueRouter);

const communityRoutes = [
  {
    path: "/community-regist-page",
    name: "CommunityRegistPage",
    component: CommunityRegistPage,
  },
  {
    path: "/community-modify/:communityId",
    name: "CommunityModifyPage",
    components: { default: CommunityModifyPage },
    props: { default: true },
  },
  {
    path: "/community/:communityId",
    name: "CommunityReadPage",
    components: { default: CommunityReadPage },
    props: { default: true },
  },
  {
    path: "/community-page",
    name: "CommunityPage",
    component: CommunityPage,
  },
];
export default communityRoutes;
