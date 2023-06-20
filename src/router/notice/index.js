import Vue from "vue";
import VueRouter from "vue-router";

import ManagerNoticeRegistPage from "@/views/manager/noticePage/ManagerNoticeRegistPage.vue";
import ManagerNoticeListPage from "@/views/manager/noticePage/ManagerNoticeListPage.vue";

Vue.use(VueRouter);

const noticeRoutes = [
    {
        path: "/manager-notice-regist-page",
        name: "ManagerNoticeRegistPage",
        component: ManagerNoticeRegistPage,
    },
    {
        path: "/manager-notice-list-page",
        name: "ManagerNoticeListPage",
        component: ManagerNoticeListPage,
    }

];
export default noticeRoutes;