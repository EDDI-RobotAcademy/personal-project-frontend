<template>
    <div>
        <br>
        <h2 align="center">Account Regist Page</h2>
        <account-regist-form align="center" @submit="onSubmit" />
        <br>
    </div>
</template>
<script>

import AccountRegistForm from '@/components/account/AccountRegistForm.vue';
import { mapActions } from 'vuex';

const accountModule = 'accountModule'

export default {
    components: { AccountRegistForm },
    name: "AccountRegistPage",
    data() {
        return {
        }
    },
    methods: {
        ...mapActions(
            accountModule, ['requestCreateAccountToSpring']
        ),
        async onSubmit(payload) {
            const account = await this.requestCreateAccountToSpring(payload)
            console.log('account: ' + JSON.stringify(account))

        }

    }
}
</script>
<style lang="">
    
</style>