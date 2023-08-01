
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
                        <v-text-field v-model="account.email" label="이메일 입력" disabled/>
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
                        <v-btn @click="findAddress" color="black" dark>우편번호 찾기</v-btn>
                        <v-text-field ref="Address" v-model="Address" label="주소"/>
                        <v-text-field ref="DetailAddress" v-model="DetailAddress" label="상세 주소"/>

                        <div id="wrap" style="display:none;border:1px solid;width:500px;height:300px;margin:5px 0;position:relative">
                        <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1"  @click="foldAddress" alt="접기 버튼">
                        </div>
                    </td>
                </tr>
            </table>
            <div>
                <router-link :to="{ name: 'Mypage', params: { accountId: account.accountId }}">
                <v-btn class="accountButton">돌아가기</v-btn>
                </router-link>

                <v-btn class="accountButton" style="margin-left: 20px; float: right;" type="submit">수정 완료</v-btn>
                <v-btn style="float:right" color="red" @click="deleteAccount">삭제</v-btn>
            </div>
        </v-form>
        </div>

    </div>
</template>


<script>

import { mapActions } from 'vuex'

const accountModule = 'accountModule'

export default {
    name: "AccountModifyForm",
    props: {
        account: { type: Object, required: true, },
        accountId: { type: [String, Number], required: true, },
    },
    data() {
        return {
            password: '',
            isPressedButton: false,
            passwordConfirm: '',
            accountName: '',
            accountBirth: '',
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

    created() {
        this.password = this.account.password
        this.accountName = this.account.accountName
        this.accountBirth = this.account.accountBirth
        this.accountPhone = this.account.accountPhone
        this.accountAddress = this.account.accountAddress

    },
    methods: {
        ...mapActions('accountModule', ['requestSpringToCheckEmail', 'accountDelete']),
        onSubmit() {
            if (this.$refs.form.validate()) {
                const { email, password, accountName, accountBirth, accountPhone, Address, DetailAddress } = this
                const accountAddress = `${Address} ${DetailAddress}`;
                const accountId = this.accountId
                this.$emit('submit', { accountId, email, password, accountName, accountBirth, accountPhone, accountAddress });
            } else {
                alert('올바른 정보를 입력하세요!')
            }
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
                        addr = data.roadAddress;
                    } else {
                        addr = data.jibunAddress;
                    }
                    this.Address = addr;
                    this.$refs.DetailAddress.$refs.input.focus();
                    this.element_wrap.style.display = 'none';

                    document.body.scrollTop = currentScroll;
                },
                onresize: (size) => {
                    this.element_wrap.style.height = size.height + 'px';
                },
                width: '100%',
                height: '100%'
            }).embed(this.element_wrap);
            this.element_wrap.style.display = 'block';
        },
        async deleteAccount() {
            await this.accountDelete(this.accountId)
            await this.$router.push({ name: 'home' })
        }
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

<style scoped>
.accountButton {
    background-color: black !important;
    color: white;
}
</style>