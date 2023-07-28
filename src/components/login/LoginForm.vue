<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="form-floating mb-3">
                <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <button type="submit" class="btn btn-outline-primary" style="margin-top: 10px;" @click="onSubmit">Login</button>
            <br />
            <button type="button" class="btn btn-outline-primary" style="margin-top: 10px;"
                @click="$router.push('/signupPage')">Sign up</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        onSubmit() {
            // this.$emit("submit")
            const { email, password } = this
            this.$emit('submit', { email, password })
        }
    }

}
</script>
<style></style>