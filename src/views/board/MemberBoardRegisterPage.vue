<template>
    <div>
        <MemberBoardRegisterForm @submit="onSubmit"/> 
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import MemberBoardRegisterForm from '@/components/board/MemberBoardRegisterForm.vue'
const boardModule = 'boardModule'


export default {
    components: {
        MemberBoardRegisterForm,
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