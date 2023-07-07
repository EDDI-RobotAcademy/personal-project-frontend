import Vue from 'vue'
import Vuex from 'vuex'

import memberModule from './member/MemberModule'
import boardModule from './board/BoardModule'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    memberModule: memberModule,
    boardModule: boardModule    

  },
})

export default store