<template>
    <div>
        <MemberBoardRegisterForm @submit="onSubmit"/> 
        <!-- <Test2 @submit="onSubmit"/> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import MemberBoardRegisterForm from '@/components/board/MemberBoardRegisterForm.vue'
// import Test2 from '@/components/test2.vue'
const boardModule = 'boardModule'


export default {
    components: {
        MemberBoardRegisterForm,
        // Test2
    },
    name: "MemberBoardRegisterPage",
    methods: {
        ...mapActions( 
            boardModule, ['requestCreateBoardToSpring']
        ),
        async onSubmit (payload) {
            const board = await this.requestCreateBoardToSpring(payload)
            console.log('board: ' + JSON.stringify(board))
            
            await this.$router.push({
                name: 'MemberBoardReadPage',
                params: { boardId: board.data.boardId.toString() }
            })
        }
    }
}
</script>

<style scoped>

</style>