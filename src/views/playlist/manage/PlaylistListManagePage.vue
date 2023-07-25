<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="8" xl="6">
                <div class="bordered-wrapper">
                    <div class="bordered-title">
                        <div class="text-center">
                            <h3>내 플레이리스트 목록</h3>
                        </div>
                    </div>
                    <div class="bordered-container">
                        <playlist-list-manage-form :playlists="playlists" />
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
import PlaylistListManageForm from '@/components/playlist/manage/PlaylistListManageForm.vue'
import { mapActions, mapState } from 'vuex'

const playlistModule = 'playlistModule'

export default {
    data() {
        return {
            page: 1,
            amount: 0,
        }
    },
    name: 'Home',

    components: {
        PlaylistListManageForm,
    },
    methods: {
        ...mapActions(playlistModule, ['requestPlaylistByLoginAccountToSpring', 'requestCountPlaylistByLoginAccountToSpring']),
    },
    async mounted() {
        await this.requestPlaylistByLoginAccountToSpring(this.page)
        this.amount = await this.requestCountPlaylistByLoginAccountToSpring()
    },
    computed: {
        ...mapState(playlistModule, ['playlists'])
    },
    watch: {
        page() {
            this.requestPlaylistByLoginAccountToSpring(this.page)
        },
    },
}
</script>
  