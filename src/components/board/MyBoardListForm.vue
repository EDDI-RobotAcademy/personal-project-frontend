<template lang="">
    <div>
    <div>
        <h1 class="list_title">나의 게시글 관리</h1><br>
    </div>
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
                <td align="center" @click="readBoard(board.boardId)">
                    {{ board.title }}
                </td>
                <td align="center">
                    {{ board.nickname }}
                </td>
                <td align="center">
                    {{ board.createDate }}
                </td>
            </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-pagination class="pagination" v-model="page" :length="totalPage" circle @btnClick="sendPage"></v-pagination>
    </div>
</template>

<script>
import { mapState } from 'vuex'
const memberModule = 'memberModule'

export default {
    props: {
        boards: {
            type: Array
        },
        totalPage: {
            type: Number
        }
    },
    data() {
        return {
            page: 1
        }
    },
    methods: {
        sendPage() {
            const page = this.page
            this.$emit("sendPage", page)
        },
        readBoard(boardId) {
            this.$router.push({
                name: 'MemberBoardReadPage',
                params: { boardId: boardId.toString() }
            })
        }
    },
    computed: {
        ...mapState(memberModule, ['nickname'])
    },
    watch: {
        page: {
            immediate: true,
            handler() {
                this.sendPage()
            }
        }
    }
}
</script>

<style scoped>
.list_titles {
    font-size: 15px;
}

.pagination {
    margin: 10px
}

.list_title {
    min-height: 30px;
    margin: 40px 0 0px;
    text-align: center;
}
</style>