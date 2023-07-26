import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/reviewBord/mutations"
import actions from "@/store/reviewBord/actions"
import state from "@/store/reviewBord/states"

Vue.use(Vuex);
const ReviewModule = {
    namespaced: true,
    state,
    actions,
    mutations,
};

export default ReviewModule;