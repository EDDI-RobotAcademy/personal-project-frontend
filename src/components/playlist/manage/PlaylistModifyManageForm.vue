<template>
    <v-container id="form-container" class="d-flex justify-center align-center" fluid>
        <v-card class="mx-auto pa-0 custom-card" color="white" width="500">
            <v-card-title class="custom-title">수정하기</v-card-title>
            <v-card-text>
                <form @submit.prevent="onSubmit">
                    <v-text-field label="제목" v-model="playlist.title" />
                    <v-row>
                        <v-col>
                            <v-btn color="black" text type="submit">수정</v-btn>
                            <v-btn @click="goBack" color="black" text>취소</v-btn>
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

<style lang="">
    
</style>