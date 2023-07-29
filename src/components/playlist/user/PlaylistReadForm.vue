<template>
    <div class="content-wrapper">
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" lg="8" xl="6">
                    <v-card width="100%" class="playlist-card">
                        <v-card-text class="text-center">
                            <div class="playlist-controls">
                                <!-- <router-link to="/"> -->
                                <button @click="goBack" class="back-button">
                                    <v-icon>mdi-arrow-left</v-icon>
                                </button>
                                <!-- </router-link> -->
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
                                    <td class="left-align">
                                        {{ index + 1 }}. {{ songList.title }} - {{ songList.singer }}
                                    </td>
                                    <td class="right-align">
                                        <button class="buttons mr-1"
                                            @click="updatePlayerSrc(index)"><v-icon>mdi-play</v-icon></button>
                                        <button class="buttons mr-1"
                                            @click="toggleTooltip(index)"><v-icon>mdi-text-box-outline</v-icon></button>
                                        <button class="buttons"
                                            @click="goYoutube(index)"><v-icon>mdi-youtube</v-icon></button>
                                        <div v-if="showTooltip[index]" class="tooltip-container">
                                            <div class="tooltip">
                                                <p @click="closeTooltip(index)" class="close-icon">x</p>
                                                <span v-html="songList.lyrics"></span>
                                            </div>
                                        </div>
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
                                    @change="seekVideo" @input="seekVideo" style="margin-left: 200px" />
                                <div class="duration">
                                    <span>{{ currentTimeText }}</span>
                                    <span> / </span>
                                    <span>{{ totalTimeText }}</span>
                                </div>
                                <div class="volume-icon" @mousedown="startRotation" @mousemove="rotateIcon"
                                    @mouseup="stopRotation"
                                    style="display: flex; margin-left: 50px; justify-content: space-between">
                                    <img src="@/assets/volume.png" draggable="false" width="50" hegiht="50" />
                                    <div style="margin: 15px 50px 0 60px; position: absolute; align-items: center;">
                                        Volume = {{ this.volume }}</div>
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
import VTooltip from 'v-tooltip';

const playlistModule = 'playlistModule'

export default {
    data() {
        return {
            likes: 0,
            playlistLiked: false,

            videoIds: [],

            isPlaying: false,

            currentIndex: 0,
            currentIframe: '',
            currentTitle: '',
            currentSinger: '',

            duration: 0,
            currentTime: 0,
            currentTimeText: '00:00',
            totalTimeText: '0000',

            progressInterval: null,
            isDataLoaded: false,

            showTooltip: {},

            isRotating: false,
            initialAngle: 0,
            currentAngle: 0,
            volume: 0,
        }
    },
    props: {
        playlist: {
            type: Object,
            required: true,
        }
    },
    beforeDestroy() {
        clearInterval(this.progressInterval);
        this.progressInterval = null;

        if (this.ytPlayer) {
            this.ytPlayer.destroy();
            console.log("destroy")
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
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
            console.log("checkIsPlaylistLiked")
            if (this.playlist && this.playlist.playlist) {
                const listId = this.playlist.playlist.id;
                this.playlistLiked = await this.requestIsPlaylistLikedToSpring(listId);
                this.likes = this.playlist.likeCount

                if (this.playlist.songList) {
                    this.showTooltip = {};
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
            this.$refs.ytPlayer.src = `https://www.youtube.com/embed/${this.videoIds[this.currentIndex]}?autoplay=0&mute=0&enablejsapi=1`;

            this.setupPlayer();
        },

        extractVideoId(url) {
            const regex = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/;
            const match = url.match(regex);
            return match && match[1].length === 11 ? match[1] : null;
        },

        setupPlayer() {
            if (!this.isDataLoaded) {
                console.log("setupPlayer")
                this.ytPlayer = new YT.Player(this.$refs.ytPlayer, {
                    events: {
                        onReady: this.onPlayerReady,
                    },
                });
                this.isDataLoaded = true;
            }

        },

        onPlayerReady(event) {
            console.log("onPlayerReady")
            this.currentIframe = event.target;
            this.currentTitle = this.playlist.songList[this.currentIndex].title;
            this.currentSinger = this.playlist.songList[this.currentIndex].singer;

            if (this.progressInterval) {
                clearInterval(this.progressInterval);
            }

            this.progressInterval = setInterval(() => {
                this.updateProgressBar();
                this.currentTimeText = this.formatTime(this.currentTime);
                this.totalTimeText = this.formatTime(this.duration);
            }, 1000);
        },

        onPlayerStateChange() {
            console.log("onPlayerStateChange")
            this.currentIndex++;
            if (this.currentIndex >= this.videoIds.length) {
                this.currentIndex = 0;
            }
            this.updatePlayerSrc(this.currentIndex);
        },

        updatePlayerSrc(currentIndex) {
            this.currentIndex = currentIndex
            this.$refs.ytPlayer.src = `https://www.youtube.com/embed/${this.videoIds[currentIndex]}?autoplay=1&mute=0&enablejsapi=1`;
            this.isPlaying = true;
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
            if (this.ytPlayer.getPlayerState() == 0) {
                this.onPlayerStateChange()
            }
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

        toggleTooltip(index) {
            console.log(index)
            this.$set(this.showTooltip, index, !this.showTooltip[index]);
        },

        closeTooltip(index) {
            this.$set(this.showTooltip, index, false);
        },
        goYoutube(index) {
            window.open(this.playlist.songList[index].link)
        },

        startRotation(event) {
            this.isRotating = true;
            const rect = this.$el.querySelector(".volume-icon").getBoundingClientRect();
            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2;
            this.initialAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
        },
        rotateIcon(event) {
            if (!this.isRotating) return;

            const rect = this.$el.querySelector(".volume-icon").getBoundingClientRect();
            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2;
            const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
            let delta = 0;

            if (event.clientX > centerX) {
                delta = -(this.initialAngle - angle);
            }
            else {
                delta = angle - this.initialAngle + (angle < this.initialAngle ? 360 : 0);
            }

            let rotation = this.currentAngle + delta;
            rotation = (rotation + 360) % 360;
            this.volume = Math.max(0, Math.min(100, Math.round(rotation / 360 * 100)));
            console.log(this.volume)

            this.$el.querySelector(".volume-icon img").style.transform = `rotate(${rotation}deg)`;

            const deltaVolume = Math.abs(this.volume - this.ytPlayer.getVolume())
            if (deltaVolume >= 1) {
                this.ytPlayer.setVolume(this.volume);
            }
        },
        stopRotation(event) {
            if (!this.isRotating) return;

            this.isRotating = false;
            const rect = this.$el.querySelector(".volume-icon").getBoundingClientRect();
            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2;
            const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
            let delta = 0;

            if (event.clientX > centerX) {
                delta = -(this.initialAngle - angle);
            } else {
                delta = this.initialAngle - angle;
            }

            this.currentAngle = (this.currentAngle + delta + 360) % 360;
        }
    },
    watch: {
        playlist: {
            immediate: true,
            async handler() {
                if (this.playlist && this.playlist.playlist) {
                    await this.checkIsPlaylistLiked();
                }
            }
        }
    },
    directives: {
        Tooltip: VTooltip,
    },
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
    padding-left: 220px;
    text-align: left;
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
    text-align: right;
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

.tooltip-container {
    position: relative;
}

.tooltip {
    position: absolute;
    z-index: 999;
    background-color: #000;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    top: 0;
    left: 100%;
    width: 300px;
    max-height: 300px;
    overflow-y: auto;
    text-align: left;
}

.tooltip span {
    cursor: pointer;
}

.tooltip span:last-child {
    margin-left: 10px;
}

.close-icon {
    cursor: pointer;
    float: right;
}

.buttons {
    text-align: center;
}

.left-align {
    text-align: left;
}

.right-align {
    text-align: right;
    padding-right: 220px;
}

.volume-icon {
    align-items: right;
}
</style>