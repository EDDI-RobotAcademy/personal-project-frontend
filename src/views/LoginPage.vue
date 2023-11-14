<template>
    <div>
        <NaviTest />
        <div style="padding-top: 90px">
            <div class="card" style="width: 350px; margin: auto;">
                <img src="../assets/water.png" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Login</h5>
                    <LoginForm @submit="onSubmit" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import NaviTest from '@/components/NaviTest.vue';
import LoginForm from '@/components/login/LoginForm.vue';
import { mapActions } from 'vuex';

const accountModule = "accountModule";

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    components: {
        NaviTest,
        LoginForm
    },
    methods: {
        ...mapActions(accountModule, ['requestLoginToSpring']),
        async onSubmit(payload) {
            const { email, password } = payload
            await this.requestLoginToSpring({ email, password });
        },
    }
};
</script>
<style></style>
