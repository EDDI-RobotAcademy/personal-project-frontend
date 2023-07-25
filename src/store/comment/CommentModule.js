import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/comment/mutations"
import actions from "@/store/comment/actions"
import state from "@/store/comment/states"

Vue.use(Vuex)

const CommentModule = {
    namespaced: true,
    state, 
    actions, 
    mutations,
}

export default CommentModule