<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
        <v-container>
            <div>
                <label>Notice ID</label>
                    <v-text-field label="ID" :value="noticeBoard.noticeId" style="width:500px;" disabled/>
            </div>
            <div>
                <label>Title</label>
                <v-text-field label="Title" v-model="title" style="width:500px;"/>
            </div>
            <div>
                <label>Writer</label>
                <v-text-field label="Writer" :value="noticeBoard.accountId" style="width:500px;" disabled/>
            </div>
            <div>
                <label>Date</label>
                <v-text-field label="Date" :value="noticeBoard.date" style="width:500px;" readonly/>
            </div>
            <div>
                <label>Content</label>
                <v-textarea label="Content" variant="outlined" v-model="content" outlined style="width:800px"/>
            </div>
            <div>
                <router-link :to="{ name: 'NoticeReadPage', params: { noticeId: noticeBoard.noticeId.toString() }}">
                <v-btn class="noticeButton">돌아가기</v-btn>
                </router-link>

                <v-btn class="noticeButton" style="margin-left: 20px; float: right;" type="submit">수정 완료</v-btn>
                <v-btn style="float:right" color="red" @click="deleteBoard">삭제</v-btn>

            </div>
        </v-container>
        </form>
    </div>
</template>
<script>

import { mapActions } from 'vuex'
const noticeModule = 'noticeModule'

export default {
    name: 'NoticeModifyForm',
    props: {
        noticeBoard: { type: Object, required: true, },
        noticeId: { type: [String, Number], required: true, },
    },
    data() {
        return {
            title: '',
            content: '',
        }
    },
    created() {
        this.title = this.noticeBoard.title
        this.content = this.noticeBoard.content
    },
    methods: {
        onSubmit() {
            const { title, content } = this
            const noticeId = this.noticeId
            this.$emit('submit', { noticeId, title, content })
        },
        ...mapActions(
            noticeModule, ['noticeBoardDelete']
        ),
        async deleteBoard() {
            await this.noticeBoardDelete(this.noticeId)
            await this.$router.push({ name: 'NoticePage' })
        }

    }
}
</script>
<style scoped>
.noticeButton {
    background-color: black !important;
    color: white;
}
</style>