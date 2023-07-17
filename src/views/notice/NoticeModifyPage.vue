<template lang="">
    <div>
        <br>
        <h2 style="text-align: center">Notice Modify Page</h2>
        <notice-modify-form v-if="noticeBoard" :noticeBoard="noticeBoard" :noticeId="noticeId" @submit="onSubmit"/>
        <p v-else> 잠시만 기다려 주세요 </p>
    </div>
</template>
<script>

import NoticeModifyForm from '@/components/notice/NoticeModifyForm.vue';
import { mapActions, mapState } from 'vuex';

const noticeModule = 'noticeModule'

export default {
    name: 'NoticeModifyPage',
    components: { NoticeModifyForm },
    props: {
        noticeId: {
            type: [String, Number],
            required: true,
        }
    },
    computed: {
        ...mapState(noticeModule, ['noticeBoard'])
    },
    methods: {
        ...mapActions(
            noticeModule, ['noticeBoardInfo', 'noticeBoardModify']
        ),
        async onSubmit(payload) {
            const { title, content } = payload
            await this.noticeBoardModify({ noticeId, title, content })
            await this.$router.push({ name: 'NoticeReadPage', params: { noticeId: this.noticeId } })
        }
    },
    created() {
        this.noticeBoardInfo(this.noticeId)
    }
}
</script>
<style lang="">
    
</style>