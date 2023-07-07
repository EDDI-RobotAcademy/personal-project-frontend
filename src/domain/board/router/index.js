import Vue from 'vue'
import VueRouter from 'vue-router'

import BoardRegisterPage from '../views/BoardRegisterPage'
import BoardReadPage from '../views/BoardReadPage'
import BoardModifyPage from '../views/BoardModifyPage'

Vue.use(VueRouter)

const BoardRoutes = [    
    {
        path: '/board-register-page/:ticker',
        name: 'BoardRegisterPage',
        components: { default: BoardRegisterPage },
        props: { default: true}
    },
    {
        path: '/board-read-page/:ticker/:orderNumber',
        name: 'BoardReadPage',
        components: { default: BoardReadPage },
        props: { default: true },
    },
    {
        path: '/board-modify-page/:ticker/:orderNumber',
        name: 'BoardModifyPage',
        components: { default: BoardModifyPage },
        props: { default: true },
    },
]

export default BoardRoutes