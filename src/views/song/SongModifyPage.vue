<template>
    <div>
        <h2>노래 정보 수정</h2>
        <song-modify-form v-if="song" :song="song" @submit="onSubmit" />
    </div>
</template>

<script>
import SongModifyForm from '@/components/song/SongModifyForm.vue';
import { mapActions, mapState } from 'vuex';
const songModule = 'songModule'
export default {
    components: {
        SongModifyForm
    },
    props: {
        songId: {
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
                name: 'SongReadPage',
                params: { id: songId.toString() }
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