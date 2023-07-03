import Vue from 'vue'
import VueRouter from 'vue-router'

import AccountRegisterPage from '@/views/account/AccountRegisterPage.vue'
import HomeView from '@/views/HomeView.vue'



Vue.use(VueRouter)

const accountRoutes = [
  { 
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'AccountRegisterPage',
    component: AccountRegisterPage
  },
]

export default accountRoutes