import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultSetRoutes from '@/domain/page/router'
import AccountRoutes from '@/domain/user/account/router'
import BoardRoutes from '@/domain/board/router'
import StockRoutes from '@/domain/stock/router'


Vue.use(VueRouter)

const routes = [
  ...defaultSetRoutes,
  ...AccountRoutes,
  ...BoardRoutes,
  ...StockRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
