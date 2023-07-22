<template>
  <v-container>
    <button @click="recent">최신 순</button>
    <button @click="like">좋아요 순</button>
    <home-view-form :playlists="playlists" />
    <div class="text-center">
      <v-pagination v-model="page" :length="amount"></v-pagination>
    </div>
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
