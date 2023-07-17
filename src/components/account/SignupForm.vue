<template>
	<div class="signup-form">
		<h1 class="signup-form__title">회원정보 입력</h1>
		<h2 class="signup-form__desc">
			Room Story 서비스 이용을 위해 정보를 입력해주세요.
		</h2>
		<div class="signup-form__input">
			<label for="signup-user-email-input">아이디</label>
			<div class="signup-form__input__main">
				<input
					type="text"
					id="signup-user-email-input"
					placeholder="이메일 주소 입력"
					v-model="email"
				/>
				<button class="user-email-auth-btn" @click="checkEmail">
					중복 확인
				</button>
			</div>
		</div>

		<div class="signup-form__input">
			<label for="signup-ussignup-form__inputer-name-input">이름</label>
			<input
				type="text"
				id="signup-user-name-input"
				placeholder="이름 입력"
				v-model="userName"
			/>
		</div>

		<div class="signup-form__input">
			<label for="signup-nickname-input">닉네임</label>
			<div class="signup-form__input__main">
				<input
					type="text"
					id="signup-nickname-input"
					placeholder="한글 또는 영문만 가능"
					v-model="nickname"
				/>
			</div>
		</div>

		<div class="signup-form__input">
			<label for="signup-password-input">비밀번호</label>
			<input
				type="password"
				id="signup-password-input"
				placeholder="8자리 이상 영문, 숫자, 특수문자 포함"
				v-model="password"
			/>
			<input
				type="password"
				id="signup-password-input--check"
				placeholder="비밀번호 확인"
				v-model="passwordCheck"
			/>
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
			
		<button
			type="submit"
			class="signup-form__submit-btn"
			@click.prevent="onSubmit"
		>
			확인
		</button>
	</div>
</template>

<script>

export default {
  data() {
    return {
      email: '', 
      userName: '',
      nickname: '',
      password: '',
      passwordCheck: '',
      roleType: '',

      checkEmailValid: false,
      checkPasswordValid: false
    }
  },
  methods: {
    onSubmit() {
      this.checkEmail()
      this.checkPassword()
      if (this.checkEmailValid == true && this.checkPasswordValid == true) {
        const { email, userName, nickname, password, roleType } = this
        this.$emit('submit', { email, userName, nickname, password, roleType })
      }
    },
    checkEmail() {
      if (this.email.includes('@')) {
        this.checkEmailValid = true
      } else {
        this.checkEmailValid = false
        alert('이메일 형식을 확인해주세요.')
      }
    },
    checkPassword() {
      if (this.password === this.passwordCheck) {
        this.checkPasswordValid = true
      } else {
        this.checkPasswordValid = false
        alert('비밀번호를 확인해주세요.')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/SignupForm.scss';
</style>