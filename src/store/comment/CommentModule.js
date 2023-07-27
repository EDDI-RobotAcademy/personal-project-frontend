import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/comment/actions"

Vue.use(Vuex)

const CommentModule = {
    namespaced: true,
    actions,
}

export default CommentModule