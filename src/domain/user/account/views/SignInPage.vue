<template lang="">
    <div>
        <sign-in-form @submit="onSubmit"></sign-in-form>
    </div>
</template>

<script>
import SignInForm from "../components/SignInForm.vue"
import { mapActions } from "vuex";

const accountModule = 'accountModule'



export default {
    components: {
        SignInForm
    },
    methods: {
        ...mapActions(accountModule, ['requestLoginAccountToSpring']),
        async onSubmit (payload) {  
            await this.requestLoginAccountToSpring(payload)
            const userToken = localStorage.getItem("userToken")
            if( userToken ) {
                await this.$router.push("/")
                location.reload()
            }         
        }
    },
}

</script>

<style lang="">
    
</style>