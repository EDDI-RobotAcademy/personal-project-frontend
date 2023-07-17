<template lang="">
    <div>
        <v-container>
            <div>
                <label>Notice ID</label>
                    <v-text-field label="ID" :value="noticeBoard.noticeId" style="width:500px;" readonly/>
            </div>
            <div>
                <label>Title</label>
                <v-text-field label="Title" :value="noticeBoard.title" style="width:500px;" readonly/>
            </div>
            <div>
                <label>Writer</label>
                <v-text-field label="Writer" :value="noticeBoard.accountId" style="width:500px;" readonly/>
            </div>
            <div>
                <label>Date</label>
                <v-text-field label="Date" :value="noticeBoard.date" style="width:500px;" readonly/>
            </div>
            <div>
                <label>Content</label>
                <v-textarea label="Content" variant="outlined" :value="noticeBoard.content" outlined style="width:800px" readonly/>
            </div>
            <div>
                <router-link :to="{ name: 'NoticeModifyPage', params: { noticeId:noticeId }}">
                <v-btn class="noticeButton" style="float:right;">수정</v-btn>
                </router-link>
                <v-btn class="noticeButton"  @click="goBack">돌아가기</v-btn>  
            </div>
        </v-container>
    </div>
</template>
<script>
export default {
    name: "NoticeReadForm",
    props: {
        noticeBoard: {
            type: Object,
            required: true,
        },
        noticeId: {
            type: [String, Number],
            required: true,
        },
    },
    methods: {
        goBack() {
            this.$router.push('/notice-page')
        },
    },

}

</script>
<style scoped>
.noticeButton {
    background-color: black !important;
    color: white;
}
</style>