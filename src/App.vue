<template>
  <v-app>
    <v-main>
      <NavMenuPage />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavMenuPage from "./views/layout/navigation/NavMenuPage.vue";

export default {
  name: "App",
  components: { NavMenuPage },
  data: () => ({
    //
  }),
};
</script>
