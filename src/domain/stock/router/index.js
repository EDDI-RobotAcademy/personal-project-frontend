import Vue from 'vue'
import VueRouter from 'vue-router'

import StockMainPage from '../../stock/views/StockMainPage'


Vue.use(VueRouter)

const StockRoutes = [
    {
        path: '/stock-main-page/:ticker',
        name: 'StockMainPage',
        components: { default: StockMainPage },
        props: {default: true}
    },   
]

export default StockRoutes