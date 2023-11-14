<template lang="">
    <div>
        <NaviTest />
        <div style="padding-top: 90px;"></div>
        <h4 style="text-align: center; margin: 30px; font-weight: bold; color: #83c1e7;;">게시글 수정</h4>
        <board-modify-form v-if="board" :board="board" @submit="onSubmit" />
    <p v-else class="board-read-text">로딩중 .......</p>
    </div>
</template>
<script>
import NaviTest from "@/components/NaviTest.vue"
import BoardModifyForm from '@/components/board/BoardModifyForm.vue'
import { mapState, mapActions } from "vuex";
const boardModule = 'boardModule'
export default {
    name: "BoardModifyPage",
    components: {
        NaviTest,
        BoardModifyForm
    },
    props: {
        boardId: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapState(boardModule, ["board"]),
    },
    created() {
        this.requestBoardToSpring(this.boardId);
    },
    methods: {
        ...mapActions(boardModule, ["requestBoardToSpring", "requestModifyBoardToSpring"]),
        async onSubmit(payload) {
            const { title, content, userEmail } = payload;
            const boardId = this.boardId;

            await this.requestModifyBoardToSpring({ boardId, title, content, userEmail });

            await this.$router.push({
                name: "BoardReadPage",
                params: { boardId: this.boardId },
            });
        },
    }
}
</script>
<style lang="">
    
</style>