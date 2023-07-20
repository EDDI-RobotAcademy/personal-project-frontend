<template lang="">
    <div>
        <br>
        <h2 style="text-align:center;">Notice Regist Page</h2>
        <notice-regist-form @submit="onSubmit"/>
    </div>
</template>
<script>

import NoticeRegistForm from '@/components/notice/NoticeRegistForm.vue';
import { mapActions } from 'vuex';

const noticeModule = 'noticeModule'
export default {
    components: {
        NoticeRegistForm,
    },
    name: 'NoticeRegistPage',
    methods: {
        ...mapActions(
            noticeModule, ['createNoticeBoard']
        ),
        async onSubmit(payload) {
            const board = await this.createNoticeBoard(payload)
            console.log('board: ' + JSON.stringify(board.data))
            await this.$router.push({ name: 'NoticePage', })
        }
    },

}
</script>
<style lang="">
    
</style>