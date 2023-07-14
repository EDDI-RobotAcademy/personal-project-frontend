<template lang="">
    <v-container class="container">
    <v-card id="loginVcard" justify-center>
           <v-row>
            <v-col cols=6><v-img src="@/assets/park.svg" height="586px"></v-img></v-col>
            <v-col cols=6 > <v-card-text>
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
                </form>

                <div id="loginSubmitBtn">
                    <v-btn type="submit" width="360" height="50" color="black" @click="onSubmit" dark>로그인</v-btn> 
                </div>
            </v-card-text></v-col>
            
           </v-row>
       
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
        padding-right: 42px;
        padding-bottom: 18px;
    }
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    
    }
    #loginVcard {
        width: 1000px;
        height: 587px;

    }
    #loginSubmitBtn {
        text-align: center;
        padding-top: 40px;
    }
    #loginInfo {
        height: px;
    }
    #loginTable {
        padding-top: 150px;
        width: 390px;
        height: 80px;
        text-align: center;
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