import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/board/actions.js"
import states from "@/store/board/states"
import mutations from '@/store/board/mutations'

Vue.use(Vuex)

const BoardModule = {
    namespaced: true,
    actions,
    states,
    mutations,

}

export default BoardModule