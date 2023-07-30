<template>
    <div>
        <NaviTest />
        <div style="padding-top: 90px">
            <div class="card" style="width: 350px; margin: auto;">
                <img src="../assets/water.png" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Login</h5>
                    <LoginForm @submit="onSubmit" />
                    <!-- <form @submit.prevent="onSubmit"> -->
                    <!-- <form>
                        <div class="form-floating mb-3">
                            <input v-model="email" type="email" class="form-control" id="email"
                                placeholder="name@example.com">
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input v-model="password" type="password" class="form-control" id="password"
                                placeholder="Password">
                            <label for="floatingPassword">Password</label>
                        </div>
                        <button type="submit" class="btn btn-outline-primary" style="margin-top: 10px;"
                            @clikc="onSubmit">Login</button>
                        <br />
                        <button type="button" class="btn btn-outline-primary" style="margin-top: 10px;"
                            @click="$router.push('/signupPage')">Sign up</button>
                    </form> -->
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
