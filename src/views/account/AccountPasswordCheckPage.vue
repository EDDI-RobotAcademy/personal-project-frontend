<template lang="">
    <div>
        <account-password-check-form @submit="passwordCheck"/>
    </div>
</template>

<script>
import AccountPasswordCheckForm from '@/components/account/AccountPasswordCheckForm.vue'
import { mapActions } from 'vuex'

const accountModule = 'accountModule'

export default {
    components: {
        AccountPasswordCheckForm,
    },
    methods: {
        ...mapActions(accountModule, ["requestPasswordCheckToSpring"]),

        async passwordCheck(payload) {
            this.passwordCheckPass = await this.requestPasswordCheckToSpring(payload)
            if (this.passwordCheckPass) {
                this.$router.push({ name: 'AccountModifyPage' })
            }
        },
    }
}
</script>
<style lang="">
    
</style>