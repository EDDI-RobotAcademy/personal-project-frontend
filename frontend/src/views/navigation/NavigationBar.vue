<template>
    <nav style="background-color: #69CCDA;">
    <v-app-bar style="height: 25px;background-color: #69CCDA;" app >
   <v-toolbar-items style="justify-content: center; color:black;">  
    <p style="padding-left: 1364px;" @click="myPage" >{{nickName }}</p>
      <p v-if="!isAuthenticated" text @click="signUp" style="padding-left: 10px; padding-right: 10px;">Sign Up</p>
      <p v-if="!isAuthenticated" text @click="signIn">Sign In</p>
      <p v-if="isAuthenticated" text @click="signOut">Sign Out</p> 
      
   </v-toolbar-items >
 
    </v-app-bar>
    <div id="header-wrap" style="height:160px;text-align: center; padding-top: 40px;">
      <h1 style="color: white;font-size: 40px;">WALKING!</h1><br>
      <ul id="nav-menu">
  <router-link class="routerLink" v-for="list in lists" :key="list.key"
    :to="list.link" exact>
    {{ list.title }}
  </router-link>
</ul>
    </div>
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
            userToken:null,
            lists:[
              {link:'/',title:'Main'},
              {link:'/',title:'Route'},
              {link:'/',title:'Review'},
              {link:'/',title:'MyPage'},
            ]
        }
    },
    methods: {
      goHome(){
        if (this.$route.path !== '/') {
        router.push('/');}
      },
      signIn(){
        router.push('login')
        .catch(()=>{})
        this.userToken = localStorage.getItem('userToken')
        if(this.userToken=null){
          this.isAuthenticated=false
        }
      
      },
      signOut(){
        this.isAuthenticated=false
        localStorage.removeItem('userToken')
        localStorage.removeItem('nickname')
      },
      signUp() {
      // 현재 경로가 "/signup"이 아닌 경우에만 이동
      if (this.$route.path !== '/signup') {
        router.push('/signup');
      }
    }, 
    goList() {
  if (this.$route.path !== '/myBoardList') {
    this.$router.push('/myBoardList');
  }
},
     
    myPage(){
      router.push('/myPage')
    }
    },
    mounted() {
      this.nickName=localStorage.getItem('nickname')
      if(localStorage.getItem('userToken')===!null){
        this.isAuthenticated=true
      }
    },

}
  </script>
  <style scoped>
  .center-toolbar{
  margin: 0 auto;
}
.items{
  display: flex;
  justify-content: space-between;
  width: 100%;}
.items-text{
  text-align: center;
  display: flex;;
}
#nav-menu{
  list-style: none;
}
.routerLink{
  font-size:25px;
  padding-right: 60px; 
  padding-left:  60px;
  text-decoration: none;
  color: black;
}
</style>