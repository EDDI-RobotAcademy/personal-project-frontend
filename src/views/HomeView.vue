<template>
  <v-container>
    <div>
      <v-carousel height="400" hide-delimiters progress="" :cycle="cycle" :interval="interval" :height="height"
        v-model="carouselModel" :show-arrows="false">
        <v-carousel-item v-for="(picture, idx) in pictures" :key="idx">
          <v-sheet :height="height" tile>
            <v-row class="fill-height" align="center" justify="center">
              <v-img :src="picture.img" :height="height" contain />
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <br><br>

    <v-row>
      <v-col cols="4">
        <h3>공지 사항</h3>
        <ul style="list-style-type: none;">
          <li v-for="(notice, index) in noticeBoards" :key="index" v-if="index < 5">
            No.{{ notice.noticeId }} -
            <router-link :to="{ name: 'NoticeReadPage', params: { noticeId: notice.noticeId } }">
              {{ notice.title }}
            </router-link>
          </li>
        </ul>
        <div>
          <v-btn text class="button" to="/notice-page">+ 더보기</v-btn>
        </div>
      </v-col>

      <v-col cols="4">
        <ul>
          <h3>상점</h3>
          <li>상점 title 1</li>
          <li>상점 title 2</li>
          <li>상점 title 3</li>
        </ul>
        <ul>
        </ul>
      </v-col>

      <v-col cols="4">
        <h3>커뮤니티</h3>
        <ul style="list-style-type: none;">
          <li v-for="(community, index) in communityBoards" :key="index" v-if="index < 5">
            No.{{ community.communityId }} -
            <router-link :to="{ name: 'CommunityReadPage', params: { communityId: community.communityId } }">
              {{ community.title }}
            </router-link>
          </li>
        </ul>
        <div>
          <v-btn text class="button" to="/community-page">+ 더보기</v-btn>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

import { mapActions, mapState } from 'vuex';

const noticeModule = 'noticeModule'
const communityModule = 'communityModule'

export default {
  name: 'Home',
  components: {
  },
  methods: {
    checkType() {

    }
  },
  data() {
    return {
      carouselModel: false,
      pictures: [
        { img: require("@/assets/gym1.jpg") },
        { img: require("@/assets/gym2.jpg") },
        { img: require("@/assets/gym3.jpg") },
        { img: require("@/assets/gym4.jpg") },
        { img: require("@/assets/gym5.jpg") },
      ],
      cycle: true,
      interval: 2500,
      height: 500,
    }
  },

  computed: {
    ...mapState(noticeModule, ['noticeBoards']),
    ...mapState(communityModule, ['communityBoards']),
  },
  mounted() {
    this.noticeListBoard()
    this.communityListBoard()
  },
  methods: {
    ...mapActions(noticeModule, ['noticeListBoard']),
    ...mapActions(communityModule, ['communityListBoard']),
  },
}
</script>

<style scoped>
.button {
  margin-top: 10px;
  color: dimgrey;
  font-size: 20px;
}
</style>

