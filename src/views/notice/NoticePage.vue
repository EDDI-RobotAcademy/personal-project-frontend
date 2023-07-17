<template lang="">
    <div>
        <br>
        <h2 style="text-align: center">Notice List Page</h2>
        <notice-form v-if="noticeBoards" :noticeBoards="noticeBoards"/>
        <p v-else> 잠시만 기다려 주세요 </p>
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
        )
    },
}
</script>
<style lang="">
    
</style>