<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
            <table>
                <tr>
                    <td>제목</td>
                    <td>
                        <input type="text" v-model="title"/>
                    </td>
                </tr>
                <tr>
                    <td>작성자</td>
                    <td>
                        <input type="text" 
                        :value="nickname || writer" 
                        :readonly="nickname !== ''" @input="updateWriter"/>
                    </td>
                </tr>
                <tr v-if="!nickname">
                    <td>
                        비밀번호
                    </td>
                    <td>
                        <input type="text" v-model="password">
                    </td>
                </tr>
                <tr>
                    <td>본문</td>
                    <td>
                        <textarea cols="80" rows="30" v-model="content"/>
                    </td>
                </tr>
            </table>

            <div>
                <v-btn type="submit" color="primary">등록</v-btn>
                <v-btn color="grey" @click.prevent="cancel">취소</v-btn>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "BoardRegisterForm",
    props: {
        ticker: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
            default: '',
        }
    },
    data () {
        return {
            title: '제목을 입력하세요',
            writer: 'ㅇㅇ',
            content: '본문을 입력하세요',
            password: '',
        }
    },
    methods: {
        onSubmit () {
            let isInputValid = false;

            if (this.nickname) {
                isInputValid = this.checkCommonInputRules();
            } else {
                isInputValid = this.checkInputRulesEnabled();
            }

            if (!isInputValid) return;

            const { title, writer, content, ticker, password, nickname } = this
            this.$emit('submit', { title, writer, content, ticker, password, nickname })
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
        updateWriter (event) {
            this.writer = event.target.value;
        },
        cancel() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="">
    
</style>
