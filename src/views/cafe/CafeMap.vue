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
</v-container>
</template>

<script>

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
      center: null
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
      infoWindow.open(this.map, marker);
    },
    selectDistance(index){
      this.selectedIndex = index
    }
  }
};
</script>
<style scoped>
#map{
  height: 450px;
  width: 850px;
  margin: auto;
}
.MapDistance {
display: flex;
justify-content: space-evenly;
width: 850px;
min-height: 40px;
border-top-left-radius: 14px;
border-top-right-radius: 14px;
background-color: rgb(142, 142, 142);
margin: 0 auto;
overflow: hidden;
font-color: white;
}
#button{
background-color: transparent;
border: transparent;
cursor: pointer;
}
.tooltip {
  position: relative;
  display: inline-block;
  cursor: default;
  color: #fff;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}

.tooltip:hover::after {
  opacity: 1;
  visibility: visible;
  top: 20px;
}
.selected {
  background-color: #d1d1d1;
  width: 70px;
  color: #333;
  border-radius: 999px;
  padding: 5px 5px;
  margin: 5px;
}
</style>
