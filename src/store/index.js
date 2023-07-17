import Vue from "vue";
import Vuex from "vuex";
import accountModule from "./account/accountModule";
import noticeModule from "./notice/noticeModule";
import communityModule from "./community/communityModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    accountModule: accountModule,
    noticeModule: noticeModule,
    communityModule: communityModule,
  },
});
