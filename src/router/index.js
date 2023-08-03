import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LoginPage from '../views/account/LoginPage.vue'
import SignupPage from '../views/account/SignupPage.vue'
import AccountInquiryPage from '../views/AccountInquiryPage.vue'
import KakaoMapPage from '../views/mapApi/KakaoMapPage.vue'
import AccountModifyPage from '../views/account/AccountModifyPage.vue'
import InquiryReadPage from '../views/InquiryReadPage.vue'
import InquiryListPage from '../views/InquiryListPage.vue'
import InquiryRegisterPage from '../views/InquiryRegisterPage.vue'
import InquiryModifyPage from '../views/InquiryModifyPage.vue'
import InquiryPurchaseCheckPage from '../views/InquiryPurchaseCheckPage.vue'
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'mainPage',
    component: MainPage
  },
  {
    path: '/login',
    name: 'loginPage',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'signupPage',
    component: SignupPage
  },
  {
    path: '/service/inquiry',
    name: 'InquiryRegisterPage',
    component: InquiryRegisterPage
  },
  {
    path: '/account/inquiry-list',
    name: 'AccountInquiryPage',
    component: AccountInquiryPage
  },
  {
    path: '/mapApi',
    name: 'KakaoMapPage',
    component: KakaoMapPage
  },
  {
    path: '/account/edit',
    name: 'AccountModifyPage',
    component: AccountModifyPage
  },

  {
    path: "/InquiryReadPage/:id",
    name: "InquiryReadPage",
    components: {
      default: InquiryReadPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/InquiryListPage",
    name: "InquiryListPage",
    component: InquiryListPage,
  },
  {
    path: "/InquiryRegisterPage",
    name: "InquiryRegisterPage",
    component: InquiryRegisterPage,
  },
  {
    path: "/InquiryModifyPage",
    name: "InquiryModifyPage",
    components: {
      default: InquiryModifyPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/InquiryPurchaseCheckPage",
    name: "InquiryPurchaseCheckPage",
    component: InquiryPurchaseCheckPage,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
