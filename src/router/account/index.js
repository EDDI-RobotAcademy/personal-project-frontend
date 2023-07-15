import Vue from 'vue'
import VueRouter from 'vue-router'

import AccountRegisterPage from '@/views/account/AccountRegisterPage.vue'
import AccountLoginPage from '@/views/account/AccountLoginPage.vue'
import AccountMyPage from '@/views/account/AccountMyPage.vue'
import AccountPasswordCheckPage from '@/views/account/AccountPasswordCheckPage.vue'

Vue.use(VueRouter)

const accountRoutes = [
  {
    path: '/account-register-page',
    name: 'AccountRegisterPage',
    component: AccountRegisterPage
  },
  {
    path: '/account-login-page',
    name: 'AccountLoginPage',
    component: AccountLoginPage
  },
  {
    path: '/account-my-page',
    name: 'AccountMyPage',
    component: AccountMyPage
  },
  {
    path: '/account-password-check-page',
    name: 'AccountPasswordCheckPage',
    component: AccountPasswordCheckPage
  },
]



export default accountRoutes