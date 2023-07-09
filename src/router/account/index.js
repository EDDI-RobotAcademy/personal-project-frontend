import Vue from 'vue'
import VueRouter from 'vue-router'

import AccountRegisterPage from '@/views/account/AccountRegisterPage.vue'

Vue.use(VueRouter)

const accountRoutes = [
  {
    path: '/account-creation-page',
    name: 'AccountRegisterPage',
    component: AccountRegisterPage
  },
]



export default accountRoutes