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

const communityBoardModule = 'communityBoardModule'
export default {
    components: {
        CommunityRegistForm
    },
    name: "CommunityRegistPage",
    methods: {
        ...mapActions(
            communityBoardModule, ['createCommunityBoard']
        ),
        async onSubmit(payload) {
            const board = await this.createCommunityBoard(payload)
            console.log('typeof(board): ' + typeof (board))
            console.log('board: ' + JSON.stringify(board))
            await this.$router.push({ name: 'Home' })
        }
    }
}
</script>
<style lang="">
    
</style>