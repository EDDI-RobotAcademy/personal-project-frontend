<template lang="">
    <div>
        <playlist-register-form @submit="registerPlaylist"/>
    </div>
</template>
<script>
import PlaylistRegisterForm from '@/components/playlist/manage/PlaylistRegisterForm.vue'
import { mapActions } from 'vuex';

const playlistModule = 'playlistModule'

export default {
    components: {
        PlaylistRegisterForm,
    },
    data() {
        return {
            playlistId: '',
        }
    },
    methods: {
        ...mapActions(playlistModule, ['requestRegisterPlaylistToSpring']),

        async registerPlaylist(payload) {
            this.playlistId = await this.requestRegisterPlaylistToSpring(payload)
            await this.$router.push({
                name: 'PlaylistReadManagePage',
                params: { id: this.playlistId.toString() }
            })
        }
    }
}
</script>
<style lang="">
    
</style>
