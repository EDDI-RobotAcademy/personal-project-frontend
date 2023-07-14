<template>
  <home-view-form :playlists="playlists" />
</template>

<script>
import HomeViewForm from '../components/HomeViewForm'
import { mapActions, mapState } from 'vuex'

const playlistModule = 'playlistModule'

export default {
  name: 'Home',

  components: {
    HomeViewForm,
  },
  methods: {
    ...mapActions(playlistModule, ['requestPlaylistListToSpring']),
  },
  async mounted() {
    await this.requestPlaylistListToSpring()
  },
  computed: {
    ...mapState(playlistModule, ['playlists'])
  }
}
</script>
