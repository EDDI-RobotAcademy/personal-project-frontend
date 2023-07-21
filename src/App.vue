<template>
  <v-app>
    <navigation-menu-page style="min-height: 7vh;"/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationMenuPage from '@/domain/settings/layout/navigationbar/NavigationMenuPage.vue'

export default {
  components: {
    NavigationMenuPage,
  },
}
</script>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
