<template>
  <div id="app">
    <NavigationBar />
    <div class="app__contents">
      <RouterView />
    </div>
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