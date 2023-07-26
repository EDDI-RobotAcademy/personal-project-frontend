import Vue from 'vue'
import VueRouter from 'vue-router'

import MyPage from '@/views/myPage/MyPage.vue'
import MyBoardManage from '@/views/myPage/MyBoardManage.vue'
import MyProfile from '@/views/myPage/MyProfile.vue'


Vue.use(VueRouter)

const myRoutes = [
{
  path: '/MyPage',
    name: 'MyPage',
    component: MyPage

},
{
  path: '/MyBoardManage',
    name: 'MyBoardManage',
    component: MyBoardManage

},
{
  path: '/MyProfile',
    name: 'MyProfile',
    component: MyProfile

},

]

export default myRoutes
