<template lang="">
    <div>
        <v-container>
            <v-data-table :headers="noticeHeaders" :items="noticeBoards">
            <template #item.noticeTitle="{ item }">
            <a :href="generateNoticeLink(item.noticeTitle)">{{ item.noticeTitle }}</a>

            </template>
            </v-data-table>
        </v-container>
    </div>
</template>
<script>
import noticeBoardModule from '@/store/notice/noticeModule';
import { mapActions, mapState } from 'vuex';

export default {
    props: {
        noticeBoards: {
            type: Array
        }
    },


    data() {
        return {
            noticeHeaders: [
                { text: '게시물 번호', value: 'noticeNumber' },
                { text: '게시물 제목', value: 'noticeTitle', sortable: false },
                { text: '작성 일자', value: 'noticeDate' }
            ]
        }
    },
    props: {
        noticeBoards: {
            type: Array
        }
    },
    computed: {
        ...mapState(noticeBoardModule, ['noticeBoard'])
    },
}
</script>
<style lang="">
    
</style>