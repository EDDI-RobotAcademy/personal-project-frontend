import Vue from 'vue'
import VueRouter from 'vue-router'

import MyCommentListPage from '@/views/comment/MyCommentListPage.vue'

Vue.use(VueRouter)

const commentRoutes = [
    {
        path: '/my-comment-list-page',
        name: 'MyCommentListPage',
        component: MyCommentListPage
    }

]

export default commentRoutes
