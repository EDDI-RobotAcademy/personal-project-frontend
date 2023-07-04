<template>
  <v-app>
    <navigation-menu-page />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<script>
import NavigationMenuPage from './views/navigation/NavigationMenuPage.vue';

export default {
  components: {
    NavigationMenuPage
  }
}
</script>
<style scoped></style>
