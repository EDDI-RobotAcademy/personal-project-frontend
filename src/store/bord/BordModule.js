import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/bord/mutations"
import actions from "@/store/bord/actions"
import state from "@/store/bord/states"

Vue.use(Vuex);
const BordModule = {
    namespaced: true,
    state,
    actions,
    mutations,
};

export default BordModule;