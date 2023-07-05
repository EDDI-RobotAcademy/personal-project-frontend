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
            <router-link v-if="!login" to="/member-sign-up-page">
              <v-btn text>
                <span>회원가입</span>
              </v-btn>
            </router-link>
            <router-link v-if="!login" to="/memeber-login-page">
              <v-btn text>
                <span>로그인</span>
              </v-btn>
            </router-link>
            <router-link v-if="login" to="/account-mypage">
              <v-btn @click="myPage" text>
                <span>마이 페이지</span>
              </v-btn>
            </router-link>
            <router-link v-if="login" to="/">
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
export default {
    data(){
        return{
        login: false
    }
    },
    created(){
    this.checkLogin() 
    },
    beforeUpdate() {
    this.checkLogin()
    },
    methods:{
        checkLogin(){
            if (localStorage.getItem("login")) {
                this.login = true;
                //router.go("/")
    }},
        logout() {
            localStorage.clear()
            this.login = false;
        }
    },
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