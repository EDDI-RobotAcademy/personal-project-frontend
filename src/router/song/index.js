import Vue from 'vue'
import VueRouter from 'vue-router'

import SongReadPage from '@/views/song/user/SongReadPage'
import SongRegisterPage from '@/views/song/manage/SongRegisterPage'
import SongModifyManagePage from '@/views/song/manage/SongModifyManagePage'
import SongReadManagePage from '@/views/song/manage/SongReadManagePage'

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
    path: '/song-modify-manage-page/:id',
    name: 'SongModifyManagePage',
    components: {
      default: SongModifyManagePage
    },
    props: {
      default: true
    },
  },
  {
    path: '/song-read-manage-page/:id',
    name: 'SongReadManagePage',
    components: {
      default: SongReadManagePage
    },
    props: {
      default: true
    },
  },
]



export default songRoutes