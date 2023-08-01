<template lang="">
    <div>
        <v-container class="white">
            <v-row justify="center">
                <v-col cols="auto" style="padding-top: 90px">
                    <v-card width="460" style="box-shadow: none; border: solid #84d9b3">
                        <v-card-text class="text-center px-12 py-16">
                            <v-form @submit.prevent="onSubmit" ref="form">
                                <div class="text-h4 font-weight-black mb-10">회원 신청하기</div>
                                <div>
                                    <div class="d-flex">
                                    <v-text-field
                                        v-model="nickname"
                                        label="닉네임"
                                        required>
                                    </v-text-field>
                                    <v-btn text large outlined style="font-size: 12px"
                                            class="mt-3 ml-5" color="#84d9b3"
                                            @click="checkDuplicateNickname"
                                            :disabled="false">
                                        닉네임 <br/>중복 확인
                                    </v-btn>
                                    </div>
                                    <div class="d-flex">
                                    <v-text-field
                                        v-model="email"
                                        label="email"
                                        :rules="email_rule"
                                        :disabled="false"
                                        required>
                                    </v-text-field>
                                    <v-btn text large outlined style="font-size: 12px"
                                            class="mt-3 ml-5" color="#84d9b3"
                                            @click="checkDuplicateEmail"
                                            :disabled="false">
                                        이메일 <br/>중복 확인
                                    </v-btn>
                                    </div>
                                    <v-text-field
                                        v-model="password"
                                        label="password"
                                        type="password"
                                        required>
                                    </v-text-field>
                                </div>

                                <v-btn text type="submit" block x-large outlined rounded
                                        color="#84d9b3" class="mt-6"
                                        >회원가입</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
// import axiosInst from '@/utility/axiosInst'
import { mapActions } from 'vuex'

const memberModule = 'memberModule'

export default {
    data() {
        return {
            email: "",
            nickname: "",
            password: "",
            roleType: "NORMAL",
            nicknamePass: false,
            emailPass: false,
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
        ...mapActions('memberModule', ['requestSpringToCheckNicknameDuplication', 'requestSpringToCheckEmailDuplication']),
        onSubmit() {
            if (this.$refs.form.validate()) {
                const { email, nickname, password, roleType } = this
                this.$emit("submit", { email, nickname, password, roleType })
            } else {
                alert('올바른 정보를 입력하세요!')
            }

            if (!this.nicknamePass) {
                alert("닉네임 중복 확인을 해주세요!")
            }
        },
        async checkDuplicateNickname() {
            const { nickname } = this
            this.nicknamePass = await this.requestSpringToCheckNicknameDuplication({ nickname })
        },
        checkDuplicateEmail() {
            const { email } = this
            this.emailPass = this.requestSpringToCheckEmailDuplication({ email })
        }
    },

}



</script>

<style lang="">

</style>