import Vue from 'vue'
import VueRouter from 'vue-router'

import SongReadPage from '@/views/song/SongReadPage'

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
]



export default songRoutes