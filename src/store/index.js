import Vue from "vue";
import Vuex from "vuex";
import accountModule from "./account/accountModule";
import noticeModule from "./notice/noticeModule";
import communityModule from "./community/communityModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    accountModule: accountModule,
    noticeModule: noticeModule,
    communityModule: communityModule,
  },
});

export default store;
