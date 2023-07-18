<template lang="">
  <v-container >
    <v-card  justify-center width="100%">
    <h2 style="text-align:center" >{{board.writer+" 님의 산책로"}}</h2>
  <div>
    <v-card-text class="mx-auto">
      <form @submit.prevent="onSubmit">
      <table class="mx-auto">
    
        <tr>
        <td>
         <h3 >{{board.boardTitle}}</h3>
        </td>
      </tr> 
      <tr>
        <td style="font-weight: bold">지도</td>
 
        <td ref="map" style="width:500px;height:400px;">
        </td>
      </tr>
      <tr>
        <td style="font-weight: bold">정보</td>
        <td>
          <v-textarea class="inputValue" v-model="board.boardInfo" 
          color="#f18893" readonly/>
        </td>
      </tr>
      <v-btn @click="deleteBoard">삭제</v-btn>
      </table>
      
  </form>
</v-card-text>

</div>
</v-card>
</v-container>

</template>
<script>
import BoardModule from '@/store/board/BoardModule';
import { mapActions } from 'vuex';

const ID=process.env.VUE_APP_KAKAO_ID

export default {
  name:"myBoardReadForm",
  props:{
    board: {
      type:Object,
      required: true
    }
  },
  data() {
        return {
          boardTitle:'',
          boardInfo:'',
          map: null,
          kakao: null,
          coord: '',
          coordLat:'',
          coordLng:'',
          nickName:''
            }
    },
    mounted() {
      this.loadMap();
    },
    methods: {
      ...mapActions("BoardModule", ["requestBoardDeleteToSpring"]),
        onLoad(vue) {
            this.map = vue;
        },
    loadMap() {
      if (!this.kakao) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${ID}`;
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
        center: new this.kakao.maps.LatLng(this.board.coordLat, this.board.coordLng),
        level: 5,
      };
      this.map = new this.kakao.maps.Map(container, options);

      // 마커를 저장할 변수 추가
      const latLng= new this.kakao.maps.LatLng(this.board.coordLat, this.board.coordLng)
    let currentMarker = new this.kakao.maps.Marker({position:latLng});
      currentMarker.setMap(this.map)
      },
      deleteBoard(){
      this.requestBoardDeleteToSpring(this.board.id)
    }
    },
    
  }
</script>
<style lang="">
  
</style>