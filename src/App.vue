<template>
  <div id="app" data-app> <!-- data-app 속성 추가 -->
    <Header v-if="this.mountHeader" />
    <div class="app__contents">
      <RouterView />
    </div>
    <Footer v-if="this.mountFooter" />
  </div>
</template>

<script>
import Header from './components/navigation/Header.vue';
import Footer from './components/navigation/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  computed: {
    mountHeader() {
      return this.$route.name !== 'NotFound';
    },
    mountFooter() {
      return (
        this.$route.fullPath !== '/search' && this.$route.name !== 'NotFound'
      );
    },
  },
};
</script>

<style lang="scss">
@import './scss/antDesign.scss';
@import './scss/common.scss';
@import './scss/common.scss';
</style>
