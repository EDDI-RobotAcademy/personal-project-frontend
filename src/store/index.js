import Vue from 'vue'
import Vuex from 'vuex'
import accountModule from './account/accountModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    accountModule: accountModule,
  }
})
