<template>
    <nav>
    <v-app-bar color="white" app >
    <v-toolbar-title>
    <v-btn class="navbar-btn" text @click="goHome">
        <span>WALKING!</span>
      </v-btn> </v-toolbar-title>
    
  <v-spacer></v-spacer>
    
   <v-toolbar-items>    <v-btn >{{nickName }}</v-btn> <v-btn class="navbar-btn" v-if="!isAuthenticated" text @click="signUp">
        <span>회원가입</span>
        <v-icon right>mdi-account-plus-outline</v-icon>
      </v-btn>
      <v-btn class="navbar-btn" v-if="!isAuthenticated" text @click="signIn">
        <span>로그인</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
      <v-btn class="navbar-btn" v-if="isAuthenticated" text @click="signOut">
        <span>로그아웃</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn></v-toolbar-items>
 
    </v-app-bar>
    
  </nav> 
  </template>
  
  <script>
import router from '@/router';

  
export default {
    data() {
        return {
            drawer:false,
            isAuthenticated:false,
            nickName:'',
        }
    },
    methods: {
      goHome(){
        if (this.$route.path !== '/') {
        router.push('/');}
      },
      signIn(){
        if (this.$route.path !== '/login') {
        router.push('/login');
      }
      },
      signOut(){

      },
      signUp() {
      // 현재 경로가 "/signup"이 아닌 경우에만 이동
      if (this.$route.path !== '/signup') {
        router.push('/signup');
      }
    },
    },
    mounted() {
      this.nickName=localStorage.getItem('nickname')
    },

}
  </script>
  <style>
</style>