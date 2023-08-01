<template>
    <div>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" lg="8" xl="6">
                    <v-card width="100%"
                        style="background-color: rgba(255, 255, 255, 0.8); border: 3px solid #000000; border-radius: 25px;">
                        <v-card-text class="text-center px-12 py-16">
                            <table>
                                <tr>
                                    <td>제목</td>
                                    <td><v-text-field :value="song.title" readonly /></td>
                                </tr>
                                <tr>
                                    <td>가수</td>
                                    <td><v-text-field :value="song.singer" readonly /></td>
                                </tr>
                                <tr>
                                    <td>유튜브 링크</td>
                                    <td><v-text-field :value="song.link" readonly @click="goYoutube(song.link)" /></td>
                                </tr>
                                <tr></tr>
                                <tr>
                                    <td>가사</td>
                                    <td>
                                        <textarea v-html="song.lyrics" style="width: 30vw; height: 50vh;"
                                            readonly></textarea>
                                    </td>
                                </tr>
                            </table>
                            <iframe v-if="loaded" id="ytplayer" type="text/html" width="720" height="405" :src='youtubeLink'
                                frameborder="0" allowfullscreen />
                            <br>
                            <v-btn @click="goBack">돌아가기</v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loaded: false,
            youtubeLink: '',
        }
    },
    props: {
        song: {
            type: Object,
            required: true,
        },
        playlistId: {
            type: String,
            required: true,
        },
    },
    methods: {
        async onModify() {
            const songId = this.song.id
            await this.$router.push({
                name: 'SongModifyManagePage',
                params: { songId: songId.toString() }
            })
        },
        async goBack() {
            await this.$router.push({
                name: 'PlaylistReadPage',
                params: { id: this.playlistId.toString() }
            })
        },
        loadingYoutube() {
            this.youtubeLink = 'https://www.youtube.com/embed/' + this.song.link.substring(this.song.link.lastIndexOf('=') + 1)
            this.loaded = true;
        },
        goYoutube(url) {
            window.open(url)
        }
    },
    watch: {
        song: {
            immediate: true,
            handler() {
                this.loadingYoutube();
            }
        }
    }
}
</script>
<style lang="">
    
</style>