<template>
  <v-app>
    <v-app-bar color="white" app elevation="2" height="130">
      <navigation-menu-page />
    </v-app-bar>
    <v-main :style="{ 'padding-top': '110px' }">
      <div></div>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationMenuPage from "./views/layout/navigation/NavigationMenuPage.vue";

export default {
  components: {
    NavigationMenuPage,
  },

  data() {
    return {
      login: false
    }
  },

  created() {
    this.check()
  },
  beforeUpdate() {
    this.check()
  },
  methods: {
    check() {
      if (localStorage.getItem("login")) {
        this.login = true;
        //router.go("/")
      }
    },
  },
};
</script>

<style scoped></style>
