import Vue from 'vue'
import Vuex from 'vuex'

import accountModule from '@/store/account/AccountModule.js';
import bordModule from '@/store/bord/BordModule.js'
import reviewModule from '@/store/reviewBord/ReviewModule.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
    bordModule: bordModule,
    reviewModule : reviewModule
  }
})

export default store;