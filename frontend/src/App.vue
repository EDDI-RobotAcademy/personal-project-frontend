<template>
<v-app>
  <navigation-bar></navigation-bar>
  
 <v-main>
  <router-view></router-view>
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