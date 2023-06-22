import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const defaultSetRoutes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
]

export default defaultSetRoutes