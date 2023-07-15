import Vue from 'vue'
import VueRouter from 'vue-router'

import PlaylistReadPage from '@/views/playlist/PlaylistReadPage'
import PlaylistRegisterPage from '@/views/playlist/PlaylistRegisterPage'
import PlaylistModifyPage from '@/views/playlist/PlaylistModifyPage'
import PlaylistListManagePage from '@/views/playlist/PlaylistListManagePage'
import PlaylistReadManagePage from '@/views/playlist/PlaylistReadManagePage'
PlaylistReadManagePage
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
  {
    path: '/playlist-list-manage-page',
    name: 'PlaylistListManagePage',
    component: PlaylistListManagePage
  },
  {
    path: '/playlist-read-manage-page/:id',
    name: 'PlaylistReadManagePage',
    components: {
      default: PlaylistReadManagePage
    },
    props: {
      default: true
    },
  },
]



export default playlistRoutes