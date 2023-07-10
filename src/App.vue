<template>
  <v-app>
    <navigation-menu/>
    <v-main style="padding-top: 49px;">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationMenu from '@/views/NavigationMenu.vue'

export default {
  components: { NavigationMenu,
  },
  name: 'App',

  data(){
    return{
      login: false
    }
  },

  created(){
    this.check() 
  },
  beforeUpdate() {
    this.check()
  },
  methods:{
  check(){
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
.listLink{
  color: white !important;
  height: 18px;
  padding-left: 20px;
  text-decoration: none;
  right: 0;
}

abbr {
  position: relative;
}

abbr[title]:hover::after {
  content: ' (' attr(title) ') ';
  position: absolute;
  left: 110%;
  width: 500px;
  text-decoration: none;
}

.search{
  display: block;
  padding: 4px 8px;
  margin: 10px auto;
  width: 400px;
  font-size: 16px;
  outline: solid black;
}
@font-face {
    font-family: 'IBMPlexSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
#app{
  font-family: IBMPlexSansKR-Regular;
}

</style>
