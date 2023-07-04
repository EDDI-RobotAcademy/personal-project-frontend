import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/domain/page/views/HomeView'

Vue.use(VueRouter)

const defaultSetRoutes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
]

export default defaultSetRoutes