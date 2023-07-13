import Vue from 'vue'
import VueRouter from 'vue-router'

import SongReadPage from '@/views/song/SongReadPage'
import SongRegisterPage from '@/views/song/SongRegisterPage'

Vue.use(VueRouter)

const songRoutes = [
  {
    path: '/song-read-page/:id',
    name: 'SongReadPage',
    components: {
      default: SongReadPage
    },
    props: {
      default: true
    },
  },
  {
    path: '/song-register-page',
    name: 'SongRegisterPage',
    component: SongRegisterPage
  },
]



export default songRoutes