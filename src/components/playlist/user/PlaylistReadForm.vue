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
                            <br>
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
                                    <!-- <router-link :to="{
                                        name: 'SongReadPage',
                                        params: { song: songList, playlistId: playlist.playlist.id.toString() }
                                    }" style="text-decoration: none; color: black;">
                                        <td>{{ index + 1 }}. {{ songList.title }} - {{ songList.singer }}</td>
                                    </router-link> -->
                                    <td>
                                        {{ index + 1 }}. {{ songList.title }} - {{ songList.singer }}
                                        <button @click="updatePlayerSrc(index)"><v-icon>mdi-play</v-icon></button>
                                    </td>

                                </tr>
                            </table>
                        </v-card-text>
                        <div align="center">
                            <button class="mr-3" @click="initializeVideos">전곡 듣기</button>
                            <br>
                            <iframe ref="ytPlayer" frameborder="0" allow="autoplay" width="300" height="300"></iframe>
                            <br>
                            <button class="mr-3" @click="previousVideo"><v-icon>mdi-skip-previous"</v-icon></button>
                            <button class="mr-3" @click="togglePlay" v-if="isPlaying"><v-icon>mdi-pause</v-icon></button>
                            <button class="mr-3" @click="togglePlay" v-else><v-icon>mdi-play</v-icon></button>
                            <button class="mr-3" @click="nextVideo"><v-icon>mdi-skip-next"</v-icon>⏭️</button>
                        </div>
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
            videoIds: [],
            currentIndex: 0,
            links: [],
            isPlaying: false,
            currentIframe: '',
        }
    },
    props: {
        playlist: {
            type: Object,
            required: true,
        }
    },
    mounted() {
        this.checkIsPlaylistLiked()
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

                if (this.playlist.songList) {
                    this.initializeVideos();
                }
            } else {
                return false;
            }
        },
        initializeVideos() {
            const videoLinks = this.playlist.songList.map(song => song.link);
            this.videoIds = videoLinks.map((url) => this.extractVideoId(url));
            this.currentIndex = 0;
            this.$refs.ytPlayer.src = `https://www.youtube.com/embed/${this.videoIds[this.currentIndex]}?autoplay=0&mute=1&enablejsapi=1`;

            this.setupPlayer();
        },
        extractVideoId(url) {
            const regex = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/;
            const match = url.match(regex);
            return match && match[1].length === 11 ? match[1] : null;
        },
        setupPlayer() {
            this.ytPlayer = new YT.Player(this.$refs.ytPlayer, {
                events: {
                    onReady: this.saveTarget,
                    onStateChange: this.onPlayerStateChange,
                },
            });
        },
        onPlayerStateChange(event) {
            console.log(this.currentIndex)
            if (event.data === YT.PlayerState.ENDED) {
                this.currentIndex++;
                if (this.currentIndex >= this.videoIds.length) {
                    this.currentIndex = 0;
                }
                console.log(this.currentIndex)
                this.updatePlayerSrc(this.currentIndex);
            }
        },
        saveTarget(event) {
            this.currentIframe = event.target
        },
        updatePlayerSrc(currentIndex) {
            this.$refs.ytPlayer.onload = () => {
                this.isPlaying = true;
            };
            this.$refs.ytPlayer.src = `https://www.youtube.com/embed/${this.videoIds[currentIndex]}?autoplay=1&mute=0&enablejsapi=1`;
            console.log(this.$refs.ytPlayer.src)
            this.isPlaying = true;
        },
        nextVideo() {
            this.currentIndex++;
            if (this.currentIndex >= this.videoIds.length) {
                this.currentIndex = 0;
            }
            this.updatePlayerSrc(this.currentIndex);
            console.log(this.currentIndex)
        },
        previousVideo() {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.videoIds.length - 1;
            }
            this.updatePlayerSrc(this.currentIndex);
        },
        togglePlay() {
            if (!this.ytPlayer) return;

            if (this.isPlaying) {
                this.currentIframe.pauseVideo();
            } else {
                this.currentIframe.playVideo();
            }
            this.isPlaying = !this.isPlaying;
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