import Vue from 'vue'
import Vuex from 'vuex'

import accountModule from './account/accountModule'
import songModule from './song/SongModule'
import playlistModule from './playlist/PlaylistModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
    playlistModule: playlistModule,
    songModule: songModule,
  },
})

export default store