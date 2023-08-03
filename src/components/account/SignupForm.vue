<template>
	<div class="signup-form">
		<h1 class="signup-form__title">회원정보 입력</h1>
		<h2 class="signup-form__desc">
			Room Story 서비스 이용을 위해 정보를 입력해주세요.
		</h2>
		<div class="signup-form__input">
			<label for="signup-user-email-input">아이디</label>
			<div class="signup-form__input__main">
				<input type="text" id="signup-user-email-input" placeholder="이메일 주소 입력" v-model="email" />

				<v-btn text large outlined style="font-size: 13px" class="user-email-auth-btn" color="teal lighten-1"
					@click="checkEmail" :disabled="false">
					중복 확인
				</v-btn>
			</div>
		</div>

		<div class="signup-form__input">
			<label for="signup-ussignup-form__inputer-name-input">이름</label>
			<input type="text" id="signup-user-name-input" placeholder="이름 입력" v-model="userName" />
		</div>

		<div class="signup-form__input">
			<label for="signup-nickname-input">닉네임</label>
			<div class="signup-form__input__main">
				<input type="text" id="signup-nickname-input" placeholder="한글 또는 영문만 가능" v-model="nickname" />
			</div>
		</div>

		<div class="signup-form__input">
			<label for="signup-password-input">비밀번호</label>
			<input type="password" id="signup-password-input" placeholder="8자리 이상 영문, 숫자, 특수문자 포함" v-model="password" />
			<input type="password" id="signup-password-input--check" placeholder="비밀번호 확인" v-model="passwordCheck" />
			<span v-if="comparePassword" class="warning">
				비밀번호가 일치하지 않습니다.
			</span>
		</div>

		<div class="signup-form__input">
	      <label for="signup-roleType">회원유형</label>
	      <select type="radio" id="signup-roleType-select" v-model="roleType">
	        <option value="">선택</option>
	        <option value="NORMAL">NORMAL</option>
	        <option value="BUSINESS">BUSINESS</option>
	      </select>
	    </div>

		<button type="submit" class="signup-form__submit-btn" @click.prevent="onSubmit" :disabled="!isFormValid">
			회원가입
		</button>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

const accountModule = 'accountModule';

export default {
	data() {
		return {
			email: '',
			userName: '',
			nickname: '',
			password: '',
			passwordConfirm: '',
			passwordCheck: '',
			roleType: '',
			emailPass: false,
			email_rule: [
				v => !!v || '이메일을 입력해주세요!',
				v => {
					const replaceV = v.replace(/(\s*)/g, '');
					const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
					return pattern.test(replaceV) || ' 이메일 형식으로 입력해주세요!';
				}
			],
			checkEmailValid: false,
			checkPasswordValid: true, // 초기에는 true로 설정하여 일치 여부를 확인하지 않도록 함
		};
	},
	computed: {
		comparePassword() {
			return this.passwordConfirm !== '' && this.password !== this.passwordConfirm;
		},
	},
	methods: {
		...mapActions(accountModule, ['requestNormalRegisterAccountToSpring', 'requestSpringToCheckEmailDuplication']),
		// ...mapMutations(accountModule, ['SET_USER_NICKNAME']),
		async onSubmit() {
			if (!this.emailPass) {
				alert('이메일 중복 확인을 해주세요!');
				return;
			}

			if (!this.checkPassword()) {
				alert('비밀번호를 확인해주세요.');
				return;
			}
			if (this.nickname.trim() === '') { // Check if the nickname is empty or contains only whitespace
				alert('닉네임을 입력하세요!');
				return;
			}

			if (!this.isFormValid()) {
				alert('올바른 정보를 입력하세요!');
				return;
			}

			if (!this.roleType) {
				window.alert('회원유형을 선택해주세요!');
				return;
			}

			const { email, userName, nickname, password, roleType } = this;
			await this.requestNormalRegisterAccountToSpring({ email, userName, nickname, password, roleType });
			// this.SET_USER_NICKNAME(nickname); // 사용자의 닉네임을 상태에 설정합니다
			// 회원가입이 성공한 경우, isAuthenticated 상태를 false로 초기화합니다.
			this.$store.commit('accountModule/LOGIN_COMPLETE', false);
			this.$emit('submit', { email, userName, nickname, password, roleType });
		},
		async checkEmail() {
			const emailValid = this.email.match(
				/^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
			this.checkEmailValid = emailValid;

			if (!emailValid) {
				// 이메일 형식이 올바르지 않을 때 메시지를 띄웁니다.
				alert('올바른 이메일 형식으로 입력해주세요!');
			} else {
				const { email } = this;
				console.log('before actions - email: ' + email);
				this.emailPass = await this.requestSpringToCheckEmailDuplication({ email });
			}
		},
		isFormValid() {
			return (
				this.emailPass &&
				this.email_rule[1](this.email) === true &&
				this.checkEmailValid &&
				this.checkPasswordValid &&
				this.password === this.passwordCheck // 비밀번호와 비밀번호 확인 값이 같은지 확인
			);
		},
		checkPassword() {
			this.checkPasswordValid = this.password === this.passwordCheck;
			return this.checkPasswordValid;
		},
	}
};
</script>

<style lang="scss" scoped>
@import '../scss/SignupForm.scss';
</style>
