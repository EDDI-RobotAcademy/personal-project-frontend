<template lang="">
    <v-container class="container">
    <v-card id="loginVcard" justify-center>
        <div style="display: flex; justify-content: center; padding-bottom: 20px; padding-top: 20px">
           /
        </div>
        <div>
            <v-card-text>
                <form @submit.prevent="onSubmit" id="loginInfo">
                <table id="loginTable">
                    <tr>
                        <td>
                            <v-icon right color="black">mdi-account-circle-outline</v-icon>
                            <input type="text" class="inputValue" v-model="email" placeholder="Email">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <v-icon right color="black">mdi-lock-outline</v-icon>
                            <input type="text" class="inputValue" v-model="password" placeholder="Password">
                        </td>
                    </tr>
                </table>
                <div>
                    <a href="/signup" class="signup" alt="회원가입" style="float:right;">회원가입</a>
                </div>
                </form>

                <div id="loginSubmitBtn">
                    <v-btn type="submit" width="360" height="50" color="black" @click="onSubmit" dark>로그인</v-btn> 
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
        }
    },
    methods: {
        onSubmit () {
            const { email, password } = this
            this.$emit('submit', { email, password })
        }
    }
}
</script>

<style scoped>
    .signup {
        text-decoration-line: none;
        font-size: 11px;
        color:gray;
        padding-top: 4px;
        padding-right: 42px;
        padding-bottom: 18px;
    }
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #loginVcard {
        width: 460px;
        height: 420px;
        margin-top: 60px;
        padding-top: 20px;
    }
    #loginSubmitBtn {
        padding-left: 30px;
    }
    #loginInfo {
        height: 110px;
    }
    #loginTable {
        width: 390px;
        height: 80px;
        padding-left: 30px;
    }
    input.inputValue {
        outline: none;
        font-size: 14px;
        color: gray;
        width: 320px;
        font-weight: 300;
        padding: 8px 10px;
    }
    #loginTable td {
        border-bottom: 1px solid;
        border-color: lightgray;
        padding-bottom: 4px;
    }
</style>