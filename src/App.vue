<template>
  <div>
    <MyLogin v-if="!loggedIn" @login="handleLogin" />
    <!-- <div v-else>
      <h2>Welcome, {{ username }}!</h2>
      <button @click="logout">Logout</button>
    </div> -->
  </div> 
</template>

<script>
import MyLogin from './components/MyLogin.vue';

export default {
  name: 'App',
  components: {
    MyLogin
  },
  data() {
    return {
      loggedIn: false,
      username: ''
    };
  },
  methods: {
    handleLogin(username) {
      this.loggedIn = true;
      this.username = username;
    },
    logout() {
      this.loggedIn = false;
      this.username = '';
    }
  }
};
</script>
<style>
  @font-face {
    font-family: "ChelaOne";
    src: local("ChelaOne"), url(./assets/fonts/ChelaOne-Regular.ttf) format(truetype);
  }
  @font-face {
    font-family: "Tektur";
    src: local("Tektur"), url(./assets/fonts/Tektur-VariableFont.ttf) format(truetype);
  }
  @font-face {
    font-family: "ShadowsIntoLight";
    src: local("ShadowsIntoLight"), url(./assets/fonts/ShadowsIntoLight-Regular.ttf) format(truetype);
  }
</style>