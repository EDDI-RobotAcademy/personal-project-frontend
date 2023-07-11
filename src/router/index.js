import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue';
import LoginPage from '../views/account/LoginPage.vue'
import SignupPage from '../views/account/SignupPage.vue'
import ServiceInquiryPage from '../views/ServiceInquiryPage.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'mainPage',
    component: MainPage
  },
  {
    path: '/login',
    name: 'loginPage',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'signupPage',
    component: SignupPage
  },
  {
    path: '/service/inquiry',
    name: 'serviceInquiryPage',
    component: ServiceInquiryPage
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
