<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
            <table>
                <tr>
                    <td>제목</td>
                    <td>
                        <input type="text" v-model="playlist.title"/>
                    </td>
                </tr>
            </table>

            <div>
                <v-btn type="submit">수정하기</v-btn>
                <v-btn @click="goBack"> 돌아가기 </v-btn>
            </div>
        </form>
    </div>
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
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="">
    
</style>