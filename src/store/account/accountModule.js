import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/account/actions"
import mutations from './mutations'
import state from './states'

Vue.use(Vuex)

const AccountModule = {
    namespaced: true,
    actions,
    mutations,
    state
}

export default AccountModule