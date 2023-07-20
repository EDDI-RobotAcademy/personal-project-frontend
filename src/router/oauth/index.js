import Vue from 'vue'
import VueRouter from 'vue-router'

import KakaoSignUpPage from '@/views/oauth/KakaoSignUpPage.vue'

Vue.use(VueRouter)

const oauthRoutes = [
    {
      path: '/kakao/login',
      name: 'KakaoLoginPage',
      component: KakaoSignUpPage
    },

]


export default oauthRoutes
