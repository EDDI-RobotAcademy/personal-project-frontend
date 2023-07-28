import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "./plugins/vuetify";
import vuetify from './plugins/vuetify'
// import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  router,
  store,

  // vuetify를 올바른 옵션으로 등록해야 합니다.
  vuetify: Vuetify,

  vuetify,
  render: (h) => h(App)
}).$mount("#app");