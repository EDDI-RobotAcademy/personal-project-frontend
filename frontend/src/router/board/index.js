import Vue from 'vue'
import VueRouter from 'vue-router'

import myWalkBoardList from '@/views/board/myWalk/myWalkBoardList.vue'
import myWalkBoardRead from '@/views/board/myWalk/myWalkBoardRead.vue'
import myBoardRegister from '@/views/board/myWalk/myWalkBoardRegister.vue'


Vue.use(VueRouter)

const boardRoutes = [
  { 
    path: '/myBoardList',
    name: 'myWalkBoardList',
    component: myWalkBoardList
  },
  { 
    path: '/myWalkBoardRead/:id',
    name: 'myWalkBoardRead',
    components: {
      default: myWalkBoardRead
    },
    props:{
      default:true
    }
  },
  {
    path: '/myBoardRegister',
    name:'myBoardRegister',
    component: myBoardRegister

  }
]

export default boardRoutes