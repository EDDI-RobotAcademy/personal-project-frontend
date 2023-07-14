<template>
    <div style="font-family: 'Caudex-Regular'; margin-top: 220px;">
        <v-row justify="center">
            <v-col cols="auto">
                <v-card width="400"
                    style="background-color: rgba(255, 255, 255, 0.8); border: 3px solid #000000; border-radius: 25px;">
                    <v-card-text class="text-center px-12 py-16" style="margin-top: 10px;">
                        <v-form @submit.prevent="registAccount" ref="form">
                            <div style="margin-bottom: 30px; margin-top: -25px; font-size: 38px; color: #000000;">회원 가입
                                <v-divider style="margin-top: 16px; border: 2px solid #000000;"></v-divider>
                            </div>
                            <div class="d-flex">
                                <v-text-field v-model="email" label="이메일" :rules="email_rule" :disabled="false"
                                    required></v-text-field>
                                <v-btn text large outlined style="font-size: 13px" class=" mt-3 ml-5" color="black"
                                    @click="checkDuplicateEmail" :disabled="false">
                                    이메일 <br> 중복 확인
                                </v-btn>
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
                                :disabled="!isEmailValid() || !isPasswordValid() || !isNicknameValid()"
                                style="border-radius: 5px;">
                                회원가입
                            </v-btn>
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
            email: '',
            password: '',
            realPassword: '',
            nickname: '',
            nicknamePass: false,
            emailPass: false,
            email_rule: [
                v => !!v || '이메일을 입력하세요!',
                v => {
                    const replaceV = v.replace(/(\s*)/g, '')
                    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
                    return pattern.test(replaceV) || '올바른 이메일 형식으로 입력해주세요!'
                }
            ],
            password_rule: [
                v => !!v || "비밀번호를 입력하세요.",
                v => {
                    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                    return pattern.test(v) || "최소 8자, 숫자, 특수문자 최소 하나씩 필요합니다!"

                }
            ],
            password_confirm_rule: [
                v => !!v || "비밀번호를 확인하세요",
                v => v === this.password || "비밀번호가 일치하지 않습니다"
            ]
        }
    },
    methods: {
        ...mapActions(accountModule, ['requestSpringToCheckEmailDuplication',
            'requestAuthentifyEmailToFastApi',
            'requestSpringToCheckNicknameDuplication']),
        registAccount() {
            const { email, nickname, password } = this
            this.$emit("submit", { email, nickname, password })
        },
        async checkDuplicateEmail() {
            const emailValid = this.email.match(
                /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )

            if (emailValid) {
                this.emailPass = await this.requestSpringToCheckEmailDuplication(this.email)
            }
        },
        async checkDuplicateNickName() {
            this.nicknamePass = await this.requestSpringToCheckNicknameDuplication(this.nickname)
        },
        isEmailValid() {
            return this.emailPass && this.email_rule[1](this.email) === true
        },
        isPasswordValid() {
            return this.password_rule[1](this.password) === true && this.password_confirm_rule[1](this.realPassword) === true
        },
        isNicknameValid() {
            return this.nicknamePass
        },
    }
}

</script>

<style></style>