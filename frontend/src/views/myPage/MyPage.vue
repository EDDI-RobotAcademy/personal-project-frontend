<template lang="">
   <v-container> 
    <h1 id="welcomeUi">{{nickName}}님, 환영합니다!</h1>
    <br>
    <v-row>
        <v-col v-for="(item,index) in myPageMenu" :key="index" cols="6">
        <v-card>
            <v-card-text style="font-weight:700;" @click="goMyPage(item.link)">
                {{item.title}}
            </v-card-text>
        </v-card>
    </v-col>
</v-row>
   <br><br>
    <v-card style="width:800px;height:400px;margin:auto;" v-if="showCard">
    <h2 style="text-align:center; padding-top:10px">비밀 번호를 확인 합니다.</h2>
<br><br><br><br>
    <div style="text-align:center">
        <v-icon right color="black">mdi-lock-outline</v-icon>
    <input type="text" class="inputValue" v-model="password" placeholder="Password">
    <v-btn @click="checkPassword">확인</v-btn>

    </div>  
                           
                    
    </v-card>
    <v-card v-if="authCheck"></v-card>
    <v-card style="width:800px;height:400px;margin:auto;" v-if="!showCard">
        <p>초기 화면</p>
    </v-card>
  


</v-container>
       

</template>
<script>
import router from "@/router"
import { mapActions } from "vuex"
const ProfileModule ='ProfileModule'
export default {
    data() {
        return {
            showCard:false,
            authCheck:false,
            nickName:'',
            myPageMenu:[
                {title:"프로필 관리" ,link:'/MyProfile'},
                {title:"게시물 관리",link:'/MyBoardManage'}
            ],
            password:''
        }
    },
    methods: {
        ...mapActions(ProfileModule,['requestcheckPasswordToSpring']),
        goMyPage(id){
            this.showCard=true
        //    await router.push(id)
        },
        async checkPassword(){
            const payload = {
    password: this.password,
    nickName: this.nickName
  };
    
            await this.requestcheckPasswordToSpring(payload)

        }
    },
    mounted() {
        this.nickName=localStorage.getItem('nickname')
    },
}
</script>
<style scoped lang="css">
h1{
    text-align: center;
}
input.inputValue {
        outline: none;
        font-size: 14px;
        color: gray;
        width: 320px;
        font-weight: 300;
        padding: 8px 10px;
    }
    td{
        text-align: center;
    }
</style>