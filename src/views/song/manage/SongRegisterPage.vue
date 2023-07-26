<template lang="">
    <div>
        <song-register-form @submit="registerSong" :playlistId="playlistId"/>
        {{playlistId}}
    </div>
    
</template>
<script>
import SongRegisterForm from '@/components/song/manage/SongRegisterForm.vue'
import { mapActions } from 'vuex';

const songModule = 'songModule'

export default {
    props: {
        playlistId: {
            type: String,
            required: true,
        }
    },
    components: {
        SongRegisterForm,
    },
    methods: {
        ...mapActions(songModule, ['requestRegisterSongToSpring']),

        async registerSong(payload) {
            const playlistId = this.playlistId
            const song = await this.requestRegisterSongToSpring({ payload, playlistId });
            console.log('song: ' + JSON.stringify(song))
            await this.$router.push({
                name: 'SongReadManagePage',
                params: { id: song.toString() }
            })
        },
    },
}
</script>
<style lang="">
    
</style>
