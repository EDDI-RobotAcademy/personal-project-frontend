<template>
    <v-container id="form-container" class="d-flex justify-center align-center" fluid>
        <v-card class="mx-auto pa-0 custom-card" color="white" width="500">
            <button class="back-button" @click="goBack" style="margin-left: 15px; margin-top: 15px;">
                <v-icon>mdi-arrow-left</v-icon>
            </button>
            <v-card-title class="custom-title">수정하기</v-card-title>
            <v-card-text>
                <form @submit.prevent="onSubmit">
                    <v-text-field label="제목" v-model="playlist.title" />
                    <v-row>
                        <v-col>
                            <v-btn color="black" text type="submit">수정</v-btn>
                        </v-col>
                    </v-row>
                </form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: {
        playlist: {
            type: Object,
            required: true,
        }
    },
    methods: {
        onSubmit() {
            const title = this.playlist.title
            this.$emit('submit', { title })
        },
        async goBack() {
            await this.$router.push({
                name: 'PlaylistReadManagePage',
                params: { id: this.playlist.id.toString() }
            })
        },
    }
}
</script>

<style>
.custom-title {
    display: flex;
    justify-content: center !important;
}
</style>