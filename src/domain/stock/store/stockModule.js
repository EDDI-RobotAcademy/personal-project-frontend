import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import state from './states'

Vue.use(Vuex)

const stockModule = {
    namespaced: true,
    actions,
    mutations,
    state
}

export default stockModule