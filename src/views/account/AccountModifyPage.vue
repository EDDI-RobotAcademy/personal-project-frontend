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
        ...mapActions(accountModule, ["requestAccountModifyToSpring", 'requestLogoutToSpring']),

        async accountModify(payload) {
            if (payload.nickname === '') {
                payload.nickname = null
            }
            if (payload.password === '') {
                payload.password = null
            }
            this.modifyCheckPass = await this.requestAccountModifyToSpring(payload)
            if (this.modifyCheckPass) {
                if (payload.password != null) {
                    this.accountLogout()
                    alert('바뀐 비밀번호로 다시 로그인 해주세요')
                }

                if (payload.nickname != null && payload.password == null) {
                    localStorage.setItem("nickname", payload.nickname)
                    this.$router.push({ name: 'AccountMyPage' })
                }
            }
        },

        async accountLogout() {
            await this.requestLogoutToSpring()
            localStorage.removeItem('isLogin')
            await this.$router.push({ name: 'home' })
        },
    }
}
</script>
<style lang="">
    
</style>