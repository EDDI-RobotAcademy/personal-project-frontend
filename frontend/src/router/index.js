import Vue from 'vue'
import VueRouter from 'vue-router'
import accountRoutes from './account'
import mapRoutes from './map'
import boardRoutes from './board'
import AwsSdkFileUpload from '@/views/AwsSdkFileUpload.vue'
import s3Example from '@/views/s3Example.vue'
import myRoutes from './myPage'

Vue.use(VueRouter)

const routes = [

...accountRoutes,
...mapRoutes,
...boardRoutes,
...myRoutes,
{
  path:'/AwsSdkFileUpload',
  name:'AwsSdkFileUpload',
  component:AwsSdkFileUpload

},
{
  path:'/s3Example',
  name:'s3Example',
  component:s3Example
}

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
