<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
            <table>
                <tr>
                    <td>제목</td>
                    <td>
                        <input type="text" v-model="title"/>
                    </td>
                </tr>
                <tr>
                    <td>가수</td>
                    <td>
                        <input type="text" v-model="singer"/>
                    </td>
                </tr>
                <tr>
                    <td>장르</td>
                    <td>
                        <input type="text" v-model="genre"/>
                    </td>
                </tr>
                <tr>
                    <td>유튜브 링크</td>
                    <td>
                        <input type="text" v-model="link"/>
                    </td>
                </tr>
            </table>

            <div>
                <button type="submit">등록</button>
                <v-btn @click="cancel">취소</v-btn>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '제목 입력',
            singer: '가수 입력',
            genre: '장르 입력',
            link: '유튜브 링크 입력',
        }
    },
    methods: {
        onSubmit() {
            const { title, singer, genre, link } = this
            this.$emit('submit', { title, singer, genre, link })
        },
        cancel() {
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="">
    
</style>