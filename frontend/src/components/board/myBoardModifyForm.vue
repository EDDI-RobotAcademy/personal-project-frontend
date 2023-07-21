<template lang="">
  <v-container >
    <v-card  justify-center width="100%">
    <h2 style="text-align:center" >{{board.writer+" 님의 산책로 수정 페이지"}}</h2>
  <div>
    
    <v-card-text class="mx-auto">
      <form @submit.prevent="onSubmit">
      <table class="mx-auto">
    
        <tr> <td>산책로 이름</td>
       <td>
            <v-text-field type="text" class="inputValue" 
            v-model="boardTitle" placeholder="변경할 산책로 이름을 입력하세요"/>
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
          <v-textarea class="inputValue" v-model="boardInfo" 
          color="#f18893" />
        </td>
      </tr>
      
      </table>
      <v-btn raised type="submit">완료</v-btn><v-btn @click="cancelModify">취소</v-btn>
  </form>
</v-card-text>

</div>
</v-card>
</v-container>

</template>
<script>
import router from '@/router';
import { mapActions } from 'vuex';

const ID=process.env.VUE_APP_KAKAO_ID

export default {
  name:"myBoardModifyForm",
  props:{
    board: {
      type:Object,
      required: true
    }
  },created(){
    this.boardInfo=this.board.boardInfo
    this.boardTitle=this.board.boardTitle
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
          nickName:'',
          id:0
            }
    },
    mounted() {
      this.loadMap();
    },
    methods: {
      ...mapActions("BoardModule", ["requestBoardDeleteToSpring"]),
      cancelModify(){
        router.push("/myBoardList")
      },
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
        center: new this.kakao.maps.LatLng(this.board.marker.coordLat, this.board.marker.coordLng),
        level: 5,
      };
      this.map = new this.kakao.maps.Map(container, options);

      // 마커를 저장할 변수 추가
      const latLng= new this.kakao.maps.LatLng(this.board.marker.coordLat, this.board.marker.coordLng)
    let currentMarker = new this.kakao.maps.Marker({position:latLng});
      currentMarker.setMap(this.map)
      },
     onSubmit() {
        const { boardTitle, boardInfo}=this
        this.$emit('submit', {boardTitle, boardInfo})
      }
      
    }
  
    
  }
</script>
<style lang="">
  
</style>