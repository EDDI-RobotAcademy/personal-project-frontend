<template>
	<header id="header">
		<RouterLink to="/" class="header__title">Room Story</RouterLink>
		<NavigationBar />

	</header>
</template>

<script>
import NavigationBar from '../navigation/NavigationBar.vue';
export default {
	components: {
    NavigationBar
},
};
</script>

<style lang="scss" scoped>
@import '../scss/header.scss';
</style>
