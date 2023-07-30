<template lang="">
    <div>
        <sign-up-form 
        @submit="onSubmit"
        @checkEmail="checkEmail"
        @checkNickname="checkNickname"
        @checkPhoneNumber="checkPhoneNumber"
        ></sign-up-form>
    </div>
</template>

<script>
import SignUpForm from "../components/SignUpForm.vue"
import { mapActions } from "vuex";

const accountModule = 'accountModule'

export default {
    components: {
        SignUpForm
    },
    methods: {
        ...mapActions(accountModule, [
            'requestRegisterAccountToSpring', 
            'requestCheckEmailToSpring',
            'requestCheckNicknameToSpring',
            'requestCheckPhonenumberToSpring'
        ]),
        
        async onSubmit (payload) {
            const isSuccess = await this.requestRegisterAccountToSpring(payload)
            if (isSuccess) {
                this.$router.push("/sign-in-page")
            }
        },
        async checkEmail (payload) {
            const notDuplicateEmail = await this.requestCheckEmailToSpring(payload)
        },
        async checkNickname (payload) {
            const notDuplicateNickname = await this.requestCheckNicknameToSpring(payload)
        },
        async checkPhoneNumber (payload) {
            const notDuplicatePhoneNumber = await this.requestCheckPhonenumberToSpring(payload)
        }
    },
}

</script>

<style lang="">
    
</style>