import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

// Kakao 지도 스크립트 동적 로드
// const kakaoApiKey = process.env.VUE_APP_KAKAO_API_KEY;
// const kakaoMapScript = document.createElement('script');
// kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services`;
// kakaoMapScript.onload = () => {

if (localStorage.getItem('store')) {
  store.replaceState(JSON.parse(localStorage.getItem('store')));
}
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
// };
// document.head.appendChild(kakaoMapScript);
