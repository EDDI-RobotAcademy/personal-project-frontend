<template lang="">
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="8" xl="6">
        <div>
          <h3 class="text-center">플레이리스트 목록</h3>
          <table width="100%">
            <tr>
              <th align="right" width="70%">제목</th>
            </tr>
            <tr v-if="!playlists || (Array.isArray(playlists) && playlists.length === 0)">
              <td colspan="4">
                현재 등록된 플레이리스트가 없습니다!!
              </td>
            </tr>
            <tr v-else v-for="playlist in playlists" :key="playlist.playlist.id">
              <td align="center">
                <v-img :src="getYoutubeImage(playlist.songList[0].link)" height="200" width="200"> </v-img>
              </td>
              <td>
                <router-link :to="{
                  name: 'PlaylistReadPage',
                  params: { id: playlist.playlist.id.toString() }
                }">
                  {{ playlist.playlist.title }}
                </router-link>
              </td>
            </tr>
          </table>
        </div>
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
      return 'https://img.youtube.com/vi/' + link.substring(link.lastIndexOf('=') + 1) + '/0.jpg'
    },
  },
}
</script>