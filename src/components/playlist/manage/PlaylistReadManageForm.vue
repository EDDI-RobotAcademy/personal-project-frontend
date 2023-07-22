<template>
    <div>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" lg="8" xl="6">
                    <v-card width="100%"
                        style="background-color: rgba(255, 255, 255, 0.8); border: 3px solid #000000; border-radius: 25px;">
                        <v-card-text class="text-center px-12 py-16">

                            <table v-if="playlist.playlist"
                                style="margin-bottom: 20px; width: 100%; border: 1px solid black">
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
                                        name: 'SongReadManagePage',
                                        params: { id: songList.id.toString(), playlistId: playlist.playlist.id.toString() }
                                    }" style="text-decoration: none; color: black;">
                                        <td>{{ index + 1 }}. {{ songList.title }} - {{ songList.singer }}</td>
                                    </router-link>
                                </tr>
                            </table>
                            <div v-if="playlist.playlist" class="text-center">
                                <button class="mr-2" rounded color="gray lighten-1" style="border-radius: 5px;"
                                    @click="goToPlaylistRegister(playlist.playlist.id)">
                                    노래 등록
                                </button>
                                <button class="mr-2" @click="onModify"> 수정 </button>
                                <button class="mr-2" @click="onDelete"> 삭제 </button>
                                <button class="mr-2" @click="goBack"> 돌아가기 </button>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

const playlistModule = 'playlistModule'

export default {
    data() {
        return {
            deletePass: false,
        }
    },
    props: {
        playlist: {
            type: Object,
            required: true,
        }
    },
    methods: {
        ...mapActions(playlistModule, ['requestDeletePlaylistToSpring']),
        async onModify() {
            await this.$router.push({
                name: 'PlaylistModifyManagePage',
                params: { playlistId: this.playlist.playlist.id.toString() }
            })
        },
        async goBack() {
            await this.$router.push({
                name: 'PlaylistListManagePage',
            })
        },
        async onDelete() {
            this.deletePass = await this.requestDeletePlaylistToSpring(this.playlist.playlist.id)
            console.log(this.playlist.playlist.id)
            if (this.deletePass) {
                await this.$router.push({
                    name: 'PlaylistListManagePage',
                })
            }
        },
        goToPlaylistRegister(playlistId) {
            this.$router.push({
                name: 'SongRegisterPage',
                params: { playlistId: playlistId.toString() }
            })
        }
    },
}
</script>
<style lang="">
    
</style>