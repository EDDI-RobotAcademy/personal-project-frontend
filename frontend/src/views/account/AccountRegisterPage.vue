<template lang="">
    <div>
        <account-register-form @submit="onSubmit"/>
    </div>
</template>

<script>
import AccountRegisterForm from '@/components/account/AccountRegisterForm.vue'
import { mapActions } from 'vuex';

const accountModule = 'accountModule'

export default {
    components:{
        AccountRegisterForm
    },
    methods: {
        ...mapActions(accountModule, ['requestRegisterAccountToSpring']),
        async onSubmit (payload) {
            const {email, password, memberType} = payload
            await this.requestRegisterAccountToSpring(
                {email, password, memberType})
        }
    }
}
</script>

<style lang="">
    
</style>