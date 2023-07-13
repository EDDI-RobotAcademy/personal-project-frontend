import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/song/mutations"
import actions from "@/store/song/actions"
import state from "@/store/song/states"

Vue.use(Vuex)

const songModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default songModule