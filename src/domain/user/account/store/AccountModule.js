import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'

Vue.use(Vuex)

const accountModule = {
    namespaced: true,
    actions,
}

export default accountModule