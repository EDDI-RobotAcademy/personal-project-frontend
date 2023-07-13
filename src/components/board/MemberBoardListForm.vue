<template lang="">
    <div>
        <v-simple-table 
            style="margin: 10px; width:1000px; margin: 0 auto"
            :items-per-page="5">
            <template>
            <thead>
                <tr>
                <th width="10%" style="text-align:center; font-size: 17px">번호</th>
                <th width="60%" style="text-align:center; font-size: 17px">제목</th>
                <th width="10%" style="text-align:center; font-size: 17px">작성자</th>
                <th width="20%" style="text-align:center; font-size: 17px">작성일자</th>
            </tr>
            </thead>
            <tbody style="border:">
            <tr v-if="!boards || (Array.isArray(boards) && boards.length === 0)">
                <td colspan="4">
                    현재 등록된 게시물이 없습니다!
                </td>
            </tr>
            <tr v-else v-for="board in boards" :key="board.boardId">
                <td align="center">
                    {{ board.boardId }}
                </td>
                <td align="center">
                    <router-link :to="{ 
                        name: 'MemberBoardReadPage',  
                        params: { boardId: board.boardId.toString() }}">
                            {{ board.title }}
                    </router-link>
                </td>
                <td align="center">
                    {{ board.nickName }}
                </td>
                <td align="center">
                    {{ board.createDate }}
                </td>
            </tr>
            </tbody>
            </template>
        </v-simple-table>
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

<style scoped>
.list_titles{
    font-size: 15px;
}
</style>