<template>
    <div id="app">
      <div id="map"></div>
    </div>
  </template>
  
  <script>
  export default {
      mounted() {
          if (window.kakao && window.kakao.maps) {
              this.initMap();
          } else {
              const script = document.createElement('script');
              /* global kakao */
              script.onload = () => kakao.maps.load(this.initMap);
              script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=185c27ae2c3a87993d3cf6235d2507ba';
              document.head.appendChild(script);
          }
      },
      methods: {
          initMap() {
              let container = document.getElementById('map');
              let options = {
                center: new kakao.maps.LatLng(37.649734,127.114739,),
                level: 3
              };
  
              let map = new kakao.maps.Map(container, options);
              map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
          }
      }
  }
  </script>
  
  <style>
  #map {
      width: 800px;
      height: 600px;
  }
  </style>