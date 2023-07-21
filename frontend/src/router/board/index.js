import Vue from 'vue'
import VueRouter from 'vue-router'

import myWalkBoardList from '@/views/board/myWalk/myWalkBoardList.vue'
import myWalkBoardRead from '@/views/board/myWalk/myWalkBoardRead.vue'
import myBoardRegister from '@/views/board/myWalk/myWalkBoardRegister.vue'
import myWalkBoardModify from '@/views/board/myWalk/myWalkBoardModify.vue'


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

  },
  {
    path:'/myWalkBoardModify/:id',
    name:'myWalkBoardModify',
    components:{
      default:myWalkBoardModify
    },
    props:{
      default:true
    }
  }
]

export default boardRoutes