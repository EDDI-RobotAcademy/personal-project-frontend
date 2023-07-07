<template lang="">
    <div>
        <member-sign-up-form @submit="onSubmit"></member-sign-up-form>
    </div>
</template>

<script>
import MemberSignUpForm from "../../components/member/MemberSignUpForm.vue";
import { mapActions } from "vuex";

const memberModule = 'memberModule'

export default {
    components: {
        MemberSignUpForm
    },
    methods: {
        ...mapActions(memberModule, ['requestRegisterMemberToSpring']),
        async onSubmit (payload) {
            const isSuccess = await this.requestRegisterMemberToSpring(payload)
            if (isSuccess) {
                this.$router.push("/member-login-page")
            }
        }
    }
}

</script>

<style lang="">
    
</style>