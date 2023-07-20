<template lang="">
    <div>
        <v-container class="white">
            <v-row justify="center">
                <v-col cols="auto" style="padding-top: 90px">
                    <v-card width="460" style="box-shadow: none; border: solid #84d9b3">
                        <v-card-text class="text-center px-12 py-16">
                            <v-form @submit.prevent="onSubmit" ref="form">
                                <div class="text-h4 font-weight-black mb-10">로그인</div>
                                <div>
                                    <v-text-field
                                        v-model="email"
                                        label="email"
                                        :rules="email_rule"
                                        :disabled="false"
                                        required>
                                    </v-text-field>
                                    <v-text-field
                                        v-model="password"
                                        label="password"
                                        type="password"
                                        required>
                                    </v-text-field>
                                </div>
                                <v-btn text type="submit" block x-large outlined
                                        color="#84d9b3" class="mt-6"
                                        >로그인
                                </v-btn>

                                <div style="padding:20px 0px 0px 0px; text-align: center; display:inline-block">
                                    <div class="fl" style="border-bottom:solid #bfbfbf 1px;"></div>
                                    <div class="fl tc" style="width:30px; font-size: 15px;">or</div>
                                    <div class="fr" style="border-bottom:solid #bfbfbf 1px;"></div>
                				</div>
                                <div style="padding:20px 0;">
                                    <v-btn block x-large color="#26c826"><p style="color:white; margin: 0">네이버 로그인</p></v-btn>
                                    <v-img @click="kakaoOauthLogin" :src="require('@/assets/icon/kakao_login.png')"/>
                                </div>

                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axiosInst from '@/router/utility/axiosInst'
import { mapActions } from 'vuex'

const memberModule = 'memberModule'

export default {
    data () {
        return {
            email: "",
            nickName: "",
            password: "",
            roleType: "NORMAL",
            email_rule: [
                v => !!v || '이메일을 입력해주세요!',
                v => {
                    const replaceV = v.replace(/(\s*)/g, '')
                    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
                    return pattern.test(replaceV) || '올바른 이메일 형식으로 입력해주세요!'
                }
            ]
        }
    },
    methods: {
        ...mapActions('memberModule', ['requestSpringToLogin','requestSpringToAddresskakaoOauthLogin']),
        onSubmit () {
            if (this.$refs.form.validate()) {
                const { email, password, roleType } = this
                this.$emit("submit", { email, password, roleType })
            } else {
                alert('올바른 정보를 입력하세요!')
            }
        },
        kakaoOauthLogin(){
           this.requestSpringToAddresskakaoOauthLogin()
        },       
    }

}

</script>

<style scoped>
.fl {
    float: left;
    width:160px; 
    height:15px;
}

.fr {
    float: right;
    width:160px; 
    height:15px;
}

</style>