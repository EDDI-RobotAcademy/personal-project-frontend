<template lang="">
    <div>
        <table>
            <tr>
                <td>제목</td>
                <td>
                    <input type="text" :value="song.title" readonly/>
                </td>
            </tr>
            <tr>
                <td>가수</td>
                <td>
                    <input type="text" :value="song.singer" readonly/>
                </td>
            </tr>
            <tr>
                <td>장르</td>
                <td>
                    <input type="text" :value="song.genre" readonly/>
                </td>
            </tr>
            <tr>
                <td>유튜브 링크</td>
                <td>
                    <input type="text" :value="song.link" readonly/>
                </td>
            </tr>
            <v-btn @click="onModify"> 수정 </v-btn>
            <v-btn @click="onDelete"> 삭제 </v-btn>
            <v-btn @click="goBack"> 돌아가기 </v-btn>
        </table>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

const songModule = 'songModule'

export default {
    data() {
        return {
            deletePass: false,
        }
    },
    props: {
        song: {
            type: Object,
            required: true,
        },
        playlistId: {
            type: String,
            required: true,
        }
    },
    methods: {
        ...mapActions(songModule, ['requestDeleteSongToSpring']),
        async onModify() {
            const songId = this.song.id
            await this.$router.push({
                name: 'SongModifyManagePage',
                params: { songId: songId.toString(), playlistId: this.playlistId.toString() }
            })
        },
        async goBack() {
            await this.$router.push({
                name: 'PlaylistReadManagePage',
                params: { id: this.playlistId.toString() }
            })
        },
        async onDelete() {
            this.deletePass = this.requestDeleteSongToSpring(Number(this.song.id))
            console.log(this.song.id)
            if (this.deletePass) {
                await this.$router.push({
                    name: 'PlaylistReadManagePage',
                    params: { id: this.playlistId.toString() }
                })
            }
        },
    },
}
</script>
<style lang="">
    
</style>