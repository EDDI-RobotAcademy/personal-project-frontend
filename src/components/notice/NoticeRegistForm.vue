<template lang="">
    <div>
        <v-form @submit.prevent="onSubmit" ref="form">
            <v-container>
            <div>
                <label>Title</label>
                    <v-text-field clearable label="Title" v-model="title" placeholder="제목을 입력하세요." style="width:500px;"/>
            </div>
            <div>
                <label>Content</label>
                    <v-textarea label="Content" variant="outlined" v-model="content" placeholder="내용을 입력하세요." outlined style="width:800px"/>
            </div>
            <div>
                <v-btn class="noticeButton" style="float:right;" type="submit">글 등록</v-btn>
                <v-btn class="noticeButton"  @click="goBack">돌아가기</v-btn>  
            </div>
            </v-container>
        </v-form>
    </div>
</template>
<script>
export default {
    name: "NoticeRegistForm",
    data() {
        return {
            title: '',
            content: '',
        }
    },
    methods: {
        onSubmit() {
            const { title, content } = this
            this.$emit('submit', { title, content })
        },
        goBack() {
            this.$router.push('/notice-page')
        },
    }
}
</script>
<style scoped>
.noticeButton {
    background-color: black !important;
    color: white;
}
</style>