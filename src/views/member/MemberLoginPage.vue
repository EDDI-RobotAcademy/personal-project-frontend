<template lang="">
    <div>
        <member-login-form @submit="onSubmit"/>
    </div>
</template>
<script>
import MemberLoginForm from '@/components/member/MemberLoginForm.vue';
import { mapActions } from "vuex";

const memberModule = 'memberModule'
export default {
    components: {
        MemberLoginForm
    },
    data() {
        return {
            isLogin: false,
        }
    },
    methods: {
        ...mapActions(memberModule, ['requestSpringToLogin']),
        async onSubmit(payload) {
            this.isLogin = await this.requestSpringToLogin(payload)
            if (this.isLogin) {
                this.$router.push('/')
            }
        }
    }

}
</script>
<style lang="">
    
</style>