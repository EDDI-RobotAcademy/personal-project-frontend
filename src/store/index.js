import Vue from 'vue'
import Vuex from 'vuex'
import memberModule from '@/store/member/MemberModule'
import productModule from '@/store/product/ProductModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    memberModule: memberModule,
    productModule: productModule,
  },
})

export default store