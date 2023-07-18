<template lang="">
    <div>
        <song-read-form v-if="song" :song="song" :playlistId="playlistId" />
        <p v-else>로딩중 .......</p>
    </div>
</template>
<script>
import SongReadForm from '@/components/song/user/SongReadForm.vue'

export default {
    components: {
        SongReadForm,
    },
    props: {
        song: {
            type: Object,
            required: true,
        },
        playlistId: {
            type: String,
            required: true,
        },
    },
}
</script>
<style lang="">
    
</style>