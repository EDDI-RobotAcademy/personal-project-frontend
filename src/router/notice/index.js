import Vue from "vue";
import VueRouter from "vue-router";

import NoticeRegistPage from "@/views/notice/NoticeRegistPage.vue";
import NoticePage from "@/views/notice/NoticePage.vue";

Vue.use(VueRouter);

const noticeRoutes = [
  {
    path: "/notice-regist-page",
    name: "NoticeRegistPage",
    component: NoticeRegistPage,
  },
  {
    path: "/notice-page",
    name: "NoticePage",
    component: NoticePage,
  },
];
export default noticeRoutes;
