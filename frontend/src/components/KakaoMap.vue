<template>
  <div id="app">
    <div ref="map" style="width:100%;height:400px;"></div>
    {{ coord }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      kakao: null,
      coord: ''
    };
  },
  mounted() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      if (!this.kakao) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=185c27ae2c3a87993d3cf6235d2507ba';
        script.async = true;
        script.onload = () => {
          window.kakao.maps.load(() => {
            this.kakao = window.kakao;
            this.initializeMap();
          });
        };
        document.head.appendChild(script);
      } else {
        this.initializeMap();
      }
    },
    initializeMap() {
      const container = this.$refs.map;
      const options = {
        center: new this.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      this.map = new this.kakao.maps.Map(container, options);

      // 마커를 저장할 변수 추가
      let currentMarker = null;

      this.kakao.maps.event.addListener(this.map, 'click', event => {
        const lat = event.latLng.getLat();
        const lng = event.latLng.getLng();
        const latLng = new this.kakao.maps.LatLng(lat, lng);

        // 이전 마커를 지움
        if (currentMarker) {
          currentMarker.setMap(null);
        }

        // 새로운 마커를 생성하고 지도에 표시
        currentMarker = new this.kakao.maps.Marker({ position: latLng });
        currentMarker.setMap(this.map);
        this.coord=latLng
      });
    },
  },
};
</script>
