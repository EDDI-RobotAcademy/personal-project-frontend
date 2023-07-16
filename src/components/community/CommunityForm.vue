<template lang="">
    <div align="center">
    <br>
        <v-container>
            <v-data-table :headers="communityHeaders" :items="communityBoards">
                <template #item.communityId="{ item }">
                {{ item.communityId }}
                </template>
                <template #item.title="{ item }">
                    <a :href="readNoticeLink(item.title)">{{ item.title }}</a>
                </template>
            </v-data-table>
        </v-container>
        <v-btn outlined color="black" to="/">홈으로</v-btn>
    </div>
</template>
<script>

import communityModule from '@/store/community/communityModule'
import { mapState } from 'vuex';

export default {
    data() {
        return {
            communityHeaders: [
                { text: '게시물 번호', value: 'communityId' },
                { text: 'Title', value: 'title', sortable: false },
                { text: 'Date', value: 'date' },
                { text: 'account', value: 'account' }
            ]
        }
    },
    props: {
        communityBoards: {
            type: Array
        }
    },
    computed: {
        ...mapState(communityModule, ['community'])
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