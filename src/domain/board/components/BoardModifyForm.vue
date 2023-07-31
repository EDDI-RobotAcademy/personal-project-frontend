<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
            <table>
                <tr>
                    <td>게시물 번호</td>
                    <td>
                        <input type="text" :value="board.id" disabled/>
                    </td>
                </tr>
                <tr>
                    <td>제목</td>
                    <td>
                        <input type="text" v-model="title"/>
                    </td>
                </tr>
                <tr>
                    <td>작성자</td>
                    <td>
                        <input type="text" v-model="writer" :disabled="disableWriter"/>
                    </td>
                </tr>
                <tr v-if="board.password">
                    <td>비밀번호</td>
                    <td>
                        <input type="text" v-model="password"/>
                    </td>
                </tr>
                <tr>
                    <td>등록일자</td>
                    <td>
                        <input type="text" :value="board.createDate" disabled/>
                    </td>
                </tr>
                <tr>
                    <td>본문</td>
                    <td>
                        <textarea cols="70" rows="25" v-model="content"/>
                    </td>
                </tr>
            </table>

            <div>
                <button type="submit">수정 완료</button>
                <router-link :to="{ 
                    name: 'BoardReadPage', 
                    params: { id: board.id.toString() }
                }">수정 취소</router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        board: {
            type: Object,
            required: true,
        }
    },
    data () {
        return {
            title: '',
            content: '',
            writer: '',
            createDate: '',
            password: '',
        }
    },
    created () {
        this.title = this.board.title
        this.content = this.board.content
        this.writer = this.board.writer
        this.password = this.board.password || ''
        this.createDate = this.board.createDate
    },
    methods: {
        onSubmit () {
            if (this.disableWriter ? !this.checkInputRulesDisabled() : !this.checkInputRulesEnabled()) {
                return;
            }
            const { title, content, writer, password } = this
            this.$emit('submit', { title, content, writer, password })
        },
        checkCommonInputRules() {
          if (!this.title) {
            alert("제목을 입력해주세요.");
            return false;
          }
          if (!this.content) {
            alert("내용을 입력해주세요.");
            return false;
          }
          return true;
        },
        checkInputRulesEnabled() {
            if (!this.checkCommonInputRules()) {
              return false;
            }

            const namePattern = /^([가-힣ㄱ-ㅎㅏ-ㅣ]{2,}|[a-zA-Z]{4,})$/;
            const passwordPattern = /^.{6,}$/;

            if (!namePattern.test(this.writer)) {
                alert("작성자 이름은 한글 두 글자 이상 또는 영어 네 글자 이상이어야 합니다.");
                return false;
            }

            if (!passwordPattern.test(this.password)) {
                alert("비밀번호는 6글자 이상이어야 합니다.");
                return false;
            }

            return true;
        },
        checkInputRulesDisabled() {
          return this.checkCommonInputRules();
        },

    },
    computed: {
        disableWriter() {
        return !this.board.password;
        },
    },

}
</script>
