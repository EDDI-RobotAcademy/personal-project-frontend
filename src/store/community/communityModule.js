import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/community/mutations";
import state from "@/store/community/states";
import actions from "@/store/community/actions";

Vue.use(Vuex);

const communityModule = {
  namespaced: true,
  state,
  mutations,
  actions,
};
export default communityModule;
