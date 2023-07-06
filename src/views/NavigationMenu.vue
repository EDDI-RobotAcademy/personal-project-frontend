<template>
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
          placeholder="Search" type="text" />
          
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
                <span>{{ nickName }}님 공간</span>
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
</template>
<script>
import {  mapActions, mapMutations, mapState } from "vuex";
const memberModule= 'memberModule'
export default {
    data(){
        return{
         
    }
    },
    methods:{
      logout(){
        localStorage.clear(),
        this.LOGIN_COMPLETE(false)
      },
      myPage(){

      },
      ...mapMutations(memberModule,['LOGIN_COMPLETE'])


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
</style>