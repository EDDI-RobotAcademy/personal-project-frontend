<!-- <template lang="">
   <v-container>      
      <v-data-table
          v-model:items-per-page="perPage"
          :headers="headerTitle"
          :items="pagedItems"
          :pagination.sync="pagination"
          item-value="name"
          class="elevation-1"
          @click:row="readRow"
          item-key="boardId"/>
      <v-pagination
          v-model="pagination.page"
          :length="Math.ceil(boards.length / perPage)"
          color="primary"
          @input="updateItems"/>
    </v-container>
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
<style lang="">
    
</style> -->
<template lang="">
    <div>
        <h3>게시물 목록</h3>
        <table style="margin: 10px;">
            <tr>
                <th align="center" width="6%">번호</th>
                <th align="center" width="70%">제목</th>
                <th align="center" width="10%">작성자</th>
                <th align="center" width="14%">등록일자</th>
            </tr>
            <tr v-if="!boards || (Array.isArray(boards) && boards.length === 0)">
                <td colspan="4">
                    현재 등록된 게시물이 없습니다!
                </td>
            </tr>
            <tr v-else v-for="board in boards" :key="board.id">
                <td align="center">
                    {{ board.id }}
                </td>
                <td align="center">
                    <router-link :to="{ 
                        name: 'BoardReadPage', 
                        params: { id: board.id.toString() }}">
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

<style lang="">
    
</style>