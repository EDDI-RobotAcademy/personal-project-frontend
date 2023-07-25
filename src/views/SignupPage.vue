<template lang="">
    <div>
        <NaviTest/>
        <div style="padding-top: 90px">
            <template>
                <div class="card" style="width: 350px; margin: auto;">
                    <img src="../assets/water.png" class="card-img-top">
                    
                    <div class="card-body">
                        <h5 class="card-title">Sign Up</h5>
                        <SignupForm @submit="onSubmit"/>
                    </div>
                </div>
</template>          
        </div>
    </div>
</template>
<script>
import NaviTest from '@/components/NaviTest.vue'
import SignupForm from '@/components/signup/signupForm.vue'
import { mapActions } from 'vuex';
const accountModule = 'accountModule'

export default {
    components: {
        NaviTest,
        SignupForm
    },
    methods: {
        ...mapActions(
            accountModule, ['requestRegisterAccountToSpring']
        ),
        async onSubmit(payload) {
            const { email, password } = payload
            await this.requestRegisterAccountToSpring({ email, password })
        }
    }
}
</script>
<style></style>