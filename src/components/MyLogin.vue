<template>
    <div>
        <div class="navigation-bar">
            <div class="logo">CATCHCHAIR</div>
            <div class="login-container">
                <img
                    class="notif-button"
                    src="../assets/notif.png"
                    alt="Image Icon"
                />
                <div class="login-button">LOGIN</div>
            </div>
        </div>

        
        <!-- 로그인 창 -->
        <div v-if="showLogin" class="box-wrapper">
            <div class="box-container">
                <span class="login-box" @click="showLoginWindow">
                    <span class="login">로그인</span>
                </span>
                <span class="signup-box" @click="showSignupWindow">
                    <span class="signup">회원가입</span>
                </span>
            </div>
            <div class="flex-row" style="margin-top: 10px">
                <div class="input-container">
                    <div class="inputbox-wrapper-id">
                        <input
                            class="id-input"
                            type="text"
                            placeholder="아이디"
                            @focus="onIdInputFocus"
                        />
                    </div>
                    <div class="inputbox-wrapper-pwd">
                        <input
                            class="pwd-input"
                            type="password"
                            placeholder="비밀번호"
                            @focus="onPwdInputFocus"
                        />
                    </div>
                </div>
                <div>
                    <button class="login-try">로그인</button>
                </div>
            </div>
            <div class="find-container">
                <form
                    class="auto-login-container"
                    action="/"
                    style="text-align: left"
                >
                    <input type="checkbox" value="Auto-Login" />
                    <span class="auto-login"> 자동 로그인 </span>
                </form>
                <div class="underline-click" onclick="{{findId}}">
                    아이디 찾기
                </div>
                <div
                    style="
                        margin: 0px 10px;
                        font-size: 12px;
                        color: rgb(181, 181, 181);
                    "
                >
                    |
                </div>
                <div class="underline-click" onclick="{{findPw}}">
                    비밀번호 찾기
                </div>
            </div>
            <div class="kakao-container">
                <img
                    src="../assets/kakao-icon.png"
                    style="
                        width: 31px;
                        user-select: none;
                        -webkit-user-drag: none;
                    "
                />
                <div class="kakao-login">카카오 로그인</div>
            </div>
            <div class="apple-container">
                <img
                    src="../assets/apple-icon.png"
                    style="
                        width: 21px;
                        margin-right: 5px;
                        user-select: none;
                        -webkit-user-drag: none;
                    "
                />
                <div class="apple-login">Apple 로그인</div>
            </div>
        </div>

        <!-- 회원가입 창 -->
        <div v-else class="box-wrapper">
            <div class="box-container">
                <span class="login-box" @click="showLoginWindow">
                    <span class="login">로그인</span>
                </span>
                <span class="signup-box" @click="showSignupWindow">
                    <span class="signup">회원가입</span>
                </span>
            </div>
            <div class="flex-row" style="margin-top: 20px">
                <div class="input-container">
                    <div class="inputbox-wrapper-id">
                        <input
                            class="id-input"
                            type="text"
                            placeholder="아이디"
                            @focus="onIdInputFocus"
                        />
                    </div>
                    <div class="inputbox-wrapper-pwd">
                        <input
                            class="pwd-input"
                            type="password"
                            placeholder="비밀번호"
                            @focus="onPwdInputFocus"
                        />
                    </div>
                    <div class="inputbox-wrapper-pwd-ok">
                        <input
                            class="pwd-input"
                            type="password"
                            placeholder="비밀번호 확인"
                            @focus="onPwdOkInputFocus"
                        />
                    </div>
                    <div class="inputbox-wrapper-name">
                        <input
                            class="pwd-input"
                            type="아이디"
                            placeholder="닉네임"
                            @focus="onNameInputFocus"
                        />
                    </div>
                </div>
            </div>
            <div>
                <button class="signup-try">가입하기</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            showLogin: true,
        };
    },
    methods: {
        onIdInputFocus() {
            const inputBoxWrapperId = document.querySelector(
                ".inputbox-wrapper-id"
            );
            const inputBoxWrapperPwd = document.querySelector(
                ".inputbox-wrapper-pwd"
            );
            const inputBoxWrapperPwdOk = document.querySelector(
                ".inputbox-wrapper-pwd-ok"
            );
            const inputBoxWrapperName = document.querySelector(
                ".inputbox-wrapper-name"
            );
            if (inputBoxWrapperId) {
                inputBoxWrapperId.style.borderColor = "#ff7048"; //강조 색깔 바꾸기
                inputBoxWrapperPwd.style.borderColor = "rgb(200, 200, 200)";
                inputBoxWrapperPwdOk.style.borderColor = "rgb(200, 200, 200)";
                inputBoxWrapperName.style.borderColor = "rgb(200, 200, 200)";
            }
        },
        onPwdInputFocus() {
            const inputBoxWrapperId = document.querySelector(
                ".inputbox-wrapper-id"
            );
            const inputBoxWrapperPwd = document.querySelector(
                ".inputbox-wrapper-pwd"
            );
            const inputBoxWrapperPwdOk = document.querySelector(
                ".inputbox-wrapper-pwd-ok"
            );
            const inputBoxWrapperName = document.querySelector(
                ".inputbox-wrapper-name"
            );
            if (inputBoxWrapperPwd) {
                inputBoxWrapperPwd.style.borderColor = "#ff7048"; //강조 색깔 바꾸기
                inputBoxWrapperId.style.borderColor = "rgb(200, 200, 200)";
                inputBoxWrapperPwdOk.style.borderColor = "rgb(200, 200, 200)";
                inputBoxWrapperName.style.borderColor = "rgb(200, 200, 200)";
            }
        },
        onPwdOkInputFocus() {
            const inputBoxWrapperId = document.querySelector(
                ".inputbox-wrapper-id"
            );
            const inputBoxWrapperPwd = document.querySelector(
                ".inputbox-wrapper-pwd"
            );
            const inputBoxWrapperPwdOk = document.querySelector(
                ".inputbox-wrapper-pwd-ok"
            );
            const inputBoxWrapperName = document.querySelector(
                ".inputbox-wrapper-name"
            );
            if (inputBoxWrapperPwd) {
                inputBoxWrapperPwdOk.style.borderColor = "#ff7048"; //강조 색깔 바꾸기
                inputBoxWrapperId.style.borderColor = "rgb(200, 200, 200)";
                inputBoxWrapperPwd.style.borderColor = "rgb(200, 200, 200)";
                inputBoxWrapperName.style.borderColor = "rgb(200, 200, 200)";
            }
        },
        onNameInputFocus() {
            const inputBoxWrapperId = document.querySelector(
                ".inputbox-wrapper-id"
            );
            const inputBoxWrapperPwd = document.querySelector(
                ".inputbox-wrapper-pwd"
            );
            const inputBoxWrapperPwdOk = document.querySelector(
                ".inputbox-wrapper-pwd-ok"
            );
            const inputBoxWrapperName = document.querySelector(
                ".inputbox-wrapper-name"
            );
            if (inputBoxWrapperPwd) {
                inputBoxWrapperName.style.borderColor = "#ff7048"; //강조 색깔 바꾸기
                inputBoxWrapperId.style.borderColor = "rgb(200, 200, 200)";
                inputBoxWrapperPwdOk.style.borderColor = "rgb(200, 200, 200)";
                inputBoxWrapperPwd.style.borderColor = "rgb(200, 200, 200)";
            }
        },
        showLoginWindow(){
            this.showLogin = true;
        },
        showSignupWindow(){
            this.showLogin = false;
        },

    },
};
</script>

<style>
.navigation-bar {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    width: 90%;
    justify-content: space-between;
}

.logo {
    /* font-size: 30px; */
    font-size: 40px;
    color: #fe8d6f;
    /* font-weight: bold; */
    font-weight: 500;
    margin-left: 5%;
    font-family: "ShadowsIntoLight", "Tektur", "ChelaOne", "Courier New", Arial,
        Helvetica, sans-serif;
}

.login-button {
    /* padding: 0px 30px; */
    font-weight: 400;
    font-size: 18px;
    font-family: "Courier New", "ShadowsIntoLight", "Tektur", "ChelaOne", Arial,
        Helvetica, sans-serif;
}

.notif-button {
    /* padding: 0px 30px; */
    width: 22px;
    object-fit: contain;
    margin-right: 21px;
}

.login-container {
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    align-items: center;
}

.login {
    color: white;
}

.signup {
    color: white;
}

.login-box {
    background-color: #fe8d6f;
    width: 120px;
    height: 40px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border-radius: 3px;
}

.signup-box {
    background-color: #fdc453;
    width: 120px;
    height: 40px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border-radius: 3px;
}

.box-container {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
}

.box-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 130px;
}

.id-input {
    border-radius: 3px;
    border: 0px;
    outline: none;
}

.pwd-input {
    border-radius: 3px;
    border: 0px;
    outline: none;
}

.input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-try {
    color: white;
    padding: 30px 10px;
    background-color: #fe8d6f;
    border-color: #f29d85;
    /* border-color: #ff7048; */
    outline: 0;
    border: 0;
    cursor: pointer;
    border-radius: 5px;
    font-size: 12px;
    height: 100px;
}

.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.inputbox-wrapper-id {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 5px 30px;
    margin-top: 5px;
    padding: 10px 15px;
    border: solid 1px;
    border-color: rgb(200, 200, 200);
    border-radius: 5px;
}

.inputbox-wrapper-pwd {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 5px 30px;
    margin-top: 5px;
    padding: 10px 15px;
    border: solid 1px;
    border-color: rgb(200, 200, 200);
    border-radius: 5px;
}
.inputbox-wrapper-pwd-ok {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 5px 30px;
    margin-top: 5px;
    padding: 10px 15px;
    border: solid 1px;
    border-color: rgb(200, 200, 200);
    border-radius: 5px;
}
.inputbox-wrapper-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 5px 30px;
    margin-top: 5px;
    padding: 10px 15px;
    border: solid 1px;
    border-color: rgb(200, 200, 200);
    border-radius: 5px;
}

.find-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 0px;
    margin-top: 15px;
}

.underline-click {
    font-size: 12px;
    color: rgb(133, 133, 133);
    border-bottom: solid 1px rgb(181, 181, 181);
    cursor: pointer;
}

.kakao-container {
    width: 240px;
    height: 30px;
    background-color: #fee500;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-top: 55px;
    cursor: pointer;
}
.kakao-login {
    font-size: 14px;
    margin-right: 10px;
    user-select: none;
}

.apple-container {
    width: 240px;
    height: 30px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: solid 1px rgb(206, 204, 204);
    border-radius: 3px;
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
}

.apple-login {
    font-size: 14px;
    text-align: center;
    margin-right: 6px;
    user-select: none;
}

.auto-login {
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    margin-right: 40px;
    color: rgb(133, 133, 133);
    border-bottom: solid 1px rgb(181, 181, 181);
}

.auto-login-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.signup-try {
    color: white;
    padding: 7px 80px;
    background-color: #fe8d6f;
    border-color: #f29d85;
    outline: 0;
    border: 0;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    margin-top: 30px;
}
</style>
