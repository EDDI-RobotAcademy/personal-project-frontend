<template>
    <div>
        <h2>플레이리스트 수정</h2>
        <playlist-modify-manage-form v-if="playlist" :playlist="playlist.playlist" @submit="onSubmit" />
    </div>
</template>

<script>
import PlaylistModifyManageForm from '@/components/playlist/manage/PlaylistModifyManageForm.vue';
import { mapActions, mapState } from 'vuex';
const playlistModule = 'playlistModule'
export default {
    components: {
        PlaylistModifyManageForm
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
                name: 'PlaylistReadManagePage',
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