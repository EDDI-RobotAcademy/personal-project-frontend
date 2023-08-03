import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/account/actions.js"
import mutations from "@/store/account/mutations"
import state from "@/store/account/states"

Vue.use(Vuex)

const AccountModule = {
    actions,
    mutations,
    state,
    namespaced: true
}

export default AccountModule
