<template lang="">
    <div>
        <br>
        <h2 align="center">Notice List Page</h2>
        <notice-list-form :noticeBoards="noticeBoards"/>
             
    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex';
import NoticeForm from '@/components/notice/NoticeForm.vue';

const noticeModule = 'noticeModule'

export default {
    data() {
        return {
        }
    },
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