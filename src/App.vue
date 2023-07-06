<template>
  <div id="app">
    <NavigationBar />
    <RouterView />
  </div>
</template>

<script>
import NavigationBar from '@/components/navigation/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
  },
};
</script>

<style>
</style>