<template lang="">
    <div>
        <br>
        <h2 style="text-align: center">Community Read Page</h2>
        <community-read-form v-if="communityBoard" :communityBoard="communityBoard" :communityId="communityId"/>
        <p v-else> 잠시만 기다려 주세요 </p>
    </div>
</template>
<script>

import CommunityReadForm from '@/components/community/CommunityReadForm.vue'
import { mapActions, mapState } from 'vuex';

const communityModule = 'communityModule'

export default {
    name: 'CommunityReadPage',
    components: { CommunityReadForm },
    props: {
        communityId: {
            type: [String, Number],
            required: true,
        },
    },
    computed: {
        ...mapState(communityModule, ['communityBoard'])
    },
    methods: {
        ...mapActions(
            communityModule, ['communityBoardInfo']
        ),
    },
    created() {
        this.communityBoardInfo(this.communityId)
    }
}
</script>
<style lang="">
    
</style>