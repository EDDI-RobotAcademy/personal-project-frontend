import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/playlist/mutations"
import actions from "@/store/playlist/actions"
import state from "@/store/playlist/states"

Vue.use(Vuex)

const playlistodule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default playlistodule