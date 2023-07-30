<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8" xl="6">
                <div class="bordered-wrapper">
                    <div class="bordered-title">
                        <div class="text-center">
                            <h3>좋아요 플레이리스트 목록</h3>
                            <br><br>
                        </div>
                    </div>
                    <div class="bordered-container">
                        <liked-playlist-list-form :playlists="playlists" />
                        <div class="text-center" style="padding: 20px;">
                            <v-pagination v-model="page" color="black" :length="amount"></v-pagination>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import LikedPlaylistListForm from '@/components/playlist/user/LikedPlaylistListForm'
import { mapActions, mapState } from 'vuex'

const playlistModule = 'playlistModule'

export default {
    name: 'Home',
    data() {
        return {
            page: 1,
            amount: 0,
        }
    },
    components: {
        LikedPlaylistListForm,
    },
    methods: {
        ...mapActions(playlistModule, ['requestLikedPlaylistToSpring', 'requestCountPageLikedPlaylistByLoginAccountToSpring']),
        requestSlicePlaylist() {
            this.requestSlicePlaylistToSpring(this.page)
        },
    },
    async mounted() {
        await this.requestLikedPlaylistToSpring(this.page)
        this.amount = await this.requestCountPageLikedPlaylistByLoginAccountToSpring();
    },
    computed: {
        ...mapState(playlistModule, ['playlists'])
    },
    watch: {
        async page() {
            await this.requestLikedPlaylistToSpring(this.page)
        },
    },
}
</script>
  
<style>
.bordered-title {
    padding: 20px;
}

.text-center {
    text-align: center;
}

.menu-btn {
    font-size: 20px;
    margin-left: 15px;
}

.bordered-wrapper {
    border: 3px solid black;
    border-radius: 25px;
}
</style>