<template lang="">
    <div>
        <v-container>
            <v-data-table :headers="communityHeaders" :items="communityBoards">
            <template #item.communityId="{ item }">
                {{ item.communityId }}
            </template>
            <template #item.title="{ item }">
             <router-link :to="{ name: 'CommunityReadPage', params: { communityId: item.communityId } }">
                {{ item.title }}
             </router-link>
            </template>

            </v-data-table>
        </v-container>
    </div>
</template>
<script>

import communityModule from '@/store/community/communityModule';
import { mapState } from 'vuex';

export default {
    name: "CommunityRegistForm",
    data() {
        return {
            communityHeaders: [
                { text: '게시물 번호', value: 'communityId' },
                { text: '게시물 제목', value: 'title', sortable: false },
                { text: '작성 일자', value: 'date' }
            ]
        }
    },
    props: {
        communityBoards: {
            type: Array
        }
    },
    computed: {
        ...mapState(communityModule, ['communityBoard'])
    },
    methods: {
    }
}
</script>
<style scoped></style>