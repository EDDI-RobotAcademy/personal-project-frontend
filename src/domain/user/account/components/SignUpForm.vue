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
                                        <!-- <template v-slot:append>
                                            <v-btn text large outlined style="font-size: 13px"
                                            class="mt-3 ml-5" color="teal lighten-1"
                                            @click="checkDuplicateEmail">
                                        이메일 <br/>중복 확인
                                    </v-btn>     
                                        </template> -->
                                    </v-text-field>
                                                                
                                    <v-text-field
                                        type="password"
                                        v-model="password"
                                        label="비밀번호"
                                        :rules="password_rule"
                                        :disabled="false"
                                        required>
                                    </v-text-field>                                                             
                                  </div>
                                <!-- <v-btn type="submit" block x-large rounded
                                        color="orange lighten-1" class="mt-6"
                                        :disabled="!isFormValid()">회원 신청하기</v-btn> -->
                                    <v-btn type="submit" block x-large rounded
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
            // emailPass: false,
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
        }
    },
    // props:{
    //     emailPass: {
    //         type: Boolean,
    //         required: true
    //     }
    // },
    methods: {
        onSubmit () {
                const { email, password } = this
                this.$emit("submit", { email, password })
        }        
        // onSubmit () {
        //     if (this.$refs.form.validate()) {
        //         const { email, password } = this
        //         this.$emit("submit", { email, password })
        //     } else {
        //         alert('올바른 정보를 입력하세요')
        //     }
        //     if (!this.emailPass) {
        //         alert("이메일 중복 확인을 해주세요")
        //     }
        // },       
        // checkDuplicateEmail() {
        //     const {email, emailPass} = this
        //     this.$emit("checkDuplicateEmail", { email, emailPass })
        // },
        // isFormValid () {
        //     return this.emailPass && 
        //     this.email_rule[1](this.email) && 
        //     this.password_rule[1](this.password) === true
        // },
    },
}

</script>

<style lang="">
    
</style>