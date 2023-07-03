import Vue from 'vue'
import VueRouter from 'vue-router'
import accountRoutes from './account'
import example from '@/views/example.vue'


Vue.use(VueRouter)

const routes = [

...accountRoutes,
{
  path:'/example',
  name: 'example',
  component: example
}

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
