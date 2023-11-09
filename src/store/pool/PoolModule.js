import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/pool/mutations"
import actions from "@/store/pool/actions"
import state from "@/store/pool/states"

Vue.use(Vuex);
const PoolModule = {
    namespaced: true,
    state,
    actions,
    mutations,
};

export default PoolModule;