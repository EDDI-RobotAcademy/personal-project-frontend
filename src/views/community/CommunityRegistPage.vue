<template lang="">
    <div>
        <br>
        <h2 style="text-align: center;">Community Regist Page</h2>
        <community-regist-form @submit="onSubmit"/>
    </div>
</template>
<script>

import CommunityRegistForm from "@/components/community/CommunityRegistForm.vue"
import { mapActions } from "vuex";

const communityModule = 'communityModule'
export default {
    components: {
        CommunityRegistForm
    },
    name: "CommunityRegistPage",
    methods: {
        ...mapActions(
            communityModule, ['createCommunityBoard']
        ),
        async onSubmit(payload) {
            const board = await this.createCommunityBoard(payload)
            console.log('board: ' + JSON.stringify(board.data))
            await this.$router.push({ name: 'CommunityPage' })
        }
    }
}
</script>
<style lang="">
    
</style>