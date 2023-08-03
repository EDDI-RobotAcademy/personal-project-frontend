<template>
  <div>
    <MainSearch />
    <SubMenu />
    <EventBanner />
  </div>
</template>

<script>
import MainSearch from '@/components/main/MainSearch.vue';
import SubMenu from '@/components/main/SubMenu.vue';
import EventBanner from '@/components/main/EventBanner.vue';

export default {
  components: {
    MainSearch,
    SubMenu,
    EventBanner,
  },
};
</script>
