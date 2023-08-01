<template lang="">
    <div>
        <br>
        <h2 style="text-align: center">Notice Page</h2>
        <notice-form v-if="noticeBoards" :noticeBoards="noticeBoards"/>
        <p v-else> 잠시만 기다려 주세요 </p>

    <div>
        <v-btn class="noticeButton" style="float:right;" @click='goregist'>글쓰기</v-btn>
    </div>

    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex';
import NoticeForm from '@/components/notice/NoticeForm.vue';

const noticeModule = 'noticeModule'

export default {
    name: 'NoticePage',
    components: { NoticeForm },
    computed: {
        ...mapState(noticeModule, ['noticeBoards']),
    },
    mounted() {
        this.noticeListBoard()
    },
    methods: {
        ...mapActions(
            noticeModule, ['noticeListBoard']
        ),
        goregist() {
            this.$router.push({ name: 'NoticeRegistPage' });
        }
    },
}
</script>
<style scoped>
.noticeButton {
    background-color: black !important;
    color: white;
}
</style>