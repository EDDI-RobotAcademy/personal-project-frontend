<template>
  <v-app>
    <navigation-menu-page />
    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationMenuPage from "./views/layout/navigation/NavigationMenuPage.vue";

export default {
  components: {
    NavigationMenuPage,
  },

  data: () => ({}),
};
</script>
