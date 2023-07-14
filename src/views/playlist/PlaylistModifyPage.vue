<template>
    <div>
        <h2>플레이리스트 수정</h2>
        <playlist-modify-form v-if="playlist" :playlist="playlist.playlist" @submit="onSubmit" />
    </div>
</template>

<script>
import PlaylistModifyForm from '@/components/playlist/PlaylistModifyForm.vue';
import { mapActions, mapState } from 'vuex';
const playlistModule = 'playlistModule'
export default {
    components: {
        PlaylistModifyForm
    },
    props: {
        playlistId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(playlistModule, ['playlist'])
    },
    methods: {
        ...mapActions(
            playlistModule, ['requestPlaylistToSpring', 'requestModifyPlaylistToSpring']
        ),
        async onSubmit(payload) {
            const playlistId = Number(this.playlistId)

            await this.requestModifyPlaylistToSpring({ payload, playlistId })
            await this.$router.push({
                name: 'PlaylistReadPage',
                params: { id: playlistId.toString() }
            })
        }
    },
    created() {
        this.requestPlaylistToSpring(this.playlistId)
    }
}
</script>
<style lang="">
    
</style>