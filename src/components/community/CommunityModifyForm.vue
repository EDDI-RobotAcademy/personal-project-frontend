<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
        <v-container>
            <div>
                <label>Community ID</label>
                    <v-text-field label="ID" :value="communityBoard.communityId" style="width:500px;" disabled/>
            </div>
            <div>
                <label>Title</label>
                <v-text-field label="Title" v-model="title" style="width:500px;"/>
            </div>
            <div>
                <label>Writer</label>
                <v-text-field label="Writer" :value="communityBoard.accountId" style="width:500px;" disabled/>
            </div>
            <div>
                <label>Date</label>
                <v-text-field label="Date" :value="communityBoard.date" style="width:500px;" readonly/>
            </div>
            <div>
                <label>Content</label>
                <v-textarea label="Content" variant="outlined" v-model="content" outlined style="width:800px"/>
            </div>
            <div>
                <router-link :to="{ name: 'CommunityReadPage', params: { communityId: communityBoard.communityId.toString() }}">
                <v-btn class="communityButton">돌아가기</v-btn>
                </router-link>

                <v-btn class="communityButton" style="margin-left: 20px; float: right;" type="submit">수정 완료</v-btn>
                <v-btn style="float:right" color="red" @click="deleteBoard">삭제</v-btn>

            </div>
        </v-container>
        </form>
    </div>
</template>
<script>

import { mapActions } from 'vuex'
const communityModule = 'communityModule'

export default {
    name: 'CommunityModifyForm',
    props: {
        communityBoard: { type: Object, required: true, },
        communityId: { type: [String, Number], required: true, },
    },
    data() {
        return {
            title: '',
            content: '',
        }
    },
    created() {
        this.title = this.communityBoard.title
        this.content = this.communityBoard.content
    },
    methods: {
        onSubmit() {
            const { title, content } = this
            const communityId = this.communityId
            this.$emit('submit', { communityId, title, content })
        },
        ...mapActions(
            communityModule, ['communityBoardDelete']
        ),
        async deleteBoard() {
            await this.communityBoardDelete(this.communityId)
            await this.$router.push({ name: 'CommunityPage' })
        }

    }
}
</script>
<style scoped>
.communityButton {
    background-color: black !important;
    color: white;
}
</style>