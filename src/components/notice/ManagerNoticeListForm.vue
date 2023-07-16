<template lang="">
    <div>
        <v-container>
            <v-data-table :headers="noticeHeaders" :items="noticeBoards">
            <template #item.noticeNumber="{ item }">
                {{ item.noticeNumber }}
            </template>
            <template #item.noticeTitle="{ item }">
            <a :href="readNoticeLink(item.noticeTitle)">{{ item.noticeTitle }}</a>
            </template>

            </v-data-table>
        </v-container>
    </div>
</template>
<script>
import noticeBoardModule from '@/store/notice/noticeModule';
import { mapActions, mapState } from 'vuex';

export default {
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
    methods: {
        readNoticeLink(noticeTitle) {
            return `/notice/${noticeTitle}`;
        },
    }
}
</script>
<style lang="">
    
</style>