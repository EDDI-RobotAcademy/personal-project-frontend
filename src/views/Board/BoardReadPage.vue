<template>
    <div>
        <NaviTest />
        <div style="padding-top: 90px;"></div>
        <h4 style="text-align: center; margin: 30px; font-weight: bold; color: #83c1e7;;">Board</h4>
        <table class="table table-light" style="width: 800px; margin: auto; font-weight: 700;">
            <colgroup>
                <col width=20%>
                <col width=80%>
            </colgroup>
            <tbody>
                <tr>
                    <td class="table-warning">작성번호</td>
                    <td> {{ board.boardId }} </td>
                </tr>
                <tr>
                    <td class="table-warning">작성자</td>
                    <td> {{ board.userEmail }} </td>
                </tr>
                <tr>
                    <td class="table-warning">제목</td>
                    <td> {{ board.title }} </td>
                </tr>
                <tr style="height: 200px;">
                    <td class="table-warning">내용</td>
                    <td> {{ board.content }} </td>
                </tr>
            </tbody>
        </table>
        <div class="deleteDiv">
            <button type="button" class="btn btn-custom2" @click="deleteBoard()">삭제</button>
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
            boardModule, ['requestBoardToSpring', 'requestDeleteBoardToSpring']
        ),
        deleteBoard() {
            const boardId = this.$route.params.boardId;
            this.requestDeleteBoardToSpring(boardId)
        }
    },
    mounted() {
        const boardId = this.$route.params.boardId;
        this.requestBoardToSpring(boardId)
    }
}
</script>
<style>
.table-warning {
    text-align: center;
}

.deleteDiv {
    text-align: center;
    margin-top: 10px;
}
</style>