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
            <input class="id-input" type="text" placeholder="아이디"/>
            <input class="pwd-input" type="password" placeholder="비밀번호"/>
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
    font-size: 30px;
    color: #fe8d6f;
    font-weight: bold;
    margin-left: 5%;
}

.login-button{
    /* padding: 0px 30px; */
    font-weight: bold;
}

.notif-button{
    /* padding: 0px 30px; */
    width: 30px;
    object-fit: contain;
    margin-right: 10px;
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
}

.id-input{
    margin: 5px 30px;
    margin-top: 20px;
    padding: 10px 30px;
    border-radius: 3px;
}

.pwd-input{
    margin: 5px 30px;
    padding: 10px 30px;
    border-radius: 3px;

}
</style>