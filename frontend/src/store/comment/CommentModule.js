import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/comment/actions.js"
import states from "@/store/comment/states"
import mutations from '@/store/comment/mutations'

Vue.use(Vuex)

const CommentModule = {
    namespaced: true,
    actions,
    states,
    mutations,

}

export default CommentModule