<template>
  <div>
    <h1>Kakao Map Test</h1>
    <div id="map"></div>
  </div>
</template>
<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      places: null,
      searchOption: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
      this.searchPlace();
      this.displayMarker();
    } else {
      this.loadScript();
    }
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=1cc5c406470802ce59b1e357bacf3336&libraries=LIBRARY&autoload=false";
      script.onload = () => window.kakao.maps.load(this.loadMap);
      document.head.appendChild(script);
    },
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.564968, 126.939909),
        level: 3,
      };

      this.map = new window.kakao.maps.Map(container, options);
    },
    searchCallbackFunction(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);
      }
    },
    searchPlace() {
      this.places = new kakao.maps.services.Places(this.map);
      places.keywordSearch("수영장", searchCallbackFunction, {
        location: new kakao.maps.LatLng(37.564968, 126.939909),
      });
    },
    displayMarker() {
      kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(33.450701, 126.570667),
      });
    },
  },
};
</script>
<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
