import Vue from "vue";
import VueRouter from "vue-router";

import CommunityRegistPage from "@/views/community/CommunityRegistPage";
import CommunityModifyPage from "@/views/community/CommunityModifyPage";
import CommunityPage from "@/views/community/CommunityPage";

Vue.use(VueRouter);

const communityRoutes = [
  {
    path: "/community-regist-page",
    name: "CommunityRegistPage",
    component: CommunityRegistPage,
  },
  {
    path: "/community-modify-page",
    name: "CommunityModifyPage",
    component: { default: CommunityModifyPage },
    props: { default: true },
  },
  {
    path: "/community-page",
    name: "CommunityPage",
    components: CommunityPage,
  },
];
export default communityRoutes;
