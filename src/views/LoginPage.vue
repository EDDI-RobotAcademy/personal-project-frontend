<template>
    <div>
        <NaviTest />
        <div style="padding-top: 90px">
            <div class="card" style="width: 350px; margin: auto;">
                <img src="../assets/water.png" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Login</h5>
                    <form @submit.prevent="onSubmit">
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
                        <button type="submit" class="btn btn-outline-primary" style="margin-top: 10px;">Login</button>
                        <br />
                        <button type="button" class="btn btn-outline-primary" style="margin-top: 10px;"
                            @click="$router.push('/signupPage')">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import NaviTest from '@/components/NaviTest.vue';
import { mapActions } from 'vuex';

const accountModule = "accountModule";

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        ...mapActions(accountModule, ['requestLoginToSpring']),
        async onSubmit() {
            const payload = {
                email: this.email,
                password: this.password,
            };

            await this.requestLoginToSpring(payload);
        },
    },
    components: {
        NaviTest,
    },
};
</script>
  
<style></style>
  