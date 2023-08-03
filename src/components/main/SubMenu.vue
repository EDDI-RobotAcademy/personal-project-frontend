<template>
	<div class="sub-menu-container">
		<div class="sub-menu-container__inner">
			<div class="sub-menu__item sub-menu__ad">
				<div class="item__header ad__header">분양 소개</div>
				<div class="item__contents ad__contents">
					<a href="https://www.lottecastle.co.kr/APT/AT00394/main/index.do" target="_blank">
						<img src="@/assets/advertisetwo.png" alt="광고2" />
					</a>
				</div>
			</div>

			<div class="sub-menu__item sub-menu__notice">
				<div class="item__header notice__header">
					<div class="header__title">중요</div>
					<div class="header__more">
						<a href="https://www.youtube.com/results?search_query=+%EB%B6%80%EB%8F%99%EC%82%B0+" target="_blank">더보기</a>
					</div>
				</div>
				<div class="item__contents notice__contents">
					<iframe width="100%" height="200" src="https://www.youtube.com/embed/GM2tWIeqppI" title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
		};
	},
	
	methods: {
	},
};
</script>

<style scoped>
.sub-menu-container {
	background-color: #f8f8f8;
	padding: 10px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
}

.sub-menu-container__inner {
	display: flex;
	gap: 20px;
}

.sub-menu__item {
	background-color: #fff;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.item__header {
	font-size: 20px;
	font-weight: bold;
	color: #4caf50;
	margin-bottom: 10px;
}

.item__contents {
	text-align: center;
}

.ad__contents img {
	max-width: 50%;
	border-radius: 5px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.notice__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	color: #2196f3;
}

.notice__contents iframe {
	width: 100%;
	height: 200px;
	border-radius: 5px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>