<template lang="">
    <div>
        <br>
        <h2 align="center">LOGIN PAGE</h2>
        <login-form align="center" @submit="onSubmit"/>
    </div>
</template>
<script>

import LoginForm from "@/components/account/LoginForm.vue";
import { mapActions } from "vuex";

const accountModule = 'accountModule'
export default {
    components: {
        LoginForm
    },
    name: "LoginPage",
    methods: {
        ...mapActions(
            accountModule, ['accountLogin']
        ),
        async onSubmit(payload) {
            try {
                const account = await this.accountLogin(payload)
                console.log('typeof(account): ' + typeof (account))
                console.log('account: ' + JSON.stringify(account))
                if (account && account.loginStatus === 'SUCCESS_LOGIN' && account.userToken) {
                    this.saveUserTokenToCookie(account.userToken);
                    alert('로그인 성공!');
                }
            } catch (error) {
                console.error(error);
                alert('로그인에 실패했습니다.');
            }
        }
    },
    saveUserTokenToCookie(userToken) {
        const date = new Date();
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        document.cookie = `userToken=${encodeURIComponent(userToken)};${expires};path=/`;
    }
}
</script>
<style lang="">
    
</style>