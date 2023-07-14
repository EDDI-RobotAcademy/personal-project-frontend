import Vue from 'vue'
import Vuex from 'vuex'
import accountModule from './account/AccountModule'
import BoardModule from './board/BoardModule'
import createPersistedState  from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
    BoardModule: BoardModule
  },
  plugins:[
    createPersistedState()
  ]
})

export default store