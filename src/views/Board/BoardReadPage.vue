<template>
    <div>
        <NaviTest />
        <div style="padding-top: 100px;">
            <h1>작성번호: {{ board.boardId }}</h1>
            <h1>작성자 : {{ board.userEmail }}</h1>
            <h1>제목 : {{ board.title }}</h1>
            <h1>내용 : {{ board.content }}</h1>
        </div>
    </div>
</template>
<script>
import NaviTest from "@/components/NaviTest.vue"

import { mapActions, mapState } from 'vuex';

const boardModule = 'boardModule'
export default {
    name: "BoardReadPage",
    components: {
        NaviTest,
    },
    computed: {
        ...mapState(boardModule, ['board'])
    },
    methods: {
        ...mapActions(
            boardModule, ['requestBoardToSpring']
        ),
    },
    mounted() {
        const boardId = this.$route.params.boardId;
        console.log(boardId)
        this.requestBoardToSpring(boardId)
    }
}
</script>
<style></style>