<template>
  <v-container>
  <div class="MapDistance">
      <div v-for="(distance, index) in distances" :key="index" :data-idx="index">
        <button
          :class="{ selected: selectedIndex === index }"
          @click="selectDistance(index)"
        >
          <span class="tooltip">{{ distance }}</span>
        </button>
      </div>
  </div>
    <div>
        <div id="map"></div>
    </div>
    <div v-if="articles.length" style="padding-top: 20px;">
      <v-card class="articles_card">
        <ul class="articles_ul">
          <div class="review_space">
            <span class="review">블로그 후기</span>
          </div>  
        <li class="articles_li" v-for="article in articles" :key="article.title" @click="goLink(article.link)">
            <span class="articles_title">[ {{ article.title }} ] <br> </span>
            <span class="articles_description">{{ article.description }} <br></span>
            <p class="articles_name">
              <v-img class="naverblogImg" src="@/assets/icon/naverblog.png" />

              <span class="articles_bloggername">{{ article.bloggername }} <br></span>
            <span class="articles_postdate">{{ article.postdate }} <br></span>
            </p>
          </li>
      </ul>
    </v-card>
    </div>
</v-container>
</template>

<script>
const cafeCrawlingModule='cafeCrawlingModule'
import { mapActions, mapState } from 'vuex';

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:"):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: process.env.VUE_APP_GOOGLE_MAP,
    v: "weekly",
  });
export default {
  data(){
    return{
      distances: ["100m", "300m", "500m", "1km", "2km"],
      selectedIndex: 2,
      map: null,
      placesService: null,
      userMarker: null,
      infoWindow: null,
      markers: [],
      radius: 500,
      center: null,
      articles: [],
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const radius = 500;

      const { Map } = await google.maps.importLibrary("maps");
      this.map = new Map(document.getElementById("map"), {
        center: this.center,
        zoom: 16,
        mapId: "ab5ddca53fad4bc8",
        disableDefaultUI: true
      });

      this.userMarker = new google.maps.Marker({
        position: this.center,
        map: this.map,
        title:"you are here",
      });

      this.userMarker.setIcon(
        "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      );

      this.infoWindow = new google.maps.InfoWindow({
        content: "You are here",
      });

      this.userMarker.addListener("click", () => {
        this.infoWindow.open(this.map, this.userMarker);
      });

      const { pMap } = await google.maps.importLibrary("places");
      this.placesService = new google.maps.places.PlacesService(this.map);

      this.searchCafesWithinRange(this.center, radius);

      const buttons = document.querySelectorAll('.MapDistance button');
      buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const buttonText = event.target.innerText;
          let radius;

          if (buttonText.endsWith('km')) {
            radius = parseInt(buttonText) * 1000;
          } else {
            radius = parseInt(buttonText);
          }

          this.radius = radius;
          this.searchCafesWithinRange(this.center, radius);
        });
      });
    },

    searchCafesWithinRange(center) {
      const request = {
        location: center,
        radius: this.radius,
        types: ["cafe"],
      };

      this.placesService.nearbySearch(request, this.processResults);
    },

    processResults(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.clearMarkers();

        for (let i = 0; i < results.length; i++) {
          const place = results[i];

          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: this.map,
            title: place.name,
            icon: {
              url: require('@/assets/icon/marker.png'),
              scaledSize: new google.maps.Size(40,40)
            }
          });

          this.markers.push(marker);

          marker.addListener("click", () => {
            this.showInfoWindow(place, marker);
            this.getCafeInfo(place.name)
          });
        }
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(this.center);
        for (let i = 0; i < this.markers.length; i++) {
          bounds.extend(this.markers[i].getPosition());
        }
        this.map.fitBounds(bounds);
      }
    },

    clearMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },

    showInfoWindow(place, marker) {
      const content = `
        <div>
          <h4>${place.name}</h4>
          <p>${place.vicinity}</p>
        </div>
      `;
      const infoWindow = new google.maps.InfoWindow({
        content: content,
      });
      
      if (this.infoWindow) {
        this.infoWindow.close();
      }

      this.infoWindow = infoWindow;

      infoWindow.addListener("closeclick", () => {
        this.infoWindow = null; 
        this.articles = []; 
      });

      infoWindow.open(this.map, marker);
    },
    selectDistance(index){
      this.selectedIndex = index
    },
    ...mapActions(
      cafeCrawlingModule, ['sendPlaceName']
    ),
    async getCafeInfo(placeName){
      const receivedData = await this.sendPlaceName(placeName)
      // console.log(Object.keys(a.title))
      const blogs = this.$store.state.blogs
      for(let i=0; i<Object.keys(this.blogs.title).length; i++){
        this.articles.push({
          title: this.blogs.title[i],
          link: this.blogs.link[i],
          description: this.blogs.description[i],
          bloggername: this.blogs.bloggername[i],
          bloggerlink: this.blogs.bloggerlink[i],
          postdate: this.blogs.postdate[i]
        })
      }
    },
    goLink(link){
      window.open(link)
    }
  },
  computed: { 
        ...mapState(cafeCrawlingModule, ['blogs']),
    },
  
};
</script>
<style scoped>
@import '../../components/css/CafeMap.scss';
@import '../../components/css/CafeMapBlogCrawl.scss';
</style>
