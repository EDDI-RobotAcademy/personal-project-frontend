<template>
    <div>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" lg="8" xl="6">
                    <v-card width="100%"
                        style="background-color: rgba(255, 255, 255, 0.8); border: 3px solid #000000; border-radius: 25px;">
                        <v-card-text class="text-center px-12 py-16">

                            <table v-if="playlist.playlist" style="margin-bottom: 20px; width: 100%;">
                                <tr>
                                    <td style="font-weight: bold; padding-right: 70px;">플레이리스트 번호</td>
                                    <td>
                                        <input type="text" :value="playlist.playlist.id" readonly
                                            style=" border: none; font-weight: bold" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; padding-right: 70px;">이름</td>
                                    <td>
                                        <input type="text" :value="playlist.playlist.title" readonly
                                            style="border: none; font-weight: bold" />
                                    </td>
                                </tr>
                            </table>

                            <h3 v-if="playlist.songList" style="font-weight: bold; margin-bottom: 20px;">목록</h3>

                            <table v-if="playlist.songList"
                                style="border-collapse: separate; border-spacing: 1em; width: 100%">
                                <tr v-for="(songList, index) in playlist.songList" :key="songList.title">
                                    <router-link :to="{
                                        name: 'SongReadPage',
                                        params: { id: songList.id.toString() }
                                    }" style="text-decoration: none; color: black;">
                                        <td>{{ index + 1 }}. {{ songList.title }} - {{ songList.singer }}</td>
                                    </router-link>
                                </tr>
                            </table>
                            <div v-if="playlist.playlist" class="text-center">
                                <router-link :to="{
                                    name: 'SongRegisterPage',
                                    params: { playlistId: playlist.playlist.id }
                                }">
                                    <v-btn class="mr-2" rounded color="gray lighten-1" style="border-radius: 5px;">
                                        노래 등록
                                    </v-btn>
                                </router-link>
                                <v-btn @click="onModify"> 수정 </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    props: {
        playlist: {
            type: Object,
            required: true,
        }
    },
    methods: {
        async onModify() {
            const playlistId = this.playlist.playlist.id
            await this.$router.push({
                name: 'PlaylistModifyPage',
                params: { playlistId: playlistId.toString() }
            })
        },
    },
}
</script>
<style lang="">
    
</style>