<template lang="">
  <v-container>
    <div>
      <h3>플레이리스트 목록</h3>
      <table>
        <tr>
          <th align="center" width="70%">제목</th>
        </tr>
        <tr v-if="!playlists || (Array.isArray(playlists) && playlists.length === 0)">
          <td colspan="4">
            현재 등록된 플레이리스트가 없습니다!
          </td>
        </tr>
        <tr v-else v-for="playlist in playlists" :key="playlist.id">
          <td align="center">
            <router-link :to="{
              name: 'PlaylistReadPage',
              params: { id: playlist.id.toString() }
            }">
              {{ playlist.title }}
            </router-link>
          </td>
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>

export default {
  props: {
    playlists: {
      type: Array
    }
  },
  data: () => ({
  }),

}
</script>
