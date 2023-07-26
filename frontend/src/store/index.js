import Vue from 'vue'
import Vuex from 'vuex'
import accountModule from './account/AccountModule'
import BoardModule from './board/BoardModule'
import createPersistedState  from 'vuex-persistedstate'
import MapModule from './map/MapModule'
import ProfileModule from './profile/ProfileModule'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
    BoardModule: BoardModule,
    MapModule: MapModule,
    ProfileModule: ProfileModule
  },
  plugins:[
    createPersistedState()
  ]
})

export default store