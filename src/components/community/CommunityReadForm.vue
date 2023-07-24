<template lang="">
    <div>
        <v-container>
            <div>
                <label>Community ID</label>
                    <v-text-field label="ID" :value="communityBoard.communityId" style="width:500px;" readonly/>
            </div>
            <div>
                <label>Title</label>
                <v-text-field label="Title" :value="communityBoard.title" style="width:500px;" readonly/>
            </div>
            <div>
                <label>Writer</label>
                <v-text-field label="Writer" :value="communityBoard.accountId" style="width:500px;" readonly/>
            </div>
            <div>
                <label>Date</label>
                <v-text-field label="Date" :value="communityBoard.date" style="width:500px;" readonly/>
            </div>
            <div>
                <label>Content</label>
                <v-textarea label="Content" variant="outlined" :value="communityBoard.content" outlined style="width:800px" readonly/>
            </div>
            <div>
                <router-link :to="{ name: 'CommunityModifyPage', params: { communityId:communityId }}">
                <v-btn class="communityButton" style="float:right;">수정</v-btn>
                </router-link>
                <v-btn class="communityButton"  @click="goBack">돌아가기</v-btn>  
            </div>
        </v-container>
    </div>
</template>
<script>
export default {
    name: "CommunityReadForm",
    props: {
        communityBoard: {
            type: Object,
            required: true,
        },
        communityId: {
            type: [String, Number],
            required: true,
        },
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },

}

</script>
<style scoped>
.communityButton {
    background-color: black !important;
    color: white;
}
</style>