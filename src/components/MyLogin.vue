<template>
    <div>
        <div class="navigation-bar">
            <div class="logo">CATCHCHAIR</div>
            <div class="login-container">
                <img class="notif-button" src="../assets/notif.png" alt="Image Icon">
                <div class="login-button">LOGIN</div>
            </div>
        </div>
        <div class="box-wrapper">
            <div class="box-container">
                <span class="login-box">
                    <span class="login" >로그인</span>
                </span>
                <span class="signup-box">
                    <span class="signup">회원가입</span>
                </span> 
            </div>
            <div class="flex-row" style="margin-top: 20px;">
                <div class="input-container">
                    <div class="inputbox-wrapper" >
                        <input class="id-input" type="text" placeholder="아이디"/>
                    </div>
                    <div class="inputbox-wrapper">
                        <input class="pwd-input" type="password" placeholder="비밀번호"/>
                    </div>
                </div>
                <div>
                    <button class="login-try">
                        로그인
                    </button>
                </div>
            </div>
            <div class="find-container">
                <div class="underline-click" onclick={{findId}}>
                    아이디 찾기
                </div>
                <div style="margin: 0px 10px; font-size: 12px; color: rgb(181, 181, 181);">|</div>
                <div class="underline-click" onclick={{findPw}}>
                    비밀번호 찾기
                </div>
            </div>
            <div class="kakao-container">
                <div class="kakao-login">
                    카카오 로그인
                </div>
            </div>
            <div class="apple-container">
                <div class="apple-login">
                    Apple 로그인
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
    /* font-size: 30px; */
    font-size: 40px;
    color: #fe8d6f;
    /* font-weight: bold; */
    font-weight: 500;
    margin-left: 5%;
    font-family: "ShadowsIntoLight","Tektur","ChelaOne", 'Courier New', Arial, Helvetica, sans-serif;
}

.login-button{
    /* padding: 0px 30px; */
    font-weight: 400;
    font-size: 18px;
    font-family: 'Courier New', "ShadowsIntoLight","Tektur","ChelaOne", Arial, Helvetica, sans-serif;
    
}

.notif-button{
    /* padding: 0px 30px; */
    width: 22px;
    object-fit: contain;
    margin-right: 21px;
}

.login-container{
    height:50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    align-items: center;
}

.login{
    color: white;
}

.signup{
    color: white;
}

.login-box{
    background-color: #fe8d6f;
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border-radius: 3px;
}

.signup-box{
    background-color: #fdc453;
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border-radius: 3px;
}

.box-container{
    display: flex;
    flex-direction: row;
    margin: 0 auto;
}

.box-wrapper{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top:160px;
}

.id-input{
    
    border-radius: 3px;
    border: 0px;
    outline: none;
}

.pwd-input{
    border-radius: 3px;
    border: 0px;
    outline: none;
}

.input-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-try{
    color: white;
    padding: 30px 10px;
    background-color: #fe8d6f;
    border-color: #f29d85;
    outline: 0;
    border: 0;
    cursor: pointer;
    border-radius: 5px;
    font-size: 12px;
    height: 100px;
}

.flex-row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.inputbox-wrapper{
    margin: 5px 30px;
    margin-top: 5px;
    padding: 10px 30px;
    border: solid 1px;
    border-color: rgb(200, 200, 200);
    border-radius: 5px;
}

.find-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 55px;
    margin-top: 15px;
}

.underline-click{
    font-size: 12px;
    color: rgb(133, 133, 133);
    border-bottom: solid 1px rgb(181, 181, 181);
    cursor: pointer;
    
}

.kakao-container{
    width: 240px;
    height:30px;
    background-color: #FEE500;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-top: 10px;
}
.kakao-login{
    font-size: 14px;
}

.apple-container{
    width: 240px;
    height:30px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: solid 1px rgb(186, 186, 186);
    border-radius: 3px;
    margin-top: 10px;

}

.apple-login{
    font-size: 14px;
}

</style>