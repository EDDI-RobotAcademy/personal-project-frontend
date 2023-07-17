import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/community/mutations";
import actions from "@/store/community/actions";
import state from "@/store/community/states";

Vue.use(Vuex);

const communityModule = {
  namespaced: true,
  state,
  actions,
  mutations,
};
export default communityModule;
