import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/member/actions"

Vue.use(Vuex)

const MemberModule = {
    namespaced: true,
    actions,
}

export default MemberModule