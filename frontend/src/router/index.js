import Vue from 'vue'
import VueRouter from 'vue-router'
import accountRoutes from './account'
import mapRoutes from './map'


Vue.use(VueRouter)

const routes = [

...accountRoutes,
...mapRoutes,

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
