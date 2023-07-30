import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/reviewBoard/mutations"
import actions from "@/store/reviewBoard/actions"
import state from "@/store/reviewBoard/states"

Vue.use(Vuex);
const ReviewModule = {
    namespaced: true,
    state,
    actions,
    mutations,
};

export default ReviewModule;