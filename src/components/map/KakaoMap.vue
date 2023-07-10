<template>
  <div ref="map">
  </div>
</template>
<script>
export default {
  props: ["options"],
  methods: {
  },
  mounted() {
    let kakao = window.kakao;
    console.log(this.$refs.map);

    var container = this.$refs.map; //지도를 담을 영역의 DOM 레퍼런스

    const {center, level} = this.options

    const mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level,
    }); //지도 생성 및 객체 리턴
    console.log(mapInstance);

    this.$emit('send-message', mapInstance)
  }
};
</script>
<style>
.kmap {
  width: 600px;
  height: 500px;
  margin: auto;
}
</style>
