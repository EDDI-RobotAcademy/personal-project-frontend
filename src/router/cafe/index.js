import Vue from 'vue'
import VueRouter from 'vue-router'

import CafeMap from '@/views/cafe/CafeMap.vue'

Vue.use(VueRouter)

const cafeRoutes = [
    {
        path: '/cafe-map-page',
        name: 'CafeMap',
        component: CafeMap
    },

]

export default cafeRoutes
