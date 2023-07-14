<template lang="">
    <div>
        <account-register-form @submit="registAccount"/>
    </div>
</template>

<script>
import AccountRegisterForm from '@/components/account/AccountRegisterForm.vue'
import { mapActions } from 'vuex';
const accountModule = "accountModule";
export default {
    components: {
        AccountRegisterForm
    },
    methods: {
        ...mapActions(accountModule, ["requestRegistAccountToSpring"]),

        async registAccount(payload) {
            await this.requestRegistAccountToSpring(payload);
            await this.$router.push({ name: 'AccountLoginPage' })
        }
    },
}

</script>

<style lang="">
    
</style>
</style>