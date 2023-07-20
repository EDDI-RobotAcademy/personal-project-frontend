<template>
  <v-app>
    <navigation-menu-page />
    <v-main :style="{ 'padding-top': '130px' }">
      <div style="background-color: black; height: 4px;"></div>
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

  data: () => ({}),
};
</script>

<style scoped></style>
