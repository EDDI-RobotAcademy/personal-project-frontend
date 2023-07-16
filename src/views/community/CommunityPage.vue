<template lang="">
    <div>
        <h2 style="text-align: center">Community Page</h2>
        <community-form :communityBoards="communityBoards"/>
        <br>
    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex';
import CommunityForm from '@/components/community/CommunityForm.vue';

const communityModule = 'communityModule'

export default {
    components: { CommunityForm },
    computed: {
        ...mapState(communityModule, ['communityBoards']),
    },
    mounted() {
        this.requestCommunityBoardList()
    },
    methods: {
        ...mapActions(
            communityModule, ['requestCommunityBoardList']
        )
    },
}
</script>
<style lang="">
    
</style>