<template>
    <div>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" lg="8" xl="6">
                    <v-card width="100%"
                        style="background-color: rgba(255, 255, 255, 0.8); border: 3px solid #000000; border-radius: 25px;">
                        <v-card-text class="text-center px-12 py-16">
                            <button @click="doLike(playlist.playlist.id)">
                                {{ this.playlistLiked ? '❤️' : '🤍' }}
                                {{ this.likes }}
                            </button>
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
                                <tr v-for="(songList, index) in playlist?.songList" :key="songList.title">
                                    <router-link :to="{
                                        name: 'SongReadPage',
                                        params: { song: songList, playlistId: playlist.playlist.id.toString() }
                                    }" style="text-decoration: none; color: black;">
                                        <td>{{ index + 1 }}. {{ songList.title }} - {{ songList.singer }}</td>
                                    </router-link>
                                </tr>
                            </table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

const playlistModule = 'playlistModule'

export default {
    data() {
        return {
            likes: 0,
            playlistLiked: false,
        }
    },
    props: {
        playlist: {
            type: Object,
            required: true,
        }
    },
    methods: {
        ...mapActions(playlistModule, ['requestIncreaseLikeCountToSpring', 'requestDecreaseLikeCountToSpring', 'requestIsPlaylistLikedToSpring']),
        async doLike(playlistId) {
            if (!this.playlistLiked) {
                this.likes = await this.requestIncreaseLikeCountToSpring(playlistId)
            } else {
                this.likes = await this.requestDecreaseLikeCountToSpring(playlistId)
            }
            this.playlistLiked = !this.playlistLiked
        },
        async checkIsPlaylistLiked() {
            if (this.playlist && this.playlist.playlist) {
                const listId = this.playlist.playlist.id;
                this.playlistLiked = await this.requestIsPlaylistLikedToSpring(listId);
                this.likes = this.playlist.likeCount
                console.log(this.playlistLiked);
            } else {
                return false;
            }
        },
    },
    watch: {
        playlist: {
            immediate: true,
            async handler() {
                await this.checkIsPlaylistLiked();
            }
        }
    }
}
</script>
<style lang="">
    
</style>