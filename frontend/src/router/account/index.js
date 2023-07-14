import Vue from 'vue'
import VueRouter from 'vue-router'

import AccountRegisterPage from '@/views/account/AccountRegisterPage.vue'
import HomeView from '@/views/HomeView.vue'
import AccountLoginPage from '@/views/account/AccountLoginPage.vue'
import exampleAddress from '@/views/account/address/exampleAddress.vue'


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
  {
    path: '/login',
    name: 'AccountLoginPage',
    component: AccountLoginPage

  },
  {
    path:'/exampleAddress',
    name:'exampleAddress',
    component: exampleAddress
  }
]

export default accountRoutes