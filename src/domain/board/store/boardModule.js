import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import state from './states'
import actions from './actions'

Vue.use(Vuex)

const BoardModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default BoardModule