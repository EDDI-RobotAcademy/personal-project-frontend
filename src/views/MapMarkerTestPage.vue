<template lang="">
    <div>
        <NaviTest/>
        <div style="padding-top: 90px">
            <div style="position: relative; z-index:3">
                <!-- 미니창박스 -->
                <MiniWindow v-if="popState" @close="changePopState()" v-bind:placeData="this.placeData"></MiniWindow>
            </div>        
            <div class="map_wrap" style="position: relative; z-index:1;">
                <!-- 지도박스 -->
                <div id="map" ref="map" style="width: 600px; height: 500px; margin: auto; overflow: hidden;"></div>
                
                <!-- 메뉴박스 -->
                <div id="menu_wrap" class="bg_white">
                    <div class="option" style="padding-top:10px;">
                        <div>
                            <form @submit.prevent="searchPlaces">
                                <div class="row">
                                    <div class="col-sm-4"></div>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="keyword" style="width: 90%; margin: auto;">
                                    </div>
                                    <div class="col-sm-4"></div>
                                </div>

                                <div class="row" style="padding-top:10px;">
                                    <div class="col-sm-5"></div>
                                    <div class="col-sm-2">
                                        <button type="submit" class="btn btn-outline-primary" style="margin-left: 20%;">검색하기</button> 
                                    </div>
                                    <div class="col-sm-5"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6">
                            <ul id="placesList" style="list-style: none; padding-inline-start: 10%">
                                <li style="margin: 10px;" v-for="(place, index) in places" :key="index" @mouseover="onMouseOver(index)" @mouseout="onMouseOut">
                                    <!-- index+1로 클래스명 지정 -->
                                    <span :class="`markerbg marker_${index + 1}`"></span> 
                                    <div class="info">
                                        <h5>{{ place.place_name }}</h5>
                                        <span v-if="place.road_address_name">{{ place.road_address_name }}</span>
                                        <span class="jibun gray">{{ place.address_name }}</span>
                                        <br/>
                                        <span class="tel">{{ place.phone }}</span>
                                    </div>
                                </li>
                            </ul>
                            <div id="pagination" style="padding-inline-start: 50%"">
                                <a v-for="pageNum in pagination.last" :key="pageNum" :class="{ on: pageNum === pagination.current }" @click="gotoPage(pageNum)">
                                    {{ pageNum }}
                                </a>
                            </div>                            
                        </div>
                        <div class="col-sm-3"></div>
                    </div>
                </div>
            </div>        
        </div>
    </div>
</template>
<script>
import MiniWindow from '@/components/map/MiniWindow.vue'
import NaviTest from '@/components/NaviTest.vue'
import { mapActions } from 'vuex';

const poolModule = 'poolModule'
export default {
    components: {
        MiniWindow,
        NaviTest
    },
    data() {
        return {
            map: null,
            markers: [],
            keyword: "수영장",
            places: [],
            pagination: {},
            infowindow: new window.kakao.maps.InfoWindow({ zIndex: 1 }),
            place_url: {},


            //미니창 상태를 관리할 변수
            popState: false,
            placeData: {},
            title: [],
            place_url: []
        };
    },
    mounted() {
        const mapContainer = this.$refs.map;// 지도를 표시할 div 
        const mapOption = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),// 지도의 중심좌표
            level: 3,
        };
        this.map = new window.kakao.maps.Map(mapContainer, mapOption);// 지도를 생성합니다    
        this.searchPlaces();// 키워드로 장소를 검색합니다
    },
    methods: {
        ...mapActions(
            poolModule, ['requestStarAvg']
        ),
        searchPlaces() {// 키워드 검색을 요청하는 함수
            const keyword = this.keyword.trim();
            if (!keyword) {
                alert("키워드를 입력해주세요!");
                return;
            }
            const ps = new window.kakao.maps.services.Places();
            const currentMapCoordinate = this.map.getCenter();
            const radius = 10000;
            // 장소검색 객체를 통해 키워드로 장소검색을 요청
            ps.keywordSearch(keyword, this.placesSearchCB, {
                location: currentMapCoordinate,
                radius: radius
            });
        },
        placesSearchCB(data, status, pagination) {// 장소검색이 완료됐을 때 호출되는 콜백함수
            if (status === window.kakao.maps.services.Status.OK) {// 정상적으로 검색이 완료됐으면
                this.places = data;
                this.displayPlaces();// 검색 목록과 마커를 표출합니다
                this.pagination = pagination;
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                alert("검색 결과가 존재하지 않습니다.");
            } else if (status === window.kakao.maps.services.Status.ERROR) {
                alert("검색 결과 중 오류가 발생했습니다.");
            }
            console.log(data);
        },
        displayPlaces() {// 검색 결과 목록과 마커를 표출하는 함수
            const bounds = new window.kakao.maps.LatLngBounds();
            this.removeMarker();// 지도에 표시되고 있는 마커를 제거

            this.places.forEach((place, index) => {
                // 마커를 생성하고 지도에 표시합니다
                const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
                const marker = this.addMarker(placePosition, index);
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                this.attachMarkerEvents(marker, place.place_name, place.place_url);
            });
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정
            this.map.setBounds(bounds);
        },
        addMarker(position, index) {// 마커를 생성하고 지도 위에 마커를 표시하는 함수
            // 마커 이미지 url, 스프라이트 이미지를 사용
            const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
            const imageSize = new window.kakao.maps.Size(36, 37);// 마커 이미지의 크기
            const imgOptions = {
                spriteSize: new window.kakao.maps.Size(36, 691),// 스프라이트 이미지의 크기
                spriteOrigin: new window.kakao.maps.Point(0, index * 46 + 10),// 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new window.kakao.maps.Point(13, 37),// 마커 좌표에 일치시킬 이미지 내에서의 좌표
            };
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
            const marker = new window.kakao.maps.Marker({
                position,// 마커의 위치
                image: markerImage,
            });

            marker.setMap(this.map);// 지도 위에 마커를 표출
            this.markers.push(marker);// 배열에 생성된 마커를 추가

            return marker;
        },
        attachMarkerEvents(marker, title, place_url) {
            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            window.kakao.maps.event.addListener(marker, "mouseover", () => {
                this.displayInfowindow(marker, title);
            });
            // mouseout 했을 때는 인포윈도우를 닫습니다
            window.kakao.maps.event.addListener(marker, "mouseout", () => {
                this.infowindow.close();
            });
            // click 했을 때는 미니윈도우를 토글
            window.kakao.maps.event.addListener(marker, "click", () => {
                this.changePopState();
                this.placeData = { title, place_url };
                this.requestStarAvg(this.placeData.title)
            });
        },
        // 지도 위에 표시되고 있는 마커를 모두 제거
        removeMarker() {
            this.markers.forEach((marker) => marker.setMap(null));
            this.markers = [];
        },
        displayInfowindow(marker, title) {
            const content = `<div style="padding:5px;">${title}</div>`;
            this.infowindow.setContent(content);
            this.infowindow.open(this.map, marker);
        },
        onMouseOver(index) {
            this.displayInfowindow(this.markers[index], this.places[index].place_name);
        },
        onMouseOut() {
            this.infowindow.close();
        },
        gotoPage(pageNum) {
            this.pagination.gotoPage(pageNum);
        },
        changePopState() { //미니창 토글
            this.popState = !this.popState;
        }
    }

}
</script>
<style>
/* #map {
        margin-top: 50px;
    } */
</style>