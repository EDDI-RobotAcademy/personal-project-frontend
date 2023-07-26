<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8" xl="6">
        <div class="bordered-wrapper">
          <div class="bordered-title">
            <div class="text-center">
              <h3>플레이리스트 목록</h3>
              <br><br>
              <v-btn class="menu-btn white--text" color="black" @click="recent">최신순</v-btn>
              <v-btn class="menu-btn white--text" color="black" @click="like">좋아요순</v-btn>
            </div>
          </div>
          <div class="bordered-container">
            <home-view-form :playlists="playlists" />
            <div class="text-center" style="padding: 20px;">
              <v-pagination v-model="page" color="black" :length="amount"></v-pagination>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HomeViewForm from '../components/HomeViewForm'
import { mapActions, mapState } from 'vuex'

const playlistModule = 'playlistModule'

export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      amount: 0,
      option: 0,
    }
  },
  components: {
    HomeViewForm,
  },
  methods: {
    ...mapActions(playlistModule, ['requestSlicePlaylistToSpring', 'requestCountPlaylistToSpring', 'requestSortSlicePlaylistToSpring']),
    requestSlicePlaylist() {
      if (this.option === 0) {
        this.requestSlicePlaylistToSpring(this.page)
      }
      if (this.option === 1) {
        this.requestSortSlicePlaylistToSpring(this.page)
      }
    },
    recent() {
      this.option = 0;
      this.page = 1;
    },
    like() {
      this.option = 1;
      this.page = 1;
    }
  },
  async mounted() {
    await this.requestSlicePlaylistToSpring(this.page)
    this.amount = await this.requestCountPlaylistToSpring()
  },
  computed: {
    ...mapState(playlistModule, ['playlists'])
  },
  watch: {
    page() {
      this.requestSlicePlaylist()
    },
    option() {
      this.requestSlicePlaylist()
    }
  },
}
</script>

<style>
.bordered-title {
  padding: 20px;
}

.text-center {
  text-align: center;
}

.menu-btn {
  font-size: 20px;
  margin-left: 15px;
}

.bordered-wrapper {
  border: 3px solid black;
  border-radius: 25px;
}
</style>