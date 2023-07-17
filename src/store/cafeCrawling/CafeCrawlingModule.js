import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/cafeCrawling/actions"

Vue.use(Vuex)

const CafeCrawlingModule = {
    namespaced: true,
    actions,
}

export default CafeCrawlingModule