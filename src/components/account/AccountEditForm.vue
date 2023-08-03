<template>
  <div class="edit-container">
    <div class="edit-form">
      <div class="edit-form__item item--profile-image"></div>
      <div class="edit-form__input">
        <label for="edit-form__email-input">아이디</label>
        <Input type="text" id="edit-form__email-input" disabled :value="account.email" />
      </div>

      <div class="edit-form__input">
        <label for="edit-form__name-input">이름</label>
        <div class="edit-form__input__main">
          <!-- userNameEditStatus 값에 따라 입력 폼의 활성화 상태를 제어 -->
          <Input type="text" id="edit-form__name-input" :value="userNameEditStatus ? newUserName : account.userName"
            :disabled="!userNameEditStatus" @input="onUserNameInput" />
          <button class="edit-form__edit-btn" v-if="!userNameEditStatus" @click="onUserNameEditStatus">
            수정
          </button>
          <button class="edit-form__confirm-btn" v-else @click="confirmNewUserName">
            확인
          </button>
        </div>
      </div>
      <div class="edit-form__input">
        <label for="edit-form__nickname-input">닉네임</label>
        <div class="edit-form__input__main">
          <!-- nicknameEditStatus 값에 따라 입력 폼의 활성화 상태를 제어 -->
          <Input type="text" id="edit-form__nickname-input" :value="nicknameEditStatus ? newNickname : account.nickname"
            :disabled="!nicknameEditStatus" @input="onNicknameInput" />
          <button class="edit-form__edit-btn" v-if="!nicknameEditStatus" @click="onNickNameEditStatus">
            수정
          </button>
          <button class="edit-form__confirm-btn" v-else @click="confirmNewNickname">
            확인
          </button>
        </div>
      </div>
      <div class="edit-form__btn">
        <button class="drop-btn" @click="dropAccount">회원 탈퇴</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { LOGIN_COMPLETE, SET_USER_NICKNAME } from '@/store/account/mutation-types';
const accountModule = 'accountModule'

export default {
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 기존 data 옵션을 이곳으로 이동합니다.
      account: {
        id: '',
        email: '',
        userName: '',
        nickname: '',
      },
      userNameEditStatus: false,
      nicknameEditStatus: false,
      newUserName: '',
      newNickname: '',
    };
  },
  methods: {
    ...mapActions(accountModule, ["requestChangeUsernameToSpring", "requestChangeNicknameToSpring",
      "requestDeleteAccountToSpring"]),
    ...mapMutations(accountModule, ['LOGIN_COMPLETE', 'SET_USER_NICKNAME']), // LOGIN_COMPLETE 뮤테이션을 사용하기 위해 추가


    // "이름" 필드에 사용자가 입력할 때 호출됩니다.
    onUserNameInput(event) {
      this.newUserName = event.target.value;
    },
    // "닉네임" 필드에 사용자가 입력할 때 호출됩니다.
    onNicknameInput(event) {
      this.newNickname = event.target.value;
    },
    // 수정 버튼을 누를 때 실행되는 함수
    onUserNameEditStatus() {
      this.userNameEditStatus = true;

    },

    // 닉네임 수정 버튼을 누를 때 실행되는 함수
    onNickNameEditStatus() {
      // nicknameEditStatus를 true로 변경하여 입력 상태로 전환
      this.nicknameEditStatus = true;
    },

    // 유저 이름
    // 확인 버튼을 누를 때 실행되는 함수 (이름 수정)
    async confirmNewUserName() {
      this.userNameEditStatus = false;
      // 변경된 userName을 서버에 저장하는 로직 추가
      if (this.newUserName === this.account.userName) {
        alert("새로운 이름이 이전 이름과 동일합니다.");
        return;
      }


      try {
        await this.requestChangeUsernameToSpring({ id: this.account.id, newUserName: this.newUserName });
        alert("이름이 성공적으로 수정되었습니다!");
      } catch (error) {
        console.error("이름 수정 중 에러 발생:", error);
        alert("이름 수정 중 에러가 발생했습니다. 다시 시도해주세요.");
      }
    },

    // 닉네임
    async confirmNewNickname() {
      this.nicknameEditStatus = false;
      // 변경된 nickname을 서버에 저장하는 로직 추가
      if (this.newNickname === this.account.nickname) {
        alert("새로운 닉네임이 이전 닉네임과 동일합니다.");
        return;
      }

      try {
        await this.requestChangeNicknameToSpring({ id: this.account.id, newNickname: this.newNickname });
        alert("닉네임이 성공적으로 수정되었습니다!");
      } catch (error) {
        console.error("닉네임 수정 중 에러 발생:", error);
        alert("닉네임 수정 중 에러가 발생했습니다. 다시 시도해주세요.");
      }
    },

    // 회원 탈퇴 버튼을 누를 때 실행되는 함수
    async dropAccount() {
      // 회원 탈퇴 로직 추가
      if (confirm("정말로 탈퇴하시겠습니까?")) {
        try {
          await this.requestDeleteAccountToSpring({ id: this.account.id });
          alert('탈퇴가 완료되었습니다! 이용해주셔서 감사합니다');
          this[LOGIN_COMPLETE](false); // 로그아웃 상태로 변경
          this[SET_USER_NICKNAME](''); // 사용자 닉네임 초기화
          this.$router.replace('/'); // 중복된 라우팅 방지를 위해 replace를 사용
        } catch (error) {
          console.error("회원 탈퇴 중 에러 발생:", error);
          alert("회원 탈퇴 중 에러가 발생했습니다. 다시 시도해주세요.");
        }
      }
    },
  },
};

</script>

<style lang="scss" scoped>
@import './scss/accountEditForm.scss';
</style>