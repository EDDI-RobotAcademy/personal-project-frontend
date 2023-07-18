<template>
    <div>
        <song-modify-manage-form v-if="song" :song="song" :playlistId="playlistId" @submit="onSubmit" />
    </div>
</template>

<script>
import SongModifyManageForm from '@/components/song/manage/SongModifyManageForm.vue';
import { mapActions, mapState } from 'vuex';
const songModule = 'songModule'
export default {
    components: {
        SongModifyManageForm
    },
    props: {
        songId: {
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
        ...mapActions(
            songModule, ['requestSongToSpring', 'requestModifySongToSpring']
        ),
        async onSubmit(payload) {
            const songId = Number(this.songId)

            await this.requestModifySongToSpring({ payload, songId })
            await this.$router.push({
                name: 'SongReadManagePage',
                params: { id: songId.toString(), playlistId: this.playlistId.toString() }
            })
        }
    },
    created() {
        this.requestSongToSpring(this.songId)
    }
}
</script>
<style lang="">
    
</style>