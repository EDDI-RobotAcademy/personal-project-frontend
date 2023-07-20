<template>
  <v-container>
    <v-row>
      <v-col>
    <div>
        <v-app-bar class="nav" 
      app
      elevation="1"
      color="grey lighten-5"
      >
      <div class="d-flex align-center">
        <router-link to="/">
            <v-img :src="require('../assets/icon/coffeeground.png')"
                            width="110" ratio="1"></v-img>
        </router-link>
      </div>
      <v-spacer></v-spacer> 
        <div class="search">
          <input autocomplete="off" 
          placeholder="Search" type="text"
          :value="keyword" 
          @input="searchText"
          @keyup.enter="closeCategories"
          @click="showCategories=!showCategories" />
          <v-row v-if="showCategories">
          <v-col cols="12">
            <div class="category-dropdown">
              <div @click="navigateTo">
                <div class="category-dropdown-item">
                <v-img class="category-dropdown-marker" :src="require('../assets/icon/no_logo.png')"
                            width="50" ratio="1"></v-img>
                <span class="category-dropdown-text">근처 카페 찾기</span>
              </div>
              <span class="category-dropdown-text">{{ keyword }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
        </div>
        <v-row justify="end">
          <v-col cols="auto"> 
            <router-link v-if="!isLogin" to="/member-login-page">
              <v-btn text>
                <span>로그인</span>
              </v-btn>
            </router-link>
            <router-link v-if="!isLogin" to="/member-sign-up-page">
              <v-btn text>
                <span>회원가입</span>
              </v-btn>
            </router-link>
            <router-link v-if="isLogin" to="/account-mypage">
              <v-btn @click="myPage" text>
                <span class="text-none">{{ nickName }}님 공간</span>
              </v-btn>
            </router-link>
            <router-link v-if="isLogin" to="/">
              <v-btn @click="logout" text>
                <span>로그아웃</span>
              </v-btn>
            </router-link>
            </v-col>
        </v-row>
    </v-app-bar>
    </div>
  </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="subNav">
          <div >
            <div style="float: right;">
            <router-link to="/member-board-list-page">
              <v-btn text style="font-weight: bold;">board</v-btn>
            </router-link>
          </div>
            <div style="float:right">
            <router-link to="/cafe-map-page">
              <v-btn text style="font-weight: bold;">Map</v-btn>
            </router-link>
          </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {  mapActions, mapMutations, mapState } from "vuex";
const memberModule= 'memberModule'
const boardModule = 'boardModule'
export default {
    data(){
        return{
          showCategories: false,
          keyword: ''
         
    }
    },
    methods:{
      searchText(event){
        this.keyword = event.target.value;
        this.showCategories = true;
      },

      closeCategories(){
        this.showCategories = false;
        const something = this.requestSearchTextToSpring(this.keyword)
      },

      logout(){
        localStorage.clear(),
        this.LOGIN_COMPLETE(false)
        // this.$router.push('/')
      },
      myPage(){

      },
      navigateTo(){
        this.$router.push('/cafe-map-page');
        this.showCategories=false
      },
      ...mapMutations(memberModule,['LOGIN_COMPLETE']),
      ...mapActions( 
            boardModule, ['requestSearchTextToSpring']
      ),

    },
    created(){
      if(localStorage.getItem("userToken")){
        this.LOGIN_COMPLETE(true)
      }
    },
    computed: {
        ...mapState(memberModule, ['isLogin','nickName'])
    }
}
</script>
<style scoped>
.search {
  position: relative;
  display: block;
  width: 430px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white no-repeat url("../assets/icon/magnify.svg") 15px center; 
  background-size: 20px 20px;
  font-size: 16px;
  border:  1.5px solid #84d9b3;
  border-radius: 16px;
  box-shadow: none;
} 
input:focus,
textarea:focus {
  outline: none;
}

input{
    width: 380px;
    border: none;
    display: block;
}

spacer{
  width: 100px
}

.subNav{
  background-color: #84d9b3; 
  top: 58px; 
  z-index: 1; 
  position: fixed; 
  left: 0px; 
  width: calc((100% - 0px) - 0px);
  height: 40px;
  padding: 2px 0 0 0;
  

}
.category-dropdown {
  position: absolute;
  top: 82%;
  left:0;
  background-color: #ffffff;
  border: 1.9px solid #84d9b3;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 5px;
  width: 100.2%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: box-shadow 0.3s;
}
.category-dropdown:hover .category-dropdown-item{
  background-color: #f2f2f2;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  width: 410px;
}
.category-dropdown-item {
  display: flex;
  align-items: center;
}
.category-dropdown-marker {
  max-width: 50px;
  max-height: 50px;
  margin-right: 5px;
}
.category-dropdown-text {
  font-weight: bold;
}
</style>