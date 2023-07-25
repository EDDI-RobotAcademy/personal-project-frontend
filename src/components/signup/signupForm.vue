<template>
    <div>
        <form @submit.prevent="onsubmit" id="signupInfo">
            <div class="form-floating mb-3">
                <input type="email" class="form-control" v-model="email" id="email" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" v-model="password" id="password" placeholder="Password">

                <label for="floatingPassword">Password</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" v-model="passwordCheck" id="passwordCheck"
                    placeholder="Password">

                <label for="floatingPassword">Password Check</label>
            </div>
        </form>
        <div>
            <button type="submit" class="btn btn-outline-primary" style="margin-top: 10px;" @click="onSubmit">Sign
                up</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            passwordCheck: ''
        }
    },
    methods: {
        onSubmit() {
            const { email, password } = this
            this.$emit('submit', { email, password })
        }
    }
}
</script>
<style></style>