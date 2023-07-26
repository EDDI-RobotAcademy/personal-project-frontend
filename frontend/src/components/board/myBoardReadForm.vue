<template lang="">
  <v-container >
    <v-card>
  <div>
    <v-card-text class="mx-auto">
      <form @submit.prevent="onSubmit">
      <table class="mx-auto">
    <tr>
      <td>
        <h1 style="text-align:center;margin:auto;padding:10px">{{board.boardTitle}}</h1>
      </td>
      <td>
        <h1>Trail of {{board.writer}}</h1>
      </td>
    </tr>
      
      
      <tr>
        <td>
          <h2>현재 {{weatherInfo}} 섭씨 {{temp}}도 입니다.</h2><br>
          <v-textarea class="inputValue" v-model="board.boardInfo" 
          color="#f18893" readonly/>
        </td>
        <td>
        <img :src="dynamicLink(board.imgPath)" style="max-width: 600px; max-height: 600px;">
        </td>
      </tr>
  <tr>
    <td ref="map" style="text-align:center;width:500px;height:400px;"></td>
    <td><h2>대중 교통 정보</h2>
      <v-textarea class="inputValue" v-model="board.boardTransport" 
          color="#f18893" readonly/>
        </td>
  </tr>
          

      
      </table><v-btn @click="deleteBoard">삭제</v-btn><v-btn @click="modifyBoard(board.id)">수정</v-btn>
      
  </form>
</v-card-text>

</div>
</v-card>
</v-container>

</template>
<script>

import router from '@/router';
import axios from 'axios';
import { mapActions } from 'vuex';
const ID=process.env.VUE_APP_KAKAO_ID
const LINK = process.env.VUE_APP_S3_LINK
const weatherKey=process.env.VUE_APP_WEATHER_KEY
const weather=process.env.VUE_APP_WEATHER_API
export default {
  name:"myBoardReadForm",
  props:{
    board: {
      type:Object,
      required: true
    },
  },
  data() {
        return {
          weatherSrc:'',
          nick:'',
          link:LINK,
          boardTitle:'',
          boardInfo:'',
          map: null,
          kakao: null,
          coord: '',
          coordLat:'',
          coordLng:'',
          nickName:'',
          file: null,
          weatherInfo:'',
        temp:null,
            }
    },
    mounted() {
      this.nick=localStorage.getItem('nickname')
      this.loadMap();
      this.weatherMethod()
      
    },
    methods: {
      ...mapActions("BoardModule", ["requestBoardDeleteToSpring"]),
      weather(key){
        if (key === 'clear' || key === 'few clouds' || key === 'scattered clouds'||key === 'clear sky') {
            return '화창한 날씨입니다.';
          } else if (key === 'broken clouds' || key === 'overcast clouds') {
            return '흐린 날씨입니다.';
          } else if (key === 'shower rain' || key === 'light rain' || key === 'moderate rain' || key === 'Rain') {
            return '비가 오고 있습니다.';
          } else if (key === 'Thunderstorm') {
            return '천둥번개가 칩니다.';
          } else if (key === 'snow') {
            return '눈이 내리고 있습니다.';
          } else if (key === 'mist') {
            return '안개가 짙습니다.';
          } else {
            return '날씨 정보를 가져오지 못했습니다.';
          }
      },
      weatherMethod(){
        let lat=this.board.marker.coordLat
        let lng =this.board.marker.coordLng
        
        axios.get(weather,{
          params:{
            lat:lat,
            lon:lng,
            appid:weatherKey
          }
        })
        .then(res=>{
          this.temp=(res.data.main.temp-273.15).toFixed(1)
          this.weatherInfo=this.weather(res.data.weather[0].description)
          console.log(res.data.weather[0].description)
          
        })
        .catch(error=>{
          console.error(error)
        })
      },
     
        onLoad(vue) {
            this.map = vue;
        }, 
      dynamicLink(extraPath) {
      return `${this.link}/${extraPath}`;
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
      async deleteBoard(){
        if(this.nick==this.board.writer){
          await this.requestBoardDeleteToSpring(this.board.id)
        }
        else{
          alert('삭제 권한이 없습니다.')
        }
        this.router.replace('/myBoardList')
        
      },
      modifyBoard(id){
        if(this.nick==this.board.writer){
          router.push({
          name: 'myWalkBoardModify',
          params: {id}
        })
        }else{
          alert("수정 권한이 없습니다.")
        }
        
      }
    },
    created(){
     
    }
    
  }
</script>
<style lang="">
  
</style>