<template>
  <div>
    <h1>Kakao Map Test</h1>
    <KakaoMap class="kmap" :options="mapOption" @send-message="sendMessage"></KakaoMap>
    <div class="searchbox">
      <div>
        <button @click="searchPlace">수영장 찾기</button>
      </div>
      <div>
        <button>마커 표시</button>
      </div>
      <div class="results">
        <div class="place" v-for="result in search.results" :key="result.id">
          <h5>{{  result.place_name }}</h5>
          <div class="address">{{ result.address_name }}</div>
        </div>
      </div>
    </div>    
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
    }
  },
  methods: {
    sendMessage(data) {
      console.log(data);
      this.mapInstance = data;
    },
    searchPlace(e) { //키워드 검색을 요청하는 함수
      const keyword = "수영장";
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
