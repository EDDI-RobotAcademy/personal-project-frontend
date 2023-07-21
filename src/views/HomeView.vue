<template>
  <v-container>
    <div>
      <v-carousel :cycle="cycle" :interval="interval" :height="height" v-model="carouselModel">
        <v-carousel-item v-for="(picture, idx) in pictures" :key="idx">
          <v-sheet :height="height" tile>
            <v-row class="fill-height" align="center" justify="center">
              <v-img :src="picture.img" :height="height" contain />
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <br>
    <hr><br>

    <v-row>
      <v-col cols="4">
        <h3>공지 사항</h3>
        <ul>
          <li v-for="(notice, index) in noticeBoards" :key="index">
            {{ notice.title }}
          </li>
        </ul>
      </v-col>

      <v-col cols="4">
        <ul>
          <h3>상점</h3>
          <li>리스트 아이템 4</li>
          <li>리스트 아이템 5</li>
          <li>리스트 아이템 6</li>
        </ul>
      </v-col>

      <v-col cols="4">
        <ul>
          <h3>커뮤니티</h3>
          <li>리스트 아이템 7</li>
          <li>리스트 아이템 8</li>
          <li>리스트 아이템 9</li>
        </ul>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

import noticeModule from '@/store/notice/noticeModule';
import { mapActions, mapState } from 'vuex';

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
        { img: require("@/assets/asdf.jpg") },
        { img: require("@/assets/image1.jpg") },
        { img: require("@/assets/image2.jpg") },
        { img: require("@/assets/LogoImage.png") },
        { img: require("@/assets/exampleImage.jpg") },
      ],
      cycle: true,
      interval: 2500,
      height: 500,
    }
  },
  props: {
    noticeBoards: {
      type: Array
    }
  },
  computed: {
    ...mapState(noticeModule, ['noticeBoards'])

  },
  mounted() {
    this.noticeListBoard()
  },
  methods: {
    ...mapActions(
      noticeModule, ['noticeListBoard']
    ),
  }
}
</script>

<style scoped>
.complete {
  color: red;
}
</style>

