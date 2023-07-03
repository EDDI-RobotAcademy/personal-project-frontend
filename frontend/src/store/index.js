import Vue from 'vue'
import Vuex from 'vuex'
import accountModule from './account/AccountModule'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
  },
})

export default store