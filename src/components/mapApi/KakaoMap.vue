<template lang="">
  <div>
    <h2>카카오 맵 보기</h2>
    <div id="map"></div>
  </div>
</template>
<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map:null
    };
  },
  setup() { },
  created() { },
  mounted() { 
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
   },
  unmounted() { },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=	55c5942eae047a5d0b181a2b3e03bb40&autoload=false";
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script); 
    },
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5130398, 126.9488834),
        level: 3,
      };

      this.map = new window.kakao.maps.Map(container, options);

      this.loadMaker() // 지도가 로드되면서 마커가 생성되도록 함수 추가
    },
    loadMaker() {
      // 마커 표시 위치
      const markerPosition = new window.kakao.maps.LatLng(37.5130398, 126.9488834)

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      })

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(this.map)
    }
  },
}
</script>
<style scoped>
#map {
  width: 100%;
  height: 600px;
}
</style>