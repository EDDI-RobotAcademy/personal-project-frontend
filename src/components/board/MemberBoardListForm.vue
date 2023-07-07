<template lang="">
    <div>
        <h1 class="list_title_1">나만의 카페 공유</h1>
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
                        name: 'BoardReadPage',  
                        params: { boardId: board.boardId.toString() }}">
                            {{ board.title }}
                    </router-link>
                </td>
                <td align="center">
                    {{ board.writer }}
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

<style>
.list_title_1{
    min-height: 30px;
    margin: 40px 0 30px;
    text-align: center;
}
.list_titles{
    font-size: 15px;
}
</style>