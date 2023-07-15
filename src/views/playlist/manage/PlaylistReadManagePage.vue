<template lang="">
    <div>
        <playlist-read-manage-form v-if="playlist" :playlist="playlist"/>
        <p v-else>로딩중 .......</p>
    </div>
</template>
<script>
import PlaylistReadManageForm from '@/components/playlist/manage/PlaylistReadManageForm.vue'
import { mapActions, mapState } from 'vuex'

const playlistModule = 'playlistModule'

export default {
    components: {
        PlaylistReadManageForm,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState(playlistModule, ['playlist'])
    },
    methods: {
        ...mapActions(playlistModule, ['requestPlaylistToSpring'])
    },
    created() {
        this.requestPlaylistToSpring(this.id)
    }
}
</script>
<style lang="">
    
</style>