<template lang="">
    <div>
        <!-- <sign-up-form @submit="onSubmit" 
        @checkDuplicateEmail="checkDuplicateEmail"></sign-up-form> -->
        <sign-up-form @submit="onSubmit"></sign-up-form>
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
        // ...mapActions(accountModule, ['requestRegisterAccountToSpring', 'requestSpringToCheckEmailDuplication']),
        ...mapActions(accountModule, ['requestRegisterAccountToSpring']),
        
        async onSubmit (payload) {
            const isSuccess = await this.requestRegisterAccountToSpring(payload)
            if (isSuccess) {
                this.$router.push("/sign-in-page")
            }
        }
    },
    // async checkDuplicateEmail (payload) {
    //         const { email, emailPass } =payload
    //         const emailValid = email.match(
    //             /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         )

    //         if (emailValid) {
    //             const { email } = this
    //             console.log('before actions - email: ' + email)
    //             emailPass = await this.requestSpringToCheckEmailDuplication({ email }
    //             )
    //         }
    //     },
}

</script>

<style lang="">
    
</style>