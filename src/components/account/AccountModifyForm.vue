<template>
    <div style="font-family: 'Caudex-Regular'; margin-top: 220px;">
        <v-row justify="center">
            <v-col cols="auto">
                <v-card width="400"
                    style="background-color: rgba(255, 255, 255, 0.8); border: 3px solid #000000; border-radius: 25px;">
                    <v-card-text class="text-center px-12 py-16">
                        <v-form @submit.prevent="passwordCheck" ref="form">
                            <div style="margin-bottom: 30px; font-size: 38px; color: #000000;">회원 정보 수정
                                <v-divider style="margin-top: 16px; border: 2px solid #000000;"></v-divider>
                            </div>
                            <div class="d-flex">
                                <v-text-field v-model="nickname" label="닉네임" :minlength="2" :maxlength="10"
                                    :disabled="false" required></v-text-field>
                                <v-btn text large outlined style="font-size: 13px" class="mt-3 ml-5" color="black"
                                    @click="checkDuplicateNickName" :disabled="false">
                                    닉네임 <br> 중복 확인
                                </v-btn>
                            </div>
                            <v-text-field v-model="password" label="비밀번호" :disabled="false" type="password"
                                :rules="password_rule"></v-text-field>
                            <v-text-field v-model="realPassword" label="비밀번호 확인" :disabled="false" type="password"
                                :rules="password_confirm_rule"></v-text-field>
                            <v-btn type="submit" block x-large rounded color="gray lighten-1" class="mt-6"
                                style="border-radius: 5px;">
                                확인
                            </v-btn>
                            <v-btn @click="goBack"> 돌아가기 </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

const accountModule = 'accountModule'

export default {
    data() {
        return {
            nickname: '',
            password: '',
            realPassword: '',
            password_rule: [
                v => {
                    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                    return pattern.test(v) || "최소 8자, 숫자, 특수문자 최소 하나씩 필요합니다!"

                }
            ],
            password_confirm_rule: [
                v => !!v || "비밀번호를 확인하세요",
                v => v === this.password || "비밀번호가 일치하지 않습니다"
            ],
        }
    },
    methods: {
        ...mapActions(accountModule, ['requestSpringToCheckNicknameDuplication']),
        passwordCheck() {
            const { nickname, password } = this
            this.$emit('submit', { nickname, password })
        },
        async goBack() {
            this.$router.go(-1)
        },
        created() {
            this.nickname = localStorage.getItem("nickname")
        },
        async checkDuplicateNickName() {
            this.nicknamePass = await this.requestSpringToCheckNicknameDuplication(this.nickname)
        },
    }
}
</script>

<style lang="">
    
</style>