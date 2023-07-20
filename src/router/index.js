import Vue from 'vue'
import VueRouter from 'vue-router'

import memberRoutes from './member/index'
import defaultSetRoutes from './defaultRouterSet'
import memberBoardRoutes from './board'
import cafeRoutes from './cafe'
import oauthRoutes from './oauth'
Vue.use(VueRouter)

const routes = [
  ...memberRoutes,
  ...defaultSetRoutes,
  ...memberBoardRoutes,
  ...cafeRoutes,
  ...oauthRoutes

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
