<template lang="">
    <div>
        <song-read-manage-form v-if="song" :song="song" :playlistId="playlistId"/>
        <p v-else>로딩중 .......</p>
    </div>
</template>
<script>
import SongReadManageForm from '@/components/song/manage/SongReadManageForm.vue'
import { mapActions, mapState } from 'vuex'

const songModule = 'songModule'

export default {
    components: {
        SongReadManageForm,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        playlistId: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(songModule, ['song'])
    },
    methods: {
        ...mapActions(songModule, ['requestSongToSpring'])
    },
    created() {
        this.requestSongToSpring(this.id)
    }
}
</script>
<style lang="">
    
</style>