import Vue from "vue";
import VueRouter from "vue-router";

import NoticeRegistPage from "@/views/notice/NoticeRegistPage.vue";
import NoticePage from "@/views/notice/NoticePage.vue";
import NoticeReadPage from "@/views/notice/NoticeReadPage.vue";
import NoticeModifyPage from "@/views/notice/NoticeModifyPage.vue";

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
  {
    path: "/notice/:noticeId",
    name: "NoticeReadPage",
    components: { default: NoticeReadPage },
    props: { default: true },
  },
  {
    path: "/notice-modify/:noticeId",
    name: "NoticeModifyPage",
    components: { default: NoticeModifyPage },
    props: { default: true },
  },
];
export default noticeRoutes;
