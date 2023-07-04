import Vue from 'vue'
import VueRouter from 'vue-router'

import SignInPage from '@/domain/user/account/views/SignInPage'
import SignUpPage from '@/domain/user/account/views/SignUpPage'

Vue.use(VueRouter)

const AccountRoutes = [
    {
        path: '/sign-in-page',
        name: 'signInPage',
        component: SignInPage
    },
    {
        path: '/sign-up-page',
        name: 'signUpPage',
        component: SignUpPage
    },
]

export default AccountRoutes