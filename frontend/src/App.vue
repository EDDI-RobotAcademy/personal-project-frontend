<template>
<v-app display="flex" justify-content="space-between">
  <navigation-bar></navigation-bar>
  
  <v-main style="padding-top: 0; margin-left: auto; margin-right: auto; justify-content: center;">
    <router-view ></router-view>
  </v-main>
</v-app>
</template>

<script>

import NavigationBar from './views/navigation/NavigationBar.vue';
export default {
    data: () => ({}),
    components: { NavigationBar }
};
</script>
<style>

</style>