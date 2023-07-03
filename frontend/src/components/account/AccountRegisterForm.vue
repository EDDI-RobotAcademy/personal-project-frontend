<template lang="">
    <v-container class="container">
    <v-card id="signupVcard" justify-center>
        <h3>WALK TOGETHER!</h3>
        <div>
            <v-card-text>
                <form @submit.prevent="onSubmit" id="signupInfo">
                <table id="signupTable">
                    <tr>
                        <td>Email</td>
                        <td class="input">
                            <input type="text" class="inputValue" v-model="email" placeholder="이메일을 입력해주세요">
                        </td>
                    </tr>
                    <tr>
                        <td>Paassword</td>
                        <td class="input">
                            <input type="text" class="inputValue" v-model="password" placeholder="비밀번호를 입력해주세요">
                        </td>
                    </tr>
                    <tr>
                        <td>Paassword Check</td>
                        <td class="input">
                            <input type="text" class="inputValue" v-model="passwordCheck">
                        </td>
                    </tr>
                    <tr>
                        <td>Account Type</td>
                        <td class="radio">
                           <label><input type="radio" class="inputValue" v-model="memberType" value="normal">일반</label> 
                           <label><input type="radio" class="inputValue" v-model="memberType" value="admin" >관리자</label> </td>
                    </tr>
                </table>
                </form>
                <div id="signupSubmitBtn">
                    <v-btn type="submit" width="360" text-align="center" height="50" color="#4343md" @click="onSubmit" dark>가입하기</v-btn> 
                </div>
            </v-card-text>
        </div>
    </v-card>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: '',
            passwordCheck: '',
            memberType:'',

            checkEmailValid: false,
            checkPasswordValid: false
        }
    },
    methods: {
        onSubmit () {
            this.checkEmail()
            this.checkPassword()
            if(this.checkEmailValid == true && this.checkPasswordValid == true) {
                const { email, password, memberType } = this
                this.$emit('submit', { email, password, memberType })
            }
        },
        checkEmail() {
            if(this.email.includes('@')) {
                this.checkEmailValid = true
            } else {
                this.checkEmailValid = false
                alert('이메일 형식을 확인해주세요.')
            }
        },
        checkPassword() {
            if(this.password === this.passwordCheck) {
                this.checkPasswordValid = true
            } else {
                this.checkPasswordValid = false
                alert('비밀번호를 확인해주세요.')
            }
        },
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #signupVcard {
        width: 550px;
        height: 600px;
        margin-top: 60px;
        padding-top: 20px;
    }
    #signupSubmitBtn {
        padding-top: 200px;
        padding-left: 70px;
    }
    #signupInfo {
        height: 110px;
    }
    #signupTable {
        width: 420px;
        height: 80px;
        padding-left: 20px;
        border-spacing: 10px;
    }
    input.inputValue {
        outline: none;
        color: gray;
        width: 240px;
        font-weight: 300;
        padding: 8px 10px;
    }
    #signupTable td.input {
        border-bottom: 1px solid;
        border-color: lightgray;
        padding-bottom: 4px;
        font-size: 12px;
    }
    #signupTable td{
        padding-bottom: 4px;
        font-size: 11px;
        font-weight: 600;
    }
    #signupVcard h3 {
        text-align: center;
        font-weight: 800;
        font-size: 32px;
        padding-top: 20px;
        padding-bottom: 10px;
    }

</style>