import Vue from 'vue'
import VueRouter from 'vue-router'

import MemberBoardListPage from '@/views/board/MemberBoardListPage.vue'
import MemberBoardRegisterPage from '@/views/board/MemberBoardRegisterPage.vue'
import MemberBoardReadPage from '@/views/board/MemberBoardReadPage.vue'
import MemberBoardModifyPage from '@/views/board/MemberBoardModifyPage.vue'
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
        path: '/member-board-read-page/:boardId',
        name: 'MemberBoardReadPage',
        components: {
            default: MemberBoardReadPage
        },
        props: {
            default: true
        }
    },
    {
        path: '/member-board-modify-page/:boardId',
        name: 'MemberBoardModifyPage',
        components: {
            default: MemberBoardModifyPage
        },
        props: {
            default: true
        }
    }
]

export default memberBoardRoutes
