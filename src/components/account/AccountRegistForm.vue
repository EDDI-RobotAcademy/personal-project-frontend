
<template lang="">
    <div> 
                <br>
            <v-form @submit.prevent="onSubmit" ref="form">
                <table>
                    <tr>
                        <td>
                            이메일 (ID)
                        </td>
                        <td>
                            <v-text-field :rules="email_rule" v-model="email" label="이메일 입력"/>
                        </td>
                        <td>
                            <v-btn text large color="grey" @click="checkEmail" :disabled="false">
                                중복 확인
                            </v-btn>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            비밀번호
                        </td>
                        <td>
                            <v-text-field v-model="password" label="비밀번호 입력" type="password"/>
                        </td>
                    </tr>
                    <tr>
                        <td>비밀번호 확인</td>
                        <td>
                        <v-text-field label="비밀번호 확인" type="password" v-model="passwordConfirm" :rules="[passwordCheck]"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            이름
                        </td>
                        <td>
                            <v-text-field v-model="accountName" label="이름 입력" type=""/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            생년월일
                        </td>
                        <td>
                            <v-text-field v-model="accountBirth" label="생년월일 입력" type="Date"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            휴대폰 번호
                        </td>
                        <td>
                            <v-text-field placeholder=" '-'  빼고 입력해주세요" v-model="accountPhone" label="휴대폰 번호 입력" type="tel" v-mask="'###-####-####'"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            주소 입력
                        </td>
                        <td colspan="2">
                            <v-btn @click="findAddress" color="blue">우편번호 찾기</v-btn>
                            <v-text-field ref="Address" v-model="Address" label="주소"/>
                            <v-text-field ref="DetailAddress" v-model="DetailAddress" label="상세 주소"/>

                            <div id="wrap" style="display:none;border:1px solid;width:500px;height:300px;margin:5px 0;position:relative">
                            <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1"  @click="foldAddress" alt="접기 버튼">
                            </div>
                        </td>
                    </tr>
                </table>
                <div>
                    <v-btn outlined color="black" type ="submit" :disabled="!isFormValid()">회원 가입</v-btn>
                    <br><br>
                    <v-btn outlined color="green" to="/">돌아가기</v-btn>
                </div>
            </v-form>
        </div>

    </div>
</template>


<script>

import { mapActions } from 'vuex'

const accountModule = 'accountModule'

export default {
    name: "AccountRegistForm",
    data() {
        return {
            email: '',
            password: '123456',
            // isPressedButton: false,
            passwordConfirm: '',
            emailPass: false,
            email_rule: [
                v => !!v || '이메일을 입력해주세요.',
                v => {
                    const replaceV = v.replace(/(\s*)/g, '')
                    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
                    return pattern.test(replaceV) || '올바른 이메일 형식으로 입력해주세요!'
                }
            ],
            accountName: '',
            accountBirth: '2000-00-00',
            accountPhone: '',
            Address: '',
            DetailAddress: '',
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.element_wrap = document.getElementById('wrap');
        });
    },
    methods: {
        ...mapActions('accountModule', ['requestSpringToCheckEmail']),

        onSubmit() {
            if (this.$refs.form.validate()) {
                const { email, password, accountName, accountBirth, accountPhone, Address, DetailAddress } = this
                const accountAddress = `${Address} ${DetailAddress}`;

                this.$emit('submit', { email, password, accountName, accountBirth, accountPhone, accountAddress });
                this.$router.push('/account-list-page');
            } else {
                alert('올바른 정보를 입력하세요!')
            }

            if (!this.emailPass) {
                alert("이메일 중복 확인을 해주세요!")
            }
        },

        // readyToCreateAccount() {
        //     this.isPressedButton = true
        //     alert('계정 등록 준비')
        // },

        async checkEmail() {
            const emailValid = this.email.match(
                /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            this.emailPass = false

            if (emailValid) {
                const { email } = this
                console.log('before actions - email: ' + email)
                this.emailPass = await this.requestSpringToCheckEmail({ email })
            }
        },
        isFormValid() {
            return this.emailPass && this.email_rule[1](this.email) === true
        },
        foldAddress() {
            this.element_wrap.style.display = 'none';
        },

        findAddress() {
            var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

            new daum.Postcode({
                oncomplete: (data) => {
                    var addr = '';

                    if (data.userSelectedType === 'R') {
                        addr = data.roadAddress; // 도로명 주소
                    } else {
                        addr = data.jibunAddress; // 지번 주소
                    }

                    this.Address = addr;
                    this.$refs.DetailAddress.$refs.input.focus();

                    // document.getElementById("accountAddress").value = addr; // 주소 정보를 넣는다.
                    // document.getElementById("accountDetailAddress").focus(); //상세 주소로 focus

                    this.element_wrap.style.display = 'none';

                    document.body.scrollTop = currentScroll;
                },
                onresize: (size) => {
                    this.element_wrap.style.height = size.height + 'px';
                },
                width: '100%',
                height: '100%'
            }).embed(this.element_wrap);

            // iframe을 넣은 element를 보이게 한다.
            this.element_wrap.style.display = 'block';

        },
    },
    computed: {
        passwordCheck() {
            return () => {
                return this.password === this.passwordConfirm || '비밀번호가 일치하지 않습니다.'
            }
        }

    }
}

</script>
<style></style>