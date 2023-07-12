import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import memberModule from './member/MemberModule'
import boardModule from './board/BoardModule'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    memberModule: memberModule,
    boardModule: boardModule    

  },
  plugins: [createPersistedState({
    paths: ["memberModule",]
  })]
})

export default store