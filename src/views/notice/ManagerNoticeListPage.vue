<template lang="">
    <div>
        <br>
        <h2 align="center">Notice List Page</h2>
        <manager-notice-list-form :noticeBoards="noticeBoards"/>
    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex';
import ManagerNoticeListForm from '@/components/notice/ManagerNoticeListForm.vue';

const noticeBoardModule = 'noticeBoardModule'

export default {
    data() {
        return {

        }
    },
    components: { ManagerNoticeListForm },
    computed: {
        ...mapState(noticeBoardModule, ['noticeBoards']),
    },
    mounted() {
        this.noticeListBoard()
    },
    methods: {
        ...mapActions(
            noticeBoardModule, ['noticeListBoard']
        )
    },
}
</script>
<style lang="">
    
</style>