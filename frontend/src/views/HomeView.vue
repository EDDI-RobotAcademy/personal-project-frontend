<template>
  <div id="app">
    <div id="map" style="width: 1000px; height: 1000px;"></div>
  </div>
</template>

<script>
import router from '@/router';
import { mapActions, mapState } from 'vuex';
const MapModule='MapModule'
const ID=process.env.VUE_APP_KAKAO_ID
export default {
  computed:{
    ...mapState(MapModule,['markers'])
  },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${ID}`;
            document.head.appendChild(script);
        }
    },
    methods: {
        ...mapActions(MapModule,['requestMarkerListToSpring']),
        initMap() {
            let container = document.getElementById('map');
            let options = {
              center: new kakao.maps.LatLng(37.541,126.986),
              level: 9
            };

            let map = new kakao.maps.Map(container, options);
            map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
            this.markers.forEach(marker => {
    const latLng = new kakao.maps.LatLng(marker.coordLat, marker.coordLng);
    let currentMarker = new kakao.maps.Marker({ position: latLng });
    currentMarker.setMap(map);
    kakao.maps.event.addListener(currentMarker, 'click', () => {
    router.push({ name: 'myWalkBoardRead', params: { id: marker.id } });
  });
  });

        },
    },
    async created(){
      await this.requestMarkerListToSpring();
    }
}
</script>

<style>
#map {
    width: 1000px;
    height: 1000px;
}
</style>