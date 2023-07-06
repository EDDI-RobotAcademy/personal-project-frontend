import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue';
import LoginPage from '../views/account/LoginPage.vue'
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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
