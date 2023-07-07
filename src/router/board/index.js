import Vue from 'vue'
import VueRouter from 'vue-router'

import MemberBoardListPage from '@/views/board/MemberBoardListPage.vue'

Vue.use(VueRouter)

const memberBoardRoutes = [
    {
        path: '/member-board-list-page',
        name: 'MemberBoardListPage',
        component: MemberBoardListPage
    },
]

export default memberBoardRoutes
