import Vue from 'vue'
import VueRouter from 'vue-router'

import MemberSignUpPage from '@/views/member/MemberSignUpPage.vue'
import MemberLoginPage from '@/views/member/MemberLoginPage.vue'

Vue.use(VueRouter)

const memberRoutes = [
    {
        path: '/member-sign-up-page',
        name: 'MemberSignUpPage',
        component: MemberSignUpPage
    },
    {
        path: '/member-login-page',
        name: 'MemberLoginPage',
        component: MemberLoginPage
    }
]

export default memberRoutes
