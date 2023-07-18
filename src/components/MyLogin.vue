<template>
    <div>
        <div class="navigation-bar">
            <div class="logo">CATCHCHAIR</div>
            <div class="login-button">LOGIN</div>
            <div class="search-button">O</div>
        </div>
        <div class="login">로그인</div>
        <div class="signup">회원가입</div>
        <input type="text" />
        <input type="password" />
        
        
        <!-- 로그인 참고 코드 -->
        <!-- <h2>Login</h2>
            <form @submit.prevent="login">
                <label>
                    Username:
                    <input type="text" v-model="username" required>
                </label>
                <br>
                <label>
                    Password:
                    <input type="password" v-model="password" required>
                </label>
                <br>
                <button type="submit">Login</button>
            </form> -->
        </div>
    </template>
    
    <script>
    // export default {
    //     data() {
    //         return {
    //             username: '',
    //             password: ''
    //         };
    //     },
    //     methods: {
    //         login() {
    //             if (this.username === 'dusdn' && this.password === '1234') {
    //                 this.$emit('login', this.username);
    //                 this.username = '';
    //                 this.password = '';
    //             } else {
    //                 alert('Invalid username or password');
    //             }
    //         }
    //     }
    // };
</script>

<style>
.navigation-bar{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    width: 90%;
    justify-content: space-between;
}

.logo {
    font-size: 30px;
    color: #fe8d6f;
    font-weight: bold;
    margin-left: 5%;
}

.login-button{
    padding: 0px 30px;
}

.search-button{
    padding: 0px 30px;

}

</style>