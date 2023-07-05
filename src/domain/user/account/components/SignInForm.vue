<template lang="">
    <div class="grey lighten-5" style="font-family: 'Noto Sans KR', sans-serif">
        <v-container class="white">
            <v-row justify="center">
                <v-col cols="auto" style="padding-bottom: 90px">
                    <v-img
                        :src="require('@/assets/logo.png')"
                        width="120"
                        class="mx-auto mb-6"></v-img>
                    <v-card width="500">
                        <v-card-text class="text-center px-12 py-16">
                            <v-form @submit.prevent="onSubmit">
                                <div class="text-h4 font-weight-black mb-10">
                                    로그인
                                </div>
                                <div>            
                                    <v-text-field
                                        v-model="email"
                                        label="이메일"
                                        placeholder="johndoe@gmail.com"
                                        >
                                    </v-text-field>                                                              
                                    <v-text-field
                                        type="password"
                                        v-model="password"
                                        label="비밀번호"
                                        hint="영문,숫자,특수문자를 조합하여 입력해주세요.(8-16자)"
                                        >
                                    </v-text-field>                 
                                  </div>
                                <v-btn type="submit" block x-large rounded
                                        color="orange lighten-2" class="mt-6">
                                        로그인</v-btn>
                            </v-form>
                            <router-link to="sign-up-page">
                            <v-btn block x-large rounded
                                        color="blue lighten-2" class="mt-6">                                        
                                        회원가입</v-btn></router-link>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

const accountModule = 'accountModule'

export default {
    data () {
        return {
            email: "",            
            password: "",
        }
    },
    methods:{
        onSubmit() {
        const { email, password } = this
        this.$emit("submit", { email, password })
        }
    }
    

}

</script>

<style lang="">
    
</style>