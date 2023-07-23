<template>
    <div class="content-wrapper">
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" lg="8" xl="6">
                    <v-card width="100%" class="playlist-card">
                        <v-card-text class="text-center">
                            <div class="playlist-controls">
                                <router-link to="/">
                                    <button class="back-button">
                                        <v-icon>mdi-arrow-left</v-icon>
                                    </button>
                                </router-link>
                                <button @click="doLike(playlist.playlist.id)" class="like-button"
                                    style="margin-right: 20px;">
                                    {{ this.playlistLiked ? "❤️" : "🤍" }}
                                    {{ this.likes }}
                                </button>
                                <div></div>
                            </div>
                            <br>
                            <div v-if="playlist.playlist" class="playlist-title">
                                <h3 class="title-weight">
                                    {{ playlist.playlist.title }}
                                </h3>
                            </div>
                            <hr>

                            <h3 v-if="playlist.songList" class="song-list-title">
                                목록
                            </h3>

                            <table v-if="playlist.songList" class="playlist-table">
                                <tr v-for="(songList, index) in playlist?.songList" :key="songList.title">
                                    <td>
                                        {{ index + 1 }}. {{ songList.title }} - {{ songList.singer }}
                                        <button @click="updatePlayerSrc(index)"><v-icon>mdi-play</v-icon></button>
                                    </td>
                                </tr>
                            </table>
                        </v-card-text>
                        <div align="center"></div>
                    </v-card>
                    <div class="player-container">
                        <iframe ref="ytPlayer" frameborder="0" allow="autoplay" width="0" height="0"></iframe>
                        <div class="bottom-player">
                            <div class="current-song-container">
                                <div class="current-song">
                                    {{ this.currentTitle }} - {{ this.currentSinger }}
                                </div>
                            </div>
                            <div class="progress-container">
                                <input id="progress-bar" type="range" min="0" max="100" value="0" step="0.1"
                                    @change="seekVideo" @input="seekVideo" />
                                <div class="duration">
                                    <span>{{ currentTimeText }}</span>
                                    <span> / </span>
                                    <span>{{ totalTimeText }}</span>
                                </div>
                            </div>
                            <div class="controls-container">
                                <button class="previous-video" @click="previousVideo">
                                    <v-icon>mdi-skip-previous</v-icon>
                                </button>
                                <button class="play-btn" @click="togglePlay">
                                    <v-icon v-if="isPlaying">mdi-pause</v-icon>
                                    <v-icon v-else>mdi-play</v-icon>
                                </button>
                                <button class="next-video" @click="nextVideo">
                                    <v-icon>mdi-skip-next</v-icon>
                                </button>
                            </div>
                        </div>
                    </div>
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
            links: [],

            isPlaying: false,

            currentIndex: 0,
            currentIframe: '',
            currentTitle: '',
            currentSinger: '',

            duration: 0,
            currentTime: 0,
            currentTimeText: '00:00',
            totalTimeText: '0000',

            onReadyPlay: false,
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
            if (event.data === YT.PlayerState.ENDED) {
                this.currentIndex++;
                if (this.currentIndex >= this.videoIds.length) {
                    this.currentIndex = 0;
                }
                this.updatePlayerSrc(this.currentIndex);
            }
            if (event.data === YT.PlayerState.PLAYING) {
                setInterval(() => {
                    this.updateProgressBar();
                    this.currentTimeText = this.formatTime(this.currentTime);
                    this.totalTimeText = this.formatTime(this.duration);
                }, 250);
            }
        },

        saveTarget(event) {
            this.currentIframe = event.target
        },

        updatePlayerSrc(currentIndex) {
            this.onReadyPlay = true
            this.currentIndex = currentIndex
            this.$refs.ytPlayer.onload = () => {
                this.isPlaying = true;
            };
            this.$refs.ytPlayer.src = `https://www.youtube.com/embed/${this.videoIds[currentIndex]}?autoplay=1&mute=0&enablejsapi=1`;
            this.isPlaying = true;
            this.currentTitle = this.playlist.songList[currentIndex].title
            this.currentSinger = this.playlist.songList[currentIndex].singer
        },

        nextVideo() {
            this.currentIndex++;
            if (this.currentIndex >= this.videoIds.length) {
                this.currentIndex = 0;
            }
            this.updatePlayerSrc(this.currentIndex);
        },

        previousVideo() {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.videoIds.length - 1;
            }
            this.updatePlayerSrc(this.currentIndex);
        },

        togglePlay() {
            if (!this.onReadyPlay) return;
            if (!this.ytPlayer) return;

            if (this.isPlaying) {
                this.currentIframe.pauseVideo();
            } else {
                this.currentIframe.playVideo();
            }
            this.isPlaying = !this.isPlaying;
        },

        updateProgressBar() {
            if (!this.ytPlayer) return;
            const duration = this.ytPlayer.getDuration();
            const currentTime = this.ytPlayer.getCurrentTime();
            if (!isNaN(duration)) {
                this.duration = duration;
                this.currentTime = currentTime;
                const progressBar = document.getElementById("progress-bar");
                if (progressBar) {
                    progressBar.max = Math.round(duration * 10) / 10;
                    progressBar.value = Math.round(currentTime * 10) / 10;
                }
            }
        },

        seekVideo(event) {
            const seekBarValue = event.target.value;
            const seekTime = (seekBarValue / event.target.max) * this.duration;
            this.currentIframe.seekTo(seekTime, true);
        },

        formatTime(time) {
            if (!time || time === 0) return '00:00';
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time - minutes * 60);
            return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
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
<style scoped>
body {
    background-color: #f0f0f0;
}

.content-wrapper {
    padding-bottom: 100px;
}

.playlist-card {
    background-color: rgba(255, 255, 255, 0.95);
    border: 3px solid #000000;
    border-radius: 25px;
}

.playlist-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.back-button,
.like-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
}

.playlist-title {
    margin-bottom: 20px;
    width: 100%;
}

.title-weight {
    font-weight: bold;
}

.song-list-title {
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 10px;
}

.playlist-table {
    border-collapse: separate;
    border-spacing: 1em;
    width: 100%;
}

.player-container {
    width: 100%;
    padding-top: 0;
}

.bottom-player {
    background-color: #fff;
    justify-content: center;
    align-items: center;
    border: 3px solid #000;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
}

.previous-video,
.next-video {
    background-color: #fff;
    color: #1fd05f;
    font-weight: bold;
    border-radius: 30px;
    padding: 0 28px;
}

.play-btn {
    background-color: #fff;
    color: #000;
    font-weight: bold;
    border-radius: 50%;
    padding: 12px;
    width: 50px;
    height: 50px;
}

.current-song-container {
    margin-top: 10px;
}

.controls-container {
    display: flex;
    justify-content: center;
}

.progress-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

#progress-bar {
    width: 200px;
}

.duration {
    display: inline-flex;
    margin-left: 15px;
}
</style>