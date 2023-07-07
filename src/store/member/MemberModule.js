import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/member/actions"
import mutations from './mutations'
import state from './states'

Vue.use(Vuex)

const MemberModule = {
    namespaced: true,
    actions,
    mutations,
    state
}

export default MemberModule