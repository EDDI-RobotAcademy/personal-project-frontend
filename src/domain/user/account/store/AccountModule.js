import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import states from './states'
import mutations from './mutations'

Vue.use(Vuex)

const accountModule = {
    namespaced: true,
    actions,
    states,
    mutations,
}

export default accountModule