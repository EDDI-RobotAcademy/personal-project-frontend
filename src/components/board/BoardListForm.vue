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
                <td>{{ board.title }}</td>
                <!-- <td>{{ board.content }}</td> -->
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
    }
}
</script>
<style>
.textCenter {
    text-align: center;
}
</style>