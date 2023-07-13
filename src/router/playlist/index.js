import Vue from 'vue'
import VueRouter from 'vue-router'

import PlaylistReadPage from '@/views/playlist/PlaylistReadPage'

Vue.use(VueRouter)

const playlistRoutes = [
  {
    path: '/playlist-read-page/:id',
    name: 'PlaylistReadPage',
    components: {
      default: PlaylistReadPage
    },
    props: {
      default: true
    },
  },
]



export default playlistRoutes