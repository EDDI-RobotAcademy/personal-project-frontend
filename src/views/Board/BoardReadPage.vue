<template>
    <div>
        <NaviTest />
        <board-read-form v-if="board" :board="board" />
        <!-- <BoardReadForm v-if="board" :board="board" /> -->
    </div>
</template>
<script>
import NaviTest from "@/components/NaviTest.vue"
import BoardReadForm from '@/components/board/BoardReadForm.vue'

import { mapActions, mapState } from 'vuex';

const boardModule = 'boardModule'
export default {
    name: "BoardReadForm",
    props: {
        boardId: {
            type: String,
            required: true,
        }
    },
    components: {
        NaviTest,
        BoardReadForm
    },
    computed: {
        ...mapState(boardModule, ['board'])
    },
    methods: {
        ...mapActions(
            boardModule, ['requestBoardToSpring']
        ),
    },
    created() {
        console.log(this.boardId)
        this.requestBoardToSpring(this.boardId)
    }
}
</script>
<style></style>