<template lang="">
    <div>
        <v-container>
            <v-data-table :headers="noticeHeaders" :items="noticeBoards">
            <template #item.noticeId="{ item }">
                {{ item.noticeId }}
            </template>
            <template #item.title="{ item }">
             <router-link :to="{ name: 'NoticeReadPage', params: { noticeId: item.noticeId } }">
                {{ item.title }}
             </router-link>
            </template>

            </v-data-table>
        </v-container>
    </div>
</template>
<script>
import noticeModule from '@/store/notice/noticeModule';
import { mapState } from 'vuex';

export default {
    name: "NoticeRegistForm",
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

    }
}
</script>
<style scoped>
.noticeButton {
    background-color: black !important;
    color: white;
}
</style>