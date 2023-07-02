<template lang="">
    <div>
        <br>
        <h2 align="center">Notice Regist Page</h2>
        <manager-notice-regist-form @submit="onSubmit"/>
    </div>
</template>
<script>

import ManagerNoticeRegistForm from '@/components/manager/notice/ManagerNoticeRegistForm.vue'
import { mapActions } from 'vuex';

const noticeBoardModule = 'noticeBoardModule'
export default {
    components: {
        ManagerNoticeRegistForm,
    },
    name: 'ManagerNoticeRegistPage',
    methods: {
        ...mapActions(
            noticeBoardModule, ['createNoticeBoard']
        ),
        async onSubmit(payload) {
            const board = await this.createNoticeBoard(payload)

            console.log('typeof(board): ' + typeof (board))
            console.log('board: ' + JSON.stringify(board))

            await this.$router.push({ name: 'ManagerNoticeListPage', })
        }
    },

}
</script>
<style lang="">
    
</style>