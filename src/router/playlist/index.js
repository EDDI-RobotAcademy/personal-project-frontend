import Vue from 'vue'
import VueRouter from 'vue-router'

import PlaylistReadPage from '@/views/playlist/PlaylistReadPage'
import PlaylistRegisterPage from '@/views/playlist/PlaylistRegisterPage'
import PlaylistModifyPage from '@/views/playlist/PlaylistModifyPage'

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
  {
    path: '/playlist-register-page',
    name: 'PlaylistRegisterPage',
    component: PlaylistRegisterPage
  },
  {
    path: '/playlist-modify-page/:id',
    name: 'PlaylistModifyPage',
    components: {
      default: PlaylistModifyPage
    },
    props: {
      default: true
    },
  },
]



export default playlistRoutes