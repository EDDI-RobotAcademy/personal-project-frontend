<template>
  <div>
    <h1>Kakao Map Test</h1>
    <div class="searchbox">
      <button>현재 지도의 좌표</button>
      <div>
        <input type="text" value="수영장" @keyup.enter="searchPlace"/>
      </div>
      <div class="results">
        <div class="place" v-for="result in search.results" :key="result.id">
          <h5>{{  result.place_name }}</h5>
          <div class="address">{{ result.address_name }}</div>
        </div>
      </div>
    </div>    
    <KakaoMap class="kmap" :options="mapOption" @send-message="sendMessage"></KakaoMap>
  </div>
</template>
<script>
import KakaoMap from '../components/map/KakaoMap.vue'

export default {
  components: {
    KakaoMap
  },
  data() {
    return {
      mapOption:{
        center: { //서울 위도 경도
          lat: 37.566535,
          lng: 126.9779692,
        },
        level : 5,
      },
      search: {
        keyword: null,
        pagination: null,
        results: []
      },
      mapInstance: null
    }
  },
  methods: {
    sendMessage(data) {
      console.log(data);
      this.mapInstance = data;
    },
    searchPlace(e) {
      console.log(e.target.value);//엔터로 검색?
      const keyword = e.target.value.trim();//문자열 좌우에서 공백을 제거
      if (keyword.length === 0) {
        return;
      } //이거 왜함..?
      const ps = new window.kakao.maps.services.Places(); // 장소 검색 객체를 생성합니다
      //const currentMapCoordinate = new kakao.maps.LatLng(37.566535, 126.9779692);
      const currentMapCoordinate = this.mapInstance.getCenter(); // 현재 지도의 중심 좌표 가져오기
      const radius = 10000; // 검색 반경 설정 (단위: 미터)
      ps.keywordSearch(keyword, (data, status, pagination) => {
        console.log(data);
        console.log(status);
        console.log(pagination);

        this.search.keyword = keyword;
        this.search.pagination = pagination;
        this.search.results = data;
      }, {
        location: currentMapCoordinate,
        radius: radius
      }); 
    },
  }
};
</script>
<style>

h5 {
  margin: 1px
}
.address {
  font-size: xx-small;
}
.place {
  margin: 8px;
}
</style>
