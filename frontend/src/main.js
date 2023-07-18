import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import naver from 'vue-naver-maps'
Vue.config.productionTip = false
const ID = process.env.VUE_APP_MY_ID

Vue.use(naver, {
  clientID: ID,
  useGovAPI: false,
  subModules: ''
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
