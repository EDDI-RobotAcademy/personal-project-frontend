import boardModule from '@/domain/board/store/boardModule'
import stockModule from '@/domain/stock/store/stockModule'
import accountModule from '@/domain/user/account/store/AccountModule'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    accountModule: accountModule,
    boardModule: boardModule,
    stockModule: stockModule
  },
})
