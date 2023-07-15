<template lang="">
    <div>
        <AccountWithdrawForm @submit="withDraw"/>
    </div>
</template>

<script>
import AccountWithdrawForm from '@/components/account/AccountWithdrawForm.vue'
import { mapActions } from 'vuex'

const accountModule = 'accountModule'

export default {
    components: {
        AccountWithdrawForm,
    },
    methods: {
        ...mapActions(accountModule, ["requestPasswordCheckToSpring", 'requestAccountWithdrawToSpring']),

        async withDraw(payload) {
            this.passwordCheckPass = await this.requestPasswordCheckToSpring(payload)
            if (this.passwordCheckPass) {
                await this.requestAccountWithdrawToSpring()
                localStorage.removeItem('isLogin')
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