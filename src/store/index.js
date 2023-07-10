import Vue from 'vue'
import Vuex from 'vuex'

import NavigationModule from './navigation/NavigationModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    NavigationModule: NavigationModule,
  },
})

export default store