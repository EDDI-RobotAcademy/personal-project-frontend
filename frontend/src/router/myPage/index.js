import Vue from 'vue'
import VueRouter from 'vue-router'

import MyPage from '@/views/myPage/MyPage.vue'
import MyBoardManage from '@/components/myPage/MyBoardManage.vue'
import MyProfile from '@/components/myPage/MyProfile.vue'
import AdminPage from '@/views/myPage/AdminPage.vue'


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
{
  path:'/admin',
  name:'AdminPage',
  component: AdminPage
}

]

export default myRoutes
