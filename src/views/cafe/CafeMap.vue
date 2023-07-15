<template>
  <v-container>
  <div class="sc-fsYeqs huXbdS MapDistance">
    <div data-idx="0">
      <button aria-label="select map distance" class="" data-idx="0">100m</button>
    </div>
    <div data-idx="1">
      <button aria-label="select map distance" class="" data-idx="1">300m</button>
    </div>
      <div data-idx="2">
        <button aria-label="select map distance" class="selected" data-idx="2">500m</button>
      </div>
      <div data-idx="3">
        <button aria-label="select map distance" class="" data-idx="3">1km</button>
      </div>
      <div data-idx="4">
        <button aria-label="select map distance" class="" data-idx="4">2km</button>
      </div>
      <div data-idx="5">
        <button aria-label="select map distance" class="" data-idx="5">3km</button>
      </div>
      <div data-idx="6">
        <button aria-label="select map distance" class="" data-idx="6">5km</button>
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
      map: null,
      placesService: null,
      userMarker: null,
      infoWindow: null,
      markers: [],
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
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const radius = 500;

      const { Map } = await google.maps.importLibrary("maps");
      this.map = new Map(document.getElementById("map"), {
        center: center,
        zoom: 16,
        mapId: "ab5ddca53fad4bc8",
      });

      this.userMarker = new google.maps.Marker({
        position: center,
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

      this.searchCafesWithinRange(center, radius);
    },

    searchCafesWithinRange(center, radius) {
      const request = {
        location: center,
        radius: radius,
        types: ["cafe"],
      };

      this.placesService.nearbySearch(request, this.processResults);
    },

    processResults(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Clear previous markers
        this.clearMarkers();

        // Create markers for each cafe found
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

          // Store the marker in the markers array
          this.markers.push(marker);

          // Add click event listener to show info window
          marker.addListener("click", () => {
            this.showInfoWindow(place, marker);
          });
        }
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
  },
};
</script>
<style scoped>
#map{
  height: 450px;
  width: 850px;
  margin: auto;
}
.huXbdS {
display: flex;
justify-content: space-evenly;
width: 850px;
min-height: 40px;
border-top-left-radius: 14px;
border-top-right-radius: 14px;
background-color: rgb(142, 142, 142);
margin: 0 auto;
}
#button{
background-color: transparent;
border: transparent;
cursor: pointer;
}
</style>
