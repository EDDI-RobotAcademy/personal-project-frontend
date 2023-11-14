<template>
    <div>
        <table style="margin: 30px">
            <tr class="textCenter">
                <th width="2%">번호</th>
                <th width="10%">제목</th>
                <th width="5%">작성자</th>
            </tr>
            <tr v-for="board in boards" :key="board.boardId" class="textCenter">
                <td>{{ board.boardId }}</td>
                <td @click="readBoard(board.boardId)">
                    {{ board.title }}
                </td>
                <td>{{ board.userEmail }}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        boards: {
            type: Array
        }
    },
    methods: {
        readBoard(boardId) {
            this.$router.push({ path: `/boardReadPage/${boardId}` })
        }
    }
}

</script>
<style>
.textCenter {
    text-align: center;
}
</style>