<template lang="">
    <div>
        <v-container>
            <v-data-table :headers="noticeHeaders" :items="noticeBoards">
            <template #item.noticeId="{ item }">
                {{ item.noticeId }}
            </template>
            <template #item.title="{ item }">
            <a :href="readNoticeLink(item.title)">{{ item.title }}</a>
            </template>
            </v-data-table>
        </v-container>
    </div>
</template>
<script>
import noticeModule from '@/store/notice/noticeModule';
import { mapActions, mapState } from 'vuex';

export default {
    name: "NoticeForm",
    data() {
        return {
            noticeHeaders: [
                { text: '게시물 번호', value: 'noticeId' },
                { text: '게시물 제목', value: 'title', sortable: false },
                { text: '작성 일자', value: 'date' }
            ]
        }
    },
    props: {
        noticeBoards: {
            type: Array
        }
    },
    computed: {
        ...mapState(noticeModule, ['noticeBoard'])
    },
    methods: {
        readNoticeLink(title) {
            return `/notice/${title}`;
        },
    }
}
</script>
<style lang="">
    
</style>