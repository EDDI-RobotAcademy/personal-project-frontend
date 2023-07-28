import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/comment/actions"
import mutations from './mutations'
import state from './states'

Vue.use(Vuex)

const CommentModule = {
    namespaced: true,
    actions,
    mutations,
    state
}

export default CommentModule