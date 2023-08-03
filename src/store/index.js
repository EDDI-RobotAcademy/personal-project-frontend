import Vue from 'vue'
import Vuex from 'vuex'

import accountModule from '@/store/account/AccountModule'
import productModule from '@/store/product/productModule'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
    productModule: productModule

  },
})


// Vuex 스토어가 초기화되면 로컬 스토리지에서 사용자 정보를 가져옵니다.
store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});
export default store