import Vue from 'vue'
import VueRouter from 'vue-router'

import AccountRegisterPage from '@/views/account/AccountRegisterPage.vue'
import AccountLoginPage from '@/views/account/AccountLoginPage.vue'

Vue.use(VueRouter)

const accountRoutes = [
  {
    path: '/account-creation-page',
    name: 'AccountRegisterPage',
    component: AccountRegisterPage
  },
  {
    path: '/account-login-page',
    name: 'AccountLoginPage',
    component: AccountLoginPage
  },
]



export default accountRoutes