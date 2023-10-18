<template>
    <div>
        <table style="margin: 30px">
            <!-- 1줄 -->
            <tr class="textCenter">
                <th width="2%">번호</th>
                <th width="10%">제목</th>
                <th width="5%">작성자</th>
            </tr>
            <tr v-for="board in boards" :key="board.boardId" class="textCenter">
                <td>{{ board.boardId }}</td>
                <!-- <td @click="goReadPage(board)">{{ board.title }}</td> -->
                <td>
                    <router-link :to="{
                        name: 'BoardReadPage',
                        params: { boardId: board.boardId.toString() }
                        // params: { boardId: board.boardId }
                    }">
                        {{ board.title }}
                    </router-link>
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
        // goReadPage(board) {
        //     // board 데이터를 props로 전달하여 BoardReadPage에서 활용
        //     this.$router.push({
        //         name: 'BoardReadPage',
        //         params: { boardId: board.boardId },
        //         props: { boardData: board }
        //     })
        // }
    }
}

</script>
<style>
.textCenter {
    text-align: center;
}
</style>