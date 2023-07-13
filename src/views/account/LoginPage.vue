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
            const account = await this.accountLogin(payload)
            console.log('typeof(account): ' + typeof (account))
            console.log('account: ' + JSON.stringify(account))
            await this.$router.push({ name: 'HomeView' })
        }
    },
}
</script>
<style lang="">
    
</style>