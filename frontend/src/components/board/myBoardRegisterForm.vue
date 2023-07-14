<template lang="">
    <v-container >
      <v-card  justify-center width="100%">
      <h2 style="text-align:center">산책로 등록</h2>
    <div>
      <v-card-text class="mx-auto">
        <form @submit.prevent="onSubmit">
        <table class="mx-auto">
        <tr>
          <td style="font-weight: bold">산책로</td>
  
          <td>
            <v-text-field type="text" class="inputValue" 
            v-model="boardTitle" placeholder="산책로를 입력하세요"/>
          </td>
        </tr> 
        <tr>
          <td style="font-weight: bold">지도</td>
   
          <td ref="map" style="width:500px;height:400px;">
   </td><td> {{ coord }}</td>
        </tr>
        <tr>
          <td style="font-weight: bold">정보</td>
          <td>
            <v-textarea class="inputValue" v-model="boardInfo" 
            color="#f18893" placeholder="산책로의 세부 정보를 입력하세요"/>
          </td>
        </tr>
        <!-- <p></p>
        <tr>
          <td style="font-weight: bold">이미지</td>
          <td>
            <input type="file" id="files" ref="files"
                    multiple @change="handleFileUpload"/>
          </td>
        </tr></br>
        <p></p> -->
        </table>
        <v-btn raised type="submit">등록</v-btn>
        <v-btn @click="goList">취소</v-btn>
    </form>
  </v-card-text>
  </div>
  </v-card>

  </v-container>
  
</template>
<script>
const ID=process.env.VUE_APP_KAKAO_ID
import router from '@/router';

export default {
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
      this.nickName=localStorage.getItem('nickname');
    },
    methods: {
        onLoad(vue) {
            this.map = vue;
        },
        async onSubmit() {
          let formData = new FormData()
          let aboutBoard = {
            boardTitle: this.boardTitle,
            boardInfo: this.boardInfo,
            coordLat: this.coordLat,
            coordLng: this.coordLng,
        writer: this.nickName
      }
      formData.append(
        "aboutBoard",
        new Blob([JSON.stringify(aboutBoard)], { type: "application/json" })
      )

      this.$emit("submit", aboutBoard)
      console.log(aboutBoard)
      await this.$router.push({ name: 'myWalkBoardList' })

    },
    // handleFileUpload() {
    //   this.files = this.$refs.files.files
    // },
    goList(){
        router.push('/myBoardList')
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
        center: new this.kakao.maps.LatLng(37.499012225823975, 127.03284079298378),
        level: 4,
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
        this.coordLat=lat
        this.coordLng=lng
      });
    },
  },
}
</script>
<style lang="css">
.map-container {
  width:  500px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mx-auto{
  text-align: center;
}
td {
        padding: 5px;
        margin-bottom: 10px;
    }
</style>