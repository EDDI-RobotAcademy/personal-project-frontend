<template lang="">
    <div>
        <song-register-form @submit="registerSong"/>
    </div>
</template>
<script>
import SongRegisterForm from '@/components/song/SongRegisterForm.vue'
import { mapActions } from 'vuex';

const songModule = 'songModule'

export default {
    components: {
        SongRegisterForm,
    },
    methods: {
        ...mapActions(songModule, ['requestRegisterSongToSpring']),

        async registerSong(payload) {
            const playlistId = this.$route.params.playlistId;
            // payload.playlistId = playlistId;
            // console.log(payload)
            const song = await this.requestRegisterSongToSpring({ payload, playlistId });
            console.log('song: ' + JSON.stringify(song))
            await this.$router.push({
                name: 'SongReadPage',
                params: { id: song.id.toString() }
            })
        },
    },
    props: ['playlistId'],
}
</script>
<style lang="">
    
</style>
