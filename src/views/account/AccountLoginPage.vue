<template lang="">
    <div>
        <account-login-form @submit="accountLogin"/>
    </div>
</template>

<script>
import AccountLoginForm from '@/components/account/AccountLoginForm.vue'
import { mapActions } from 'vuex';

const accountModule = 'accountModule'

export default {
    data() {
        return {
            loginPass: false,
        }
    },
    components: {
        AccountLoginForm
    },
    methods: {
        ...mapActions(accountModule, ["requestLoginToSpring"]),

        async accountLogin(payload) {
            this.loginPass = await this.requestLoginToSpring(payload)
            if (this.loginPass) {
                this.$router.push({ name: 'home' })
                    .catch(
                        location.reload()
                    )
            }
        },
    }
}
</script>

<style lang="">
    
</style>
</style>