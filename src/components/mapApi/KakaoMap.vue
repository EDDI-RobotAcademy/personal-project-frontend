<template>
  <div class="map-container">
    <div id="kakao-map" class="map"></div>
    <div class="info-box" v-if="selectedMarker">
      <h3 class="title">선택한 아파트</h3>
      <div class="info">
        <p class="info-item">아파트명: {{ selectedMarker.name }}</p>
        <p v-if="selectedMarker.거래금액 && selectedMarker.거래금액.trim() !== ''" class="info-item">거래금액: {{
          selectedMarker.거래금액.trim() }}만원</p>
        <p v-if="selectedMarker.건축년도" class="info-item">건축년도: {{ selectedMarker.건축년도 }}년</p>
        <!-- 기타 필요한 정보들을 여기에 추가하세요. -->
      </div>
    </div>
    <!-- <div v-else>
      <p class="select-info">건물을 선택하여 정보를 확인하세요: {{ selectedMarker }}</p>
    </div> -->
  </div>
</template>

<script>
import axiosInst from '@/utility/axiosInst';
import axios from 'axios';
import { xml2json } from 'xml-js';





export default {
  name: 'KakaoMap',
  data() {
    return {
      map: null,
      markersData: [],
      kakaoApiKey: process.env.VUE_APP_KAKAO_API_KEY,// 여기에 카카오 API 키를 입력해주세요.
      selectedMarker: null, // 클릭한 마커 정보를 저장할 변수를 추가합니다.
    };
  },
  mounted() {
    // 카카오 맵 API 스크립트를 동적으로 로드
    this.loadKakaoMapScript().then(() => {
      this.initKakaoMap();
    });
  },
  methods: {
    loadKakaoMapScript() {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.onload = () => {
            resolve();
          };
          script.onerror = () => {
            reject(new Error('카카오 맵 API를 로드하는데 실패했습니다.'));
          };
          script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${this.kakaoApiKey}&libraries=services`;
          document.head.appendChild(script);
        }
      });
    },
    initKakaoMap() {
      // kakao.maps를 짧은 변수명 kakao로 사용할 수 있도록 설정
      const kakao = window.kakao; // 추가된 코드

      // kakao 객체가 로드된 후에만 사용 가능하도록 체크
      if (kakao && kakao.maps) { // 수정된 코드
        const container = document.getElementById('kakao-map');
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 5,
        };
        this.map = new kakao.maps.Map(container, options);

        // API 키 요청
        this.fetchApiKeys();
      } else {
        console.error('Kakao 맵 API가 로드되지 않았습니다.');
      }
    },
    fetchApiKeys() {
      // 스프링 서버의 '/getApiKey' 엔드포인트로 API 키 요청
      axiosInst.post('/api/getApiKey') // Change 'axios.get' to 'axios.post'
        .then((response) => {
          const apiKey = decodeURIComponent(response.data); // API 키 디코딩
          // const apiKey = response.data; // 서버로부터 받아온 API 키
          console.log("apiKey: " + apiKey)
          this.fetchPublicData(apiKey); // API 키를 인자로 전달하여 공공데이터 포털 API 호출
        })
        .catch((error) => {
          console.error('Error fetching API key:', error);
        });
    },
    //npm install axios xml-js xml & npm install xml2js-> json으로 변환

    geocodeAddress(address) {
      const kakao = window.kakao;
      const geocoder = new kakao.maps.services.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.addressSearch(address, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            if (result.length > 0) {
              const lat = result[0].y; // 위도
              const lng = result[0].x; // 경도
              resolve({ lat, lng });
            } else {
              reject(new Error('지오코딩 결과가 없습니다.'));
            }
          } else {
            reject(new Error('지오코딩에 실패했습니다.'));
          }
        });
      });
    },

    async fetchPublicData(apiKey) {
      const apiUrl = '/api/getRTMSDataSvcAptTradeDev';

      try {
        const response = await axios.get(apiUrl, {
          params: {
            LAWD_CD: '11680',
            DEAL_YMD: '201512',
            ServiceKey: apiKey,
          },
          responseType: 'text', // 'text'로 설정 (XML 데이터를 문자열로 받음)
        });

        console.log("response.data: " + response.data)

        // 루트 노드인 <response> 태그로 감싸주기
        const xmlDataWithRoot = `<response>${response.data}</response>`;

        // XML 데이터를 JSON 형태로 변환
        const jsonData = JSON.parse(xml2json(xmlDataWithRoot, { compact: true, ignoreComment: true, spaces: 4 }));
        console.log("jsonData: ", jsonData); // 변환된 JSON 데이터 확인

        // API 호출 결과 데이터에서 실거래가 정보 추출
        console.log("_text: ", JSON.parse(jsonData.response._text))
        console.log("items: ", JSON.parse(jsonData.response._text).response.body.items)
        console.log("item: ", JSON.parse(jsonData.response._text).response.body.items.item)

        const jsonParseData = JSON.parse(jsonData.response._text).response.body.items.item
        console.log("jsonParseData: " + jsonParseData)

        const dataArray = Array.isArray(jsonParseData) ? jsonParseData : [jsonParseData];
        const promises = dataArray.map(item => this.geocodeAddress(item.도로명 + ' ' + item.도로명건물본번호코드 + '-' + item.도로명건물부번호코드));


        // 데이터 가공하여 this.markersData에 저장
        const geocodedResults = await Promise.all(promises);
        this.markersData = dataArray.map((item, index) => ({
          lat: parseFloat(geocodedResults[index].lat),
          lng: parseFloat(geocodedResults[index].lng),
          name: item.아파트,
          거래금액: item.거래금액,
          건축년도: item.건축년도,
        }));

        // 중심 위치 계산 (위도와 경도의 평균값 계산)
        const totalLat = this.markersData.reduce((sum, item) => sum + item.lat, 0);
        const totalLng = this.markersData.reduce((sum, item) => sum + item.lng, 0);
        const centerLat = totalLat / this.markersData.length;
        const centerLng = totalLng / this.markersData.length;

        // 지도의 중심을 계산된 위치로 설정
        const kakao = window.kakao;
        this.map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));

        // 마커 생성 및 표시
        this.createMarkers();
      } catch (error) {
        console.error('데이터 가져오기 에러:', error);
      }
    },

    // createMarkers() {
    //   const kakao = window.kakao;

    //   this.markersData.forEach((item) => {
    //     // 지오코딩 API를 사용하여 주소를 위도와 경도로 변환
    //     const geocoder = new kakao.maps.services.Geocoder();
    //     geocoder.addressSearch(item.name, (result, status) => {
    //       if (status === kakao.maps.services.Status.OK) {
    //         const lat = result[0].y; // 위도
    //         const lng = result[0].x; // 경도

    //         // 위도와 경도로 마커 생성 및 표시
    //         const marker = new kakao.maps.Marker({
    //           position: new kakao.maps.LatLng(lat, lng),
    //           title: item.name,
    //         });
    //         marker.setMap(this.map);
    //       }
    //     });
    //   });
    // },
    createMarkers() {
      const kakao = window.kakao;

      this.markersData.forEach((item) => {
        // 위도와 경도로 마커 생성 및 표시
        const marker = new kakao.maps.Marker({
          map: this.map, // 기존 코드에서 this.map으로 수정
          position: new kakao.maps.LatLng(item.lat, item.lng),
          title: item.name,
        });

        // 마커를 클릭했을 때 옆에 페이지에 정보를 표시하도록 이벤트 핸들러 추가
        kakao.maps.event.addListener(marker, 'click', () => {
          this.selectedMarker = item; // 클릭한 마커 정보를 selectedMarker에 저장하여 옆에 페이지에 표시
        });
      });
    },
  }
}
</script>

<style>
.map-container {
  width: 100%;
  height: 600px;
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
}

.map {
  width: 100%;
  height: 100%;
}

.info-box {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  z-index: 100;
  color: #333;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #07b02f;
}

.info {
  font-size: 20px;
  color: #555;
}

.info-item {
  margin-bottom: 12px; 
}

.select-info {
  font-size: 20px;
  color: #555;
  font-weight: bold;
}
</style>