<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
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
                    <!-- <td> {{ board.title }} </td> -->
                    <td>
                        <input type="text" v-model="title"/>
                    </td>
                </tr>
                <tr style="height: 200px;">
                    <td class="table-warning">내용</td>
                    <td>
                        <textarea cols="60" rows="10" v-model="content"></textarea>
                    </td>
                </tr>
            </tbody>
            </table>
            <div class="modifyDiv">
                <button @click="onSubmit" type="button" class="btn btn-custom2">수정 완료</button>
            </div>
        </form>
    </div>
</template>
<script>
import { mapState } from "vuex";
const boardModule = 'boardModule'
export default {
    data() {
        return {
            userEmail: "",
            title: "",
            content: "",
        };
    },
    computed: {
        ...mapState(boardModule, ['board'])
    },
    created() {
        this.title = this.board.title;
        this.content = this.board.content;
        this.userEmail = this.board.userEmail;
    },
    methods: {
        onSubmit() {
            this.$emit("submit", {
                title: this.title,
                content: this.content,
                userEmail: this.userEmail
            });
        }
    },
}
</script>
<style>
.modifyDiv {
    text-align: center;
    margin-top: 10px;
}
</style>