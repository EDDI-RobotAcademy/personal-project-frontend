import Vue from 'vue'
import VueRouter from 'vue-router'

import makeMarker from '@/views/map/makeMarker.vue'
import example from '@/views/map/example.vue'

Vue.use(VueRouter)

const mapRoutes = [
{
  path: '/marker',
    name: 'makeMarker',
    component: makeMarker

},
{
  path: '/example',
    name: 'example',
    component: example

}
]

export default mapRoutes
