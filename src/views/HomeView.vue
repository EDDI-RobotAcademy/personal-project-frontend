<template>
  <v-container fluid style="position: relative; text-align: center; padding-top: 0;">
    <v-row>
      <v-img :src="require('../assets/main/main.jpg')"
          width="100vw" height="400" ratio="1">
          <div> 
            <p class="invite"> 당신을 위한 <br><span style="font-size: 1.5em">{{ your_location }}</span> 추천 카페</p>
          </div>
          <v-btn @click="getLocation" class="mylocation" style="border-radius: 16px;"><v-icon> mdi-crosshairs-gps</v-icon> 내 위치중심</v-btn></v-img>
    </v-row>
    <v-col>
      
      <!-- <div class="BodyBox">
        <section class="card_section">
          <h1 class="card_section_title">#테라스</h1>
          <div class="a">
            <ul class="card_list">
              <li class="item1">
                  <div class="sc-hnmMDg jjkSyj sc-kGLCOL bsDcBK">
                    <div class="distance_tag">
                      <span>422m</span>
                    </div>
                    https://d12zq4w4guyljn.cloudfront.net/750_750_20221209050618700_photo_c2f5e0670740.jpg
                    <img class="Restaurant__Card__Img" sizes="238px" srcset="" src="../assets/cafe/cafe1.jpg" alt="" width="238" height="238" loading="lazy" style="opacity: 1;">
                    </div>
                </li>
            </ul>   
          </div>
        </section>
      </div> -->
    
      <div class="BodyBox">
        <section class="card_section">
          <h1 class="card_section_title">#가성비</h1>
          <VueperSlides
            class="no-shadow"
            :visible-slides="5"
            slide-multiple
            :gap="2"
            :slide-ratio="1 / 5"
            :dragging-distance="200"
            :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
            <VueperSlide v-for="(slide, i) in slides" :key="i" :image="slide.image">
          <template #content>
            <div class="slide_content_text">
                <h4>{{ slide.content }}</h4>            
            </div>
          </template>
            </VueperSlide>
          </VueperSlides>
        </section>
      </div>

      <div class="BodyBox">
        <section class="card_section">
          <h1 class="card_section_title">#아인슈페너</h1>
          <VueperSlides
            class="no-shadow"
            :visible-slides="5"
            slide-multiple
            :gap="2"
            :slide-ratio="1 / 5"
            :dragging-distance="200"
            :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
            <VueperSlide v-for="(slide, i) in slides" :key="i" :image="slide.image">
          <template #content>
            <div class="slide_content_text">
                <h4>{{ slide.content }}</h4>            
            </div>
          </template>
            </VueperSlide>
          </VueperSlides>
        </section>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios'
import {VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
  
  export default {
    name: 'Home',
    data(){
      return{
        your_location: '',
        slides: [
                    {
                        title: 'El Teide Volcano, Spain',
                        content: 'Photo by Max Rive',
                        image: require('@/assets/cafe/cafe1.jpg')
                    },
                    {
                        title: 'El Teide Volcano, Spain',
                        content: 'Photo by Max Rive',
                        image: require('@/assets/cafe/cafe1.jpg')
                    },
                    {
                        title: 'El Teide Volcano, Spain',
                        content: 'Photo by Max Rive',
                        image: require('@/assets/cafe/cafe1.jpg')
                    },
                    {
                        title: 'El Teide Volcano, Spain',
                        content: '사진이야',
                        image: require('@/assets/cafe/cafe1.jpg')
                    },
                    {
                        title: 'El Teide Volcano, Spain',
                        content: '오예',
                        image: require('@/assets/cafe/cafe1.jpg')
                    },
                    {
                        title: 'El Teide Volcano, Spain',
                        content: '조여울',
                        image: require('@/assets/cafe/cafe1.jpg')
                    },
                    ]           
      }
    },
    methods:{
      async getLocation(){
        let pos = {}
        await navigator.geolocation.getCurrentPosition((position)=>{
          pos.lat = position.coords.latitude
          pos.lng = position.coords.longitude
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${process.env.VUE_APP_GOOGLE_MAP}&language=ko&result_type=street_address`)
        .then((res)=>{
          let address = res.data.results[0].address_components[1].long_name
          this.your_location=address
        })
        }, ()=>{}, {enableHighAccuracy:true, maximumAge: 300000, timeout:27000})
        
      }
    },
    components: 
      { VueperSlides, VueperSlide },
    mounted(){
      this.getLocation()
    }
  }
</script>
<style scoped>
.invite{
  position: absolute; 
  top: 45%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  color: rgb(246, 255, 250);
  font-size: 30px;
  font-weight: bold;
  /* background-color: rgba(54, 53, 53, 0.5); */
  padding: 20px;
}

.mylocation{
  top: 65%; 
}
.card_section_title{
  text-align: left;
  padding: 10px;
}
.a{
  height: 300px;
  width: 1100px;
  background-color: #ffffff;
  border-top: black;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: 0px;
  padding: 0;
}

.BodyBox{
  background-color: #f0f0f0;
  border: black;
  border-radius: 20px;
  width: 1100px;
  margin: 0 auto;
  margin-top: 25px;
}

.distance_tag{
  position: absolute;
  top: 8px;
  left: 8px;
  grid-auto-flow: column;
  align-items: center;
  min-height: 28px;
  column-gap: 5px;
  padding: 2.5px 8px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.48);
}

.picture_position{
  position: relative;
    user-select: none;
    display: flex;
    align-items: flex-end;
    background-size: cover;
    cursor: pointer;
    width: 238px;
    height: 238px;
    border-radius: 14px;
    overflow: hidden;
    z-index: 30;
}

.card_list {
  display: flex;
  
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.card_list li {
  flex: 0 0 calc(20% - 10px); 
  list-style-type: none;
  margin-right: 15px; 
}
.slide_content_text{
  width: auto; 
  height: 20%; 
  background-color: rgba(54, 53, 53, 0.5); 
  border-bottom-left-radius: 14px;
  margin-left: 20%;
}
.slide_content_text h4
{
  position: absolute; 
  top: 4%;
  right: 10%
}
</style>
