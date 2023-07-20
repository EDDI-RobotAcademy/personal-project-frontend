<template lang="">
    <div>
        <br>
        <h2 style="text-align: center">Community Page</h2>
        <community-form v-if="communityBoards" :communityBoards="communityBoards"/>
        <p v-else> 잠시만 기다려 주세요 </p>

    <div>
        <v-btn class="communityButton" style="float:right;" @click='goregist'>글쓰기</v-btn>
    </div>

    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex';
import CommunityForm from '@/components/community/CommunityForm.vue';

const communityModule = 'communityModule'

export default {
    name: 'CommunityPage',
    components: { CommunityForm },
    computed: {
        ...mapState(communityModule, ['communityBoards']),
    },
    mounted() {
        this.communityListBoard()
    },
    methods: {
        ...mapActions(
            communityModule, ['communityListBoard']
        ),
        goregist() {
            this.$router.push({ name: 'CommunityRegistPage' });
        }
    },
}
</script>
<style scoped>
.communityButton {
    background-color: black !important;
    color: white;
}
</style>