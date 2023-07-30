import Vue from 'vue'
import Vuex from 'vuex'

import accountModule from '@/store/account/AccountModule.js';
import boardModule from '@/store/board/BoardModule.js'
import reviewModule from '@/store/reviewBoard/ReviewModule.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
    boardModule: boardModule,
    reviewModule : reviewModule
  }
})

export default store;