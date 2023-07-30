<template>
    <v-container id="form-container" class="d-flex justify-center align-center" fluid>
        <v-row justify="center">
            <v-col cols="12" lg="8" xl="6">
                <v-card
                    style="width: 60%; padding: 20px; background-color: rgba(255, 255, 255, 0.8); border: 3px solid #000000; border-radius: 25px; margin: 0 auto;">
                    <button class="back-button" @click="goBack" style="margin-left: 10px; margin-top: 5px;">
                        <v-icon>mdi-arrow-left</v-icon>
                    </button>
                    <v-card-text>
                        <form @submit.prevent="onSubmit">
                            <v-text-field label="제목" :value="song.title" readonly />
                            <v-text-field label="가수" :value="song.singer" readonly />
                            <v-text-field label="유튜브 링크" :value="song.link" readonly />
                            <v-row>
                                <v-col style="text-align: center;">
                                    <v-btn class="mr-3" @click="onModify"> 수정 </v-btn>
                                    <v-btn @click="onDelete"> 삭제 </v-btn>
                                </v-col>
                            </v-row>
                        </form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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
            this.deletePass = await this.requestDeleteSongToSpring(Number(this.song.id))
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
<style>
#form-container {
    height: 70vh;
}
</style>