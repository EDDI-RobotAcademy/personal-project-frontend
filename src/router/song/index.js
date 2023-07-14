import Vue from 'vue'
import VueRouter from 'vue-router'

import SongReadPage from '@/views/song/SongReadPage'
import SongRegisterPage from '@/views/song/SongRegisterPage'
import SongModifyPage from '@/views/song/SongModifyPage'

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
    path: '/song-register-page/:playlistId',
    name: 'SongRegisterPage',
    components: {
      default: SongRegisterPage,
    },
    props: {
      default: true
    }
  },
  {
    path: '/song-modify-page/:id',
    name: 'SongModifyPage',
    components: {
      default: SongModifyPage
    },
    props: {
      default: true
    },
  },
]



export default songRoutes