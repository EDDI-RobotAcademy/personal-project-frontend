<template lang="">
    <div>
        <br>
        <h2 style="text-align: center">Notice Read Page</h2>
        <notice-read-form v-if="noticeBoard" :noticeBoard="noticeBoard" :noticeId="noticeId"/>
        <p v-else> 잠시만 기다려 주세요 </p>
    </div>
</template>
<script>

import NoticeReadForm from '@/components/notice/NoticeReadForm.vue';
import { mapActions, mapState } from 'vuex';

const noticeModule = 'noticeModule'

export default {
    name: 'NoticeReadPage',
    components: { NoticeReadForm },
    props: {
        noticeId: {
            type: [String, Number],
            required: true,
        },
    },
    computed: {
        ...mapState(noticeModule, ['noticeBoard'])
    },
    methods: {
        ...mapActions(
            noticeModule, ['noticeBoardInfo']
        ),
    },
    created() {
        this.noticeBoardInfo(this.noticeId)
    }
}
</script>
<style lang="">
    
</style>