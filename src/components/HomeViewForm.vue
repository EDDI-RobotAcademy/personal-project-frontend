<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="12" xl="12">
        <v-row v-if="isNoPlaylistAvailable" align="center" justify="center">
          <v-col>
            <p>현재 등록된 플레이리스트가 없습니다!!</p>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" sm="6" md="4" v-for="playlist in playlists" :key="playlist.playlist.id">
            <div class="playlist-padding">
              <v-card elevation="4" class="playlist-card" @click="goToPlaylist(playlist.playlist.id)">
                <div class="likeCount">
                  ❤️{{ playlist.likeCount }}
                </div>
                <v-img v-if="playlist.songList[0]" class="mx-auto" :src="getYoutubeImage(playlist.songList[0].link)"
                  height="200" width="200"></v-img>
                <v-card-text class="text-center">
                  {{ playlist.playlist.title }}
                </v-card-text>
              </v-card>
            </div>
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
  computed: {
    isNoPlaylistAvailable() {
      return !this.playlists || (Array.isArray(this.playlists) && this.playlists.length === 0);
    },
  },
  methods: {
    getYoutubeImage(link) {
      return 'https://img.youtube.com/vi/' + link.substring(link.lastIndexOf('=') + 1) + '/mqdefault.jpg'
    },
    goToPlaylist(playlistId) {
      if (!localStorage.getItem("isLogin")) {
        alert("로그인 후 이용")
        return;
      }
      this.$router.push({
        name: 'PlaylistReadPage',
        params: { id: playlistId.toString() }
      })
    }
  },
}   
</script>

<style scoped>
.playlist-padding {
  padding: 10px;
}

.playlist-card {
  padding-top: 10px;
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.likeCount {
  text-align: center;
  margin-bottom: 10px;
}
</style>
