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
                            <v-form @submit.prevent="onSubmit" ref="form">
                                <div class="text-h4 font-weight-black mb-10">회원 신청하기</div>
                                <div>                                    
                                    <v-text-field
                                        v-model="email"
                                        label="이메일"
                                        placeholder="johndoe@gmail.com"
                                        :rules="email_rule"
                                        :disabled="false"
                                        required>
                                    </v-text-field>
                                    <v-btn
                                        v-if="!duplicatedEmail"
                                        @click="checkDuplicatedEamil"
                                        color="primary"
                                        :disabled="!isEmailValid"

                                        >
                                    이메일 중복확인
                                    </v-btn>
                                    <v-btn
                                        v-else
                                        class="success"
                                        dark
                                        >
                                    <v-icon>mdi-check</v-icon>
                                    </v-btn>

                                                                
                                    <div class="input-field-with-icon">
                                        <v-text-field
                                            :type="passwordFieldType"
                                            v-model="password"
                                            label="비밀번호"
                                            :rules="password_rule"
                                            :disabled="false"
                                            required
                                        ></v-text-field>
                                        <v-btn icon @click="togglePasswordField" class="input-field-icon">
                                            <v-icon>{{ showPasswordIcon }}</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="input-field-with-icon">
                                        <v-text-field
                                            :type="confirmPasswordFieldType"
                                            v-model="confirmPassword"
                                            label="비밀번호 확인"
                                            :rules="confirmPassword_rule"
                                            :disabled="false"
                                            required
                                        ></v-text-field>
                                        <v-btn icon @click="toggleConfirmPasswordField" class="input-field-icon">
                                            <v-icon>{{ showConfirmPasswordIcon }}</v-icon>
                                        </v-btn>
                                    </div>

                                    <v-text-field
                                        v-model="nickname"
                                        label="닉네임"
                                        placeholder="JohnDoe"
                                        :rules="nickname_rule"
                                        :disabled="false"
                                        required
                                    ></v-text-field> 
                                    <v-btn
                                        v-if="!duplicatedNickname"
                                        @click="checkDuplicatedNickname"
                                        color="primary"
                                        :disabled="!isNicknameValid"

                                        >
                                    닉네임 중복확인
                                    </v-btn>
                                    <v-btn
                                        v-else
                                        class="success"
                                        dark
                                        >
                                    <v-icon>mdi-check</v-icon>
                                    </v-btn>

                                    <v-text-field
                                        v-model="phoneNumber"
                                        label="전화번호"
                                        placeholder="010-1234-5678"
                                        :rules="phoneNumber_rule"
                                        :disabled="false"
                                        required
                                    ></v-text-field>
                                    <v-btn
                                        v-if="!duplicatedPhoneNumber"
                                        @click="checkDuplicatedPhoneNumber"
                                        color="primary"
                                        :disabled="!isPhoneNumberValid"

                                        >
                                    휴대폰 중복확인
                                    </v-btn>
                                    <v-btn
                                        v-else
                                        class="success"
                                        dark
                                        >
                                    <v-icon>mdi-check</v-icon>
                                    </v-btn>


                                    <v-text-field
                                        v-model="zonecode"
                                        label="우편번호"
                                        :disabled="false"
                                        :readonly="true"
                                        required
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="roadAddress"
                                        label="도로명 주소"
                                        :disabled="false"
                                        :readonly="true"
                                        required
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="detailAddress"
                                        label="상세 주소"
                                        :disabled="false"
                                        :rules="detailAddress_rule"
                                        required
                                    ></v-text-field>
                                    <v-btn @click="openPostcodeSearch" color="primary">주소 검색</v-btn>


                                  </div>
                                    <v-btn type="submit" block x-large rounded :disabled="!isFormValid || !allCheckPassed"
                                    color="orange lighten-1" class="mt-6">회원 신청하기</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            email: "",
            email_rule: [
                v => !!v || '이메일을 입력해주세요!',
                v => {
                    const replaceV = v.replace(/(\s*)/g, '')
                    const pattern = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/
                    return pattern.test(replaceV) || '올바른 이메일 형식으로 입력해주세요!'
                }
            ],
            password: "",
            password_rule: [
                v => !!v || '비밀번호을 입력해주세요!',
                v => {
                    const replaceV = v.replace(/(\s*)/g, '')
                    const pattern = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
                    return pattern.test(replaceV) || '영문,숫자,특수문자를 조합하여 입력해주세요.(8-16자)'
                }
            ],
            phoneNumber: "",
            phoneNumber_rule: [
                (v) => !!v || "전화번호를 입력해주세요!",
                (v) => {
                    const replaceV = v.replace(/(\s*)/g, "");
                    const pattern = /^\d{3}\d{3,4}\d{4}$/;
                    const isValid = pattern.test(replaceV) && replaceV.length === 11;

                    return (
                    isValid ||
                    "올바른 전화번호 형식으로 입력해주세요!(010-1234-5678, 11자리만 가능)"
                    );
                },
            ],
            nickname: "",
            nickname_rule: [
                (v) => !!v || "닉네임를 입력해주세요!",
                (v) => {
                    const koreanPattern = /^[가-힣]{2,}$/;
                    const englishPattern = /^[A-Za-z]{4,}$/;
                    const isValidKorean = koreanPattern.test(v);
                    const isValidEnglish = englishPattern.test(v);
                    return (
                    (isValidKorean || isValidEnglish) ||
                    "닉네임은 2자리 이상의 한국어 또는 4자리 이상의 영어로 입력해주세요."
                    );
                },
                ],
            zonecode: "",
            roadAddress: "",
            detailAddress: "",
            confirmPassword: "",

            detailAddress_rule: [
                (v) => !!v || "상세 주소를 입력해주세요",
            ],
            confirmPassword_rule: [(v) => v === this.password || "비밀번호가 일치하지 않습니다."],
            duplicatedEmail: false,
            duplicatedNickname: false,
            duplicatedPhoneNumber: false,
            showPassword: false,
            showConfirmPassword: false,
        }
    },
    methods: {
        onSubmit () {
                const { email, password, phoneNumber, nickname, zonecode, roadAddress, detailAddress } = this
                const address = `${zonecode} ${roadAddress} ${detailAddress}`;
                this.$emit("submit", { email, password, phoneNumber, nickname, address })
        },
        checkDuplicatedEamil() {
            const { email } = this
            this.duplicatedEmail = this.$emit("checkEmail", { email });
        },
        checkDuplicatedNickname() {
            const { nickname } = this
            this.duplicatedNickname = this.$emit("checkNickname", { nickname });
        },
        checkDuplicatedPhoneNumber() {
            const { phoneNumber } = this
            this.duplicatedPhoneNumber = this.$emit("checkPhoneNumber", { phoneNumber });
        },
        togglePasswordField() {
            this.showPassword = !this.showPassword;
        },
        toggleConfirmPasswordField() {
            this.showConfirmPassword = !this.showConfirmPassword;
        },
        openPostcodeSearch() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                console.log(data);
                    this.zonecode = data.zonecode;
                    this.roadAddress = data.roadAddress;
                },
            }).open();
        },        
    },
    computed: {
        isFormValid() {
            return (
                this.email_rule.every((rule) => rule(this.email) === true) &&
                this.password_rule.every((rule) => rule(this.password) === true) &&
                this.confirmPassword_rule.every((rule) => rule(this.confirmPassword) === true) &&
                this.phoneNumber_rule.every((rule) => rule(this.phoneNumber) === true) &&
                this.nickname_rule.every((rule) => rule(this.nickname) === true) &&
                this.detailAddress_rule.every((rule) => rule(this.detailAddress) === true)
            );
        },
        allCheckPassed() {
            return this.duplicatedEmail && this.duplicatedNickname && this.duplicatedPhoneNumber;
        },
        isEmailValid() {
            return this.email_rule.every((rule) => rule(this.email) === true);
        },
        isNicknameValid() {
            return this.nickname_rule.every((rule) => rule(this.nickname) === true);
        },
        isPhoneNumberValid() {
            return this.phoneNumber_rule.every((rule) => rule(this.phoneNumber) === true);
        },
        passwordFieldType() {
            return this.showPassword ? "text" : "password";
        },
        confirmPasswordFieldType() {
            return this.showConfirmPassword ? "text" : "password";
        },
        showPasswordIcon() {
            return this.showPassword ? "mdi-eye" : "mdi-eye-off";
        },
        showConfirmPasswordIcon() {
            return this.showConfirmPassword ? "mdi-eye" : "mdi-eye-off";
        },
    },
    watch: {
        email() {
            this.duplicatedEmail = false;
        },
        nickname() {
            this.duplicatedNickname = false;
        },
        phoneNumber() {
            this.duplicatedPhoneNumber = false;
        },
    },
}

</script>

<style scoped>
.input-field-with-icon {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input-field-icon {
  position: absolute;
  right: 0;
  top: 20px;
}