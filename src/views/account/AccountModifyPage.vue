<template lang="">
    <div>
        <account-modify-form @submit="accountModify"/>
    </div>
</template>

<script>
import AccountModifyForm from '@/components/account/AccountModifyForm.vue'
import { mapActions } from 'vuex'

const accountModule = 'accountModule'

export default {
    components: {
        AccountModifyForm,
    },
    methods: {
        ...mapActions(accountModule, ["requestAccountModifyToSpring"]),

        async accountModify(payload) {
            this.passwordCheckPass = await this.requestAccountModifyToSpring(payload)
            if (this.passwordCheckPass) {
                localStorage.setItem("nickname", payload.nickname)
                this.$router.push({ name: 'AccountMyPage' })
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