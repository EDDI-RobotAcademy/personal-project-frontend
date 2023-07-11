import Vue from 'vue'
import VueRouter from 'vue-router'

import MemberBoardListPage from '@/views/board/MemberBoardListPage.vue'
import MemberBoardRegisterPage from '@/views/board/MemberBoardRegisterPage.vue'
import MemberBoardReadPage from '@/views/board/MemberBoardReadPage.vue'
Vue.use(VueRouter)

const memberBoardRoutes = [
    {
        path: '/member-board-list-page',
        name: 'MemberBoardListPage',
        component: MemberBoardListPage
    },
    {
        path: '/member-board-register-page',
        name: 'MemberBoardRegisterPage',
        component: MemberBoardRegisterPage
    },
    {
        path: '/member-board-read-page',
        name: 'MemberBoardReadPage',
        component: MemberBoardReadPage
    },
]

export default memberBoardRoutes
