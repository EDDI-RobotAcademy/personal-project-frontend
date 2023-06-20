import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/notice/mutations";
import actions from "@/store/notice/actions";
import state from "@/store/notice/states";

Vue.use(Vuex);

const noticeModule = {
    namespaced: true,
    state,
    actions,
    mutations,
};

export default noticeModule;