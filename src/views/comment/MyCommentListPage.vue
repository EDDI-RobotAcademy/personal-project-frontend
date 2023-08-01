<template lang="">
    <div>
        <h1 class="list_title">내 댓글 관리</h1><br>
        <div>
            <my-comment-list-form :comments="comments" :totalPage="totalPage" @sendPage="sendPage"/>
        </div>
    </div>
</template>

<script>
import MyCommentListForm from '../../components/comment/MyCommentListForm.vue';

import { mapActions, mapState } from 'vuex';

const commentModule = 'commentModule'

export default {
    data() {
        return {
            keyword: '',
            userToken: '',
            page: 1,
            totalPage: 0
        }
    },
    components: {
        MyCommentListForm
    },
    computed: {
        ...mapState(commentModule, ['comments']),
    },
    mounted() {
        const page = this.page
        const userToken = localStorage.getItem("userToken")
        this.requestMyCommentListToSpring({ userToken, page })
        this.userToken = localStorage.getItem("userToken")
    },
    methods: {
        ...mapActions(
            commentModule, ['requestMyCommentListToSpring', 'requestMyCommentTotalPage']
        ),
        writeBoard() {
            if (this.userToken) {
                this.$router.push('/member-board-register-page')
            }
            else {
                alert("로그인 후 이용하세요")
            }
        },
        async sendPage(page) {
            const userToken = localStorage.getItem("userToken")
            this.requestMyCommentListToSpring({ userToken, page })
            this.totalPage = await this.requestMyCommentTotalPage(userToken)
        }

    },
}
</script>
<style scoped>
.list_title {
    min-height: 30px;
    margin: 40px 0 0px;
    text-align: center;
}
</style>