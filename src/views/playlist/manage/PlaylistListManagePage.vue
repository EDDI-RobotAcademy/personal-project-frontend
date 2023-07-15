<template>
    <playlist-list-manage-form :playlists="playlists" />
</template>
  
<script>
import PlaylistListManageForm from '@/components/playlist/manage/PlaylistListManageForm.vue'
import { mapActions, mapState } from 'vuex'

const playlistModule = 'playlistModule'

export default {
    name: 'Home',

    components: {
        PlaylistListManageForm,
    },
    methods: {
        ...mapActions(playlistModule, ['requestPlaylistByLoginAccountToSpring']),
    },
    async mounted() {
        await this.requestPlaylistByLoginAccountToSpring()
    },
    computed: {
        ...mapState(playlistModule, ['playlists'])
    }
}
</script>
  