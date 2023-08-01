<template lang="">
    <div>
        <br>
        <h2 style="text-align: center">Community Modify Page</h2>
        <community-modify-form v-if="communityBoard" :communityBoard="communityBoard" :communityId="communityId" @submit="onSubmit"/>
        <p v-else> 잠시만 기다려 주세요 </p>
    </div>
</template>
<script>

import CommunityModifyForm from '@/components/community/CommunityModifyForm.vue';
import { mapActions, mapState } from 'vuex';

const communityModule = 'communityModule'

export default {
    name: 'CommunityModifyPage',
    components: { CommunityModifyForm },
    props: {
        communityId: {
            type: [String, Number],
            required: true,
        }
    },
    computed: {
        ...mapState(communityModule, ['communityBoard'])
    },
    methods: {
        ...mapActions(
            communityModule, ['communityBoardInfo', 'communityBoardModify']
        ),
        async onSubmit(payload) {
            const { title, content } = payload
            const communityId = this.communityId;
            await this.communityBoardModify({ communityId, title, content })
            await this.$router.push({ name: 'CommunityReadPage', params: { communityId: this.communityId } })
        }
    },
    created() {
        this.communityBoardInfo(this.communityId)
    }
}
</script>
<style lang="">
    
</style>