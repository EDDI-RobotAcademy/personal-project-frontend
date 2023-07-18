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
    methods: {
        ...mapActions(playlistModule, ['requestRegisterPlaylistToSpring']),

        async registerPlaylist(payload) {
            console.log(payload)
            const playlist = await this.requestRegisterPlaylistToSpring(payload)
            console.log('playlist: ' + JSON.stringify(playlist))
            await this.$router.push({
                name: 'home',
            })
        }
    }
}
</script>
<style lang="">
    
</style>
