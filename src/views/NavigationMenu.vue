<template>
    <div>
        <v-app-bar class="nav"
      app
      elevation="1"
      color="grey lighten-5"
      >
      <div class="d-flex align-center">
        <a href="/">
            <v-icon>mdi-home</v-icon>
        </a>
      </div>
      <v-spacer></v-spacer> 
        <div class="search">
          <input autocomplete="off" 
          placeholder="Search" type="text" style="border:0"/>
          
        </div>
        <v-row justify="end">
          <v-col cols="auto"> 
            <router-link v-if="!login" to="/account-creation-page">
              <v-btn>
                <span>회원가입</span>
              </v-btn>
            </router-link>
            <router-link v-if="!login" to="/account-login-page">
              <v-btn>
                <span>로그인</span>
              </v-btn>
            </router-link>
            <router-link v-if="login" to="/">
              <v-btn @click="logout">
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
<style>
.search {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white no-repeat url("../assets/icon/magnify.svg") 15px center; 
  background-size: 20px 20px;
  font-size: 16px;
  border: none;
  border-radius: 16px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
} 
input:focus,
textarea:focus {
  outline: none;
}

input{
    width: 300px;
    border: none;
    display: block;
}

</style>