<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="8" xl="6">
        <h3 class="text-center mb-8">플레이리스트 목록</h3>
        <v-row v-if="!playlists || (Array.isArray(playlists) && playlists.length === 0)" align="center" justify="center">
          <v-col>
            <p>현재 등록된 플레이리스트가 없습니다!!</p>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" sm="6" md="4" v-for="playlist in playlists" :key="playlist.playlist.id">
            <v-card elevation="4" class="mb-6 d-flex flex-column justify-center align-center" style="padding-top: 20px;"
              @click="goToPlaylist(playlist.playlist.id)">
              <v-img v-if="playlist.songList[0]" class="mx-auto" :src="getYoutubeImage(playlist.songList[0].link)"
                height="200" width="200"></v-img>
              <v-card-text class="text-center">
                {{ playlist.playlist.title }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    playlists: {
      type: Array,
    },
  },
  methods: {
    getYoutubeImage(link) {
      return 'https://img.youtube.com/vi/' + link.substring(link.lastIndexOf('=') + 1) + '/mqdefault.jpg'
    },
    goToPlaylist(playlistId) {
      this.$router.push({
        name: 'PlaylistReadPage',
        params: { id: playlistId.toString() }
      })
    }
  },
}   
</script>