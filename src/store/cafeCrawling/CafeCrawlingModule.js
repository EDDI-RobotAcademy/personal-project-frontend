import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/cafeCrawling/actions"
import mutations from "@/store/cafeCrawling/mutations"
import state from "@/store/cafeCrawling/states"

Vue.use(Vuex)

const CafeCrawlingModule = {
    namespaced: true,
    actions,
    state,
    mutations
}

export default CafeCrawlingModule