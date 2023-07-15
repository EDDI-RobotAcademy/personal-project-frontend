<template lang="">
    <v-container fluid>
      <v-row justify="center">
        <h3 class="text-center">플레이리스트 관리</h3>
        <v-col cols="12" lg="8" xl="6">
          <div>
            <h3 class="text-center">플레이리스트 목록</h3>
            <table width="100%">
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
                    name: 'PlaylistReadManagePage',
                    params: { id: playlist.id.toString() }
                  }">
                    {{ playlist.title }}
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
      type: Array
    }
  },
  data: () => ({
  }),

}
</script>
  