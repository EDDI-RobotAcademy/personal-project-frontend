<template>
	<div class="search-container">
		<div class="search__inner">
			<h1 class="search__title">어떤 아파트를 찾으세요?</h1>
			<div class="search__option-btn-group">
				<button class="search__option-btn" :class="{ active: searchType === '매물' }"
					@click="changeSearchType('매물')">매물</button>
				<button class="search__option-btn" :class="{ active: searchType === '분양' }"
					@click="changeSearchType('분양')">분양</button>
			</div>
			<div class="search__form">
				<label for="search-input">
					<i class="material-icons search__form__icon">search</i>
				</label>
				<input type="text" v-model="searchDongName" @keyup.enter.prevent="searchAptListByDong" id="search-input"
					placeholder="동 이름을 검색하세요." />
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
	data() {
		return {
			searchDongName: '',
		};
	},
	computed: {
		...mapGetters('userStore', ['isLogin', 'getId']),
	},
	methods: {
		...mapMutations('userStore', ['SET_RECENT_SEARCH']),
		...mapActions('searchStore', [
			'GET_APT_LIST_BY_SEARCH',
			'GET_APT_LIST_BY_SEARCH_WITH_AUTH',
		]),
		
	},
};
</script>

<style lang="scss" scoped>
@import './scss/reset.scss';
@import './scss/mainSearch.scss';
</style>
