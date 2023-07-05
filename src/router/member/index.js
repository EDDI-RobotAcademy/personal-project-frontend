import Vue from 'vue'
import VueRouter from 'vue-router'

import MemberSignUpPage from '@/views/member/MemberSignUpPage.vue'

Vue.use(VueRouter)

const memberRoutes = [
    {
        path: '/member-sign-up-page',
        name: 'MemberSignUpPage',
        component: MemberSignUpPage
    }
]

export default memberRoutes
